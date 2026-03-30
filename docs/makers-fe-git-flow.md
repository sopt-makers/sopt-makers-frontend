# develop 브랜치 리셋 안내

## 요약

`develop` 브랜치를 `main` 기준으로 리셋했습니다.
코드 변경은 없으며, 앞으로의 Git Flow 정상화를 위한 작업입니다.

---

## 배경: 왜 이 작업이 필요했나?

### 기존 상태

기존에 `develop → main` 머지가 **squash merge** 방식으로 이루어졌습니다.

```
main:    A ── B ── S (squash: develop 커밋들을 하나로 합침)

develop: A ── C1 ── C2 ── C3 ── ... ── C11
```

squash merge는 develop의 여러 커밋을 **하나의 새 커밋(S)** 으로 만들어 main에 올립니다.
이때 S는 C1~C11과 **아무런 부모-자식 관계가 없는** 별개의 커밋이 됩니다.

### 문제

이 상태에서 다음 번에 `develop → main`을 **fast-forward(FF) merge** 하려고 하면:

- Git은 main의 tip(S)이 develop의 히스토리에 존재하는지 확인
- S는 develop 히스토리에 없음 → **FF 불가**
- 결과: 또 다시 merge commit이나 squash가 필요해지는 악순환

```
main:    A ── B ── S          ← develop에서 이 커밋을 모름
                    ╲
develop: A ── C1 ── ... ── C11  ← main에서 이 커밋들을 모름
```

> 양쪽이 서로 모르는 커밋을 가지고 있어 **영원히 FF 머지가 불가능**한 구조였습니다.

---

## 수행한 작업

```bash
git checkout develop
git reset --hard origin/main
git push --force-with-lease origin develop
```

develop을 main의 HEAD와 **완전히 동일한 커밋**으로 맞췄습니다.

### 변경 후 상태

```
main:    A ── B ── S
                    ↑
develop:            S  (main과 동일 지점에서 시작)
```

- 코드 내용: **변경 없음** (이전 develop과 파일 diff 0)
- 커밋 히스토리: 이전 develop의 개별 커밋(C1~C11)은 squash 커밋(S)에 포함되어 있음

---

## 앞으로의 Git Flow

이제 develop에 새 커밋이 쌓이면 아래와 같은 구조가 됩니다:

```
main:    A ── B ── S
                    ↑
develop:            S ── D1 ── D2 ── D3
```

main의 tip(S)이 develop 히스토리에 포함되어 있으므로, **FF merge가 정상 동작**합니다.

```bash
git checkout main
git merge --ff-only develop
```

```
main:    A ── B ── S ── D1 ── D2 ── D3
                                      ↑
develop:                              D3
```

---

## 팀원 행동 가이드

### 현재 작업 중인 feature 브랜치가 있다면

이전 develop 기반으로 만든 feature 브랜치는 새 develop 위로 rebase해 주세요:

```bash
git fetch origin
git rebase origin/develop
```

---

## Git Flow 머지 전략

### 1. feature → develop: **Squash Merge**

```
feature:  D1 ── F1 ── F2 ── F3
                               ↓ squash merge
develop:  D1 ── D2 ── D3 ── S(F1+F2+F3)
```

- feature 브랜치의 커밋들을 **하나의 커밋으로 합쳐서** develop에 머지
- develop 히스토리가 기능 단위로 깔끔하게 유지됨
- feature 브랜치는 머지 후 삭제하므로 히스토리 분리 문제가 발생하지 않음

**GitHub PR 설정**: `Squash and merge` 선택

### 2. develop → main: **CLI로 Fast-Forward Merge**

PR을 날리지 않고, CLI에서 직접 FF merge를 수행합니다.

```bash
git checkout main
git pull origin main
git merge --ff-only origin/develop
git push origin main
```

```
develop:  S ── D1 ── D2 ── D3
                              ↓ ff merge (CLI)
main:     S ── D1 ── D2 ── D3
```

- develop의 커밋들을 **그대로** main에 반영
- 불필요한 merge commit 없이 히스토리가 일직선으로 유지됨
- main과 develop이 항상 같은 히스토리를 공유하므로 다음 FF도 보장됨
- `--ff-only` 옵션으로 FF가 불가능한 상황을 사전 차단 (실패 시 원인 파악 후 해결)

> **PR을 사용하지 않는 이유**: GitHub PR의 머지 옵션(squash, merge commit, rebase)은 모두 새로운 커밋을 생성하거나 히스토리를 변형할 수 있습니다. 순수한 FF merge는 CLI에서만 가능합니다.

### 왜 이렇게 나누는가?

| 구분 | feature → develop | develop → main |
|---|---|---|
| **목적** | 작업 단위를 하나로 정리 | 검증된 코드를 그대로 반영 |
| **머지 방식** | Squash Merge (GitHub PR) | FF Merge (CLI) |
| **히스토리** | 기능별 1커밋으로 정리 | develop과 동일하게 유지 |
| **branch 재사용** | X (머지 후 삭제) | O (계속 사용) |

> **핵심 원칙**: 계속 사용하는 브랜치 간(develop ↔ main)에는 절대 squash merge를 하지 않는다.
> squash는 히스토리를 분리시키기 때문에, 머지 후 삭제되는 일회성 브랜치(feature)에만 사용한다.
