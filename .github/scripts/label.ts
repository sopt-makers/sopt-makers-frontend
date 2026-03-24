import type { AsyncFunctionArguments } from '@actions/github-script';

type SyncLabelsParams = Pick<AsyncFunctionArguments, 'github' | 'context' | 'core'>;

type RepoContext = {
  github: SyncLabelsParams['github'];
  core: SyncLabelsParams['core'];
  owner: string;
  repo: string;
};

/** NOTE: app label 추가 시 여기에 추가 */
const APP_LABELS = [
  { prefix: 'apps/crew/', label: '🥐 Crew' },
  { prefix: 'apps/playground/', label: '⚡️ Playground' },
];
const ROOT_LABEL = '🔗 Root';
const PACKAGE_LABEL_PREFIX = '🔗 Packages:';

// 워크플로우가 자동으로 붙이는 라벨 목록 (수동 추가 라벨과 구분해서 제거 시 건드리지 않음)
const AUTO_LABELS = [...APP_LABELS.map((r) => r.label), ROOT_LABEL];

const PAGINATION_PER_PAGE = 100;

const isRootFile = (file: string) => !file.includes('/') || file.startsWith('.github/');
const isPackageLabel = (label: string) => label.startsWith(PACKAGE_LABEL_PREFIX);
const isAutoLabel = (label: string) => AUTO_LABELS.includes(label) || isPackageLabel(label);

const uniqueLabels = <T>(arr: T[]): T[] => [...new Set(arr)];

async function syncLabels({ github, context, core }: SyncLabelsParams) {
  const prNumber = context.payload.pull_request!.number;
  const { owner, repo } = context.repo;
  const repoContext: RepoContext = { github, core, owner, repo };

  const filenames = await getChangedFilenames(repoContext, prNumber);
  const targetLabels = collectTargetLabels(filenames);
  const currentLabels = await getCurrentLabels(repoContext, prNumber);
  const { toAdd, toRemove } = computeLabelDiff(targetLabels, currentLabels);

  await initializeLabels(repoContext, toAdd);
  await addLabels(repoContext, prNumber, toAdd);
  await removeLabels(repoContext, prNumber, toRemove);
}

async function getChangedFilenames({ github, owner, repo }: RepoContext, prNumber: number): Promise<string[]> {
  return github.paginate(
    'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
    { owner, repo, pull_number: prNumber, per_page: PAGINATION_PER_PAGE },
    (response) => response.data.map((file) => file.filename),
  );
}

function collectTargetLabels(files: string[]): string[] {
  const rootLabels = files.some(isRootFile) ? [ROOT_LABEL] : [];
  const appLabels = APP_LABELS.filter(({ prefix }) => files.some((f) => f.startsWith(prefix))).map(
    ({ label }) => label,
  );
  const packageLabels = uniqueLabels(files.filter((f) => f.startsWith('packages/')).map((f) => f.split('/')[1])).map(
    (pkg) => `${PACKAGE_LABEL_PREFIX}${pkg}`,
  );

  return uniqueLabels([...appLabels, ...rootLabels, ...packageLabels]);
}

async function getCurrentLabels({ github, owner, repo }: RepoContext, prNumber: number) {
  const { data } = await github.rest.issues.listLabelsOnIssue({ owner, repo, issue_number: prNumber });
  const all = data.map((label) => label.name);

  return { all, auto: all.filter(isAutoLabel) };
}

function computeLabelDiff(targetLabels: string[], currentLabels: { all: string[]; auto: string[] }) {
  return {
    toAdd: targetLabels.filter((label) => !currentLabels.all.includes(label)),
    // 수동으로 추가된 라벨은 건드리지 않도록 자동 라벨만 제거 대상으로 함
    toRemove: currentLabels.auto.filter((label) => !targetLabels.includes(label)),
  };
}

async function initializeLabels(repoContext: RepoContext, labels: string[]) {
  const { github, owner, repo } = repoContext;

  await Promise.all(
    labels.map(async (name) => {
      try {
        await github.rest.issues.getLabel({ owner, repo, name });
      } catch (error) {
        if ((error as { status?: number }).status !== 404) throw error;

        await github.rest.issues.createLabel({ owner, repo, name });
      }
    }),
  );
}

async function addLabels(repoContext: RepoContext, prNumber: number, labels: string[]) {
  if (labels.length === 0) return;

  await repoContext.github.rest.issues.addLabels({ ...repoContext, issue_number: prNumber, labels });
  repoContext.core.info(`Added labels: ${JSON.stringify(labels)}`);
}

async function removeLabels(repoContext: RepoContext, prNumber: number, labels: string[]) {
  if (labels.length === 0) return;

  await Promise.all(
    labels.map(async (label) => {
      await repoContext.github.rest.issues.removeLabel({
        ...repoContext,
        issue_number: prNumber,
        name: label,
      });
      repoContext.core.info(`Removed label: ${label}`);
    }),
  );
}

export default syncLabels;
