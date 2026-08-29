#!/usr/bin/env bash

set -euo pipefail

abort() {
  printf '오류: %s\n' "$1" >&2
  exit 1
}

command -v git >/dev/null 2>&1 || abort 'git 명령어가 필요합니다.'
command -v gh >/dev/null 2>&1 ||
  abort 'GitHub CLI(gh)가 필요합니다. https://cli.github.com/에서 설치한 뒤 다시 실행해 주세요.'

[[ -z "$(git status --porcelain)" ]] || abort '커밋하지 않은 변경사항을 먼저 정리해 주세요.'

initial_branch="$(git branch --show-current)"
[[ -n "$initial_branch" ]] || abort 'detached HEAD 상태에서는 release를 실행할 수 없습니다.'

gh auth status --hostname github.com >/dev/null 2>&1 || abort 'gh auth login으로 GitHub CLI 인증을 완료해 주세요.'

printf 'Production 배포 대상을 선택하세요.\n\n'
PS3='선택하세요: '

select selected_target in 'Crew' 'Playground' 'Crew + Playground' '취소'; do
  case "$selected_target" in
    'Crew')
      deploy_target='crew'
      break
      ;;
    'Playground')
      deploy_target='playground'
      break
      ;;
    'Crew + Playground')
      deploy_target='all'
      break
      ;;
    '취소')
      printf 'Release를 취소했습니다.\n'
      exit 0
      ;;
    *)
      printf '올바른 번호를 선택해 주세요.\n'
      ;;
  esac
done

printf '\n배포 대상: %s\n' "$selected_target"
git fetch origin

git show-ref --verify --quiet refs/remotes/origin/main || abort 'origin/main 브랜치를 찾을 수 없습니다.'
git show-ref --verify --quiet refs/remotes/origin/develop || abort 'origin/develop 브랜치를 찾을 수 없습니다.'
git merge-base --is-ancestor origin/main origin/develop ||
  abort 'origin/develop을 origin/main에 fast-forward merge할 수 없습니다.'

main_sha="$(git rev-parse origin/main)"
develop_sha="$(git rev-parse origin/develop)"
release_commit_count="$(git rev-list --count origin/main..origin/develop)"

printf '\n현재 main SHA: %s\n' "$main_sha"
printf '배포할 SHA: %s\n' "$develop_sha"
printf '병합 방식: origin/develop → main, fast-forward only (--ff-only)\n'

if [[ "$release_commit_count" -eq 0 ]]; then
  printf '\n새로 포함되는 커밋이 없습니다.\n'
  printf 'develop과 main이 동일하므로 선택한 대상을 같은 SHA로 다시 배포합니다.\n'
else
  printf '\n포함되는 커밋 (%s개):\n' "$release_commit_count"
  git --no-pager log --format='  %h %s' origin/main..origin/develop
  printf '\n위 커밋을 main에 반영하고 production 배포를 시작합니다.\n'
fi

read -r -p '계속할까요? [y/N] ' confirmation

case "$confirmation" in
  y | Y)
    ;;
  *)
    printf 'Release를 취소했습니다.\n'
    exit 0
    ;;
esac

did_switch_branch=false

restore_initial_branch() {
  if [[ "$did_switch_branch" == true && "$initial_branch" != 'main' ]]; then
    git switch "$initial_branch" >/dev/null 2>&1 || true
  fi
}

trap restore_initial_branch EXIT

if git show-ref --verify --quiet refs/heads/main; then
  git switch main
else
  git switch --create main --track origin/main
fi
did_switch_branch=true

git merge --ff-only origin/main

[[ "$(git rev-parse HEAD)" == "$(git rev-parse origin/main)" ]] ||
  abort '로컬 main에 push되지 않은 커밋이 있습니다.'

git merge --ff-only origin/develop

release_sha="$(git rev-parse HEAD)"

printf '\nRelease SHA: %s\n' "$release_sha"
git push origin main

repository_url='https://github.com/sopt-makers/sopt-makers-frontend'
crew_workflow='crew-deploy-production.yml'
playground_workflow='playground-deploy-production.yml'
crew_request_status=''
playground_request_status=''
has_dispatch_failure=false

dispatch_workflow() {
  local workflow_file="$1"
  local application_name="$2"

  printf '%s production 배포를 요청합니다.\n' "$application_name"
  gh workflow run "$workflow_file" \
    --ref main \
    --field "release_sha=$release_sha"
}

print_dispatch_result() {
  local application_name="$1"
  local request_status="$2"
  local workflow_file="$3"

  printf '%s: %s\n' "$application_name" "$request_status"
  printf '확인: %s/actions/workflows/%s\n' "$repository_url" "$workflow_file"
}

case "$deploy_target" in
  crew)
    if dispatch_workflow "$crew_workflow" 'Crew'; then
      crew_request_status='요청 성공'
    else
      crew_request_status='요청 실패'
      has_dispatch_failure=true
    fi
    ;;
  playground)
    if dispatch_workflow "$playground_workflow" 'Playground'; then
      playground_request_status='요청 성공'
    else
      playground_request_status='요청 실패'
      has_dispatch_failure=true
    fi
    ;;
  all)
    if dispatch_workflow "$crew_workflow" 'Crew'; then
      crew_request_status='요청 성공'
    else
      crew_request_status='요청 실패'
      has_dispatch_failure=true
    fi

    if dispatch_workflow "$playground_workflow" 'Playground'; then
      playground_request_status='요청 성공'
    else
      playground_request_status='요청 실패'
      has_dispatch_failure=true
    fi
    ;;
esac

printf '\nProduction 배포 요청 결과\n\n'

case "$deploy_target" in
  crew)
    print_dispatch_result 'Crew' "$crew_request_status" "$crew_workflow"
    ;;
  playground)
    print_dispatch_result 'Playground' "$playground_request_status" "$playground_workflow"
    ;;
  all)
    print_dispatch_result 'Crew' "$crew_request_status" "$crew_workflow"
    printf '\n'
    print_dispatch_result 'Playground' "$playground_request_status" "$playground_workflow"
    ;;
esac

printf '\nRelease SHA: %s\n' "$release_sha"

if [[ "$has_dispatch_failure" == true ]]; then
  printf '일부 production 배포 요청에 실패했습니다. 위 결과를 확인해 주세요.\n'
  exit 1
fi

printf 'GitHub Actions 실행 결과는 위 링크에서 확인해 주세요.\n'
