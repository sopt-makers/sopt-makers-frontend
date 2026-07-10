import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type {
  MemberRole,
  ProjectCategory,
  ProjectDetail,
  ProjectInput,
  ServiceType,
} from '@/api/endpoint_LEGACY/projects/type';
import { MemberRoleInfo } from '@/components/projects/constants';
import { DEFAULT_IMAGE_URL } from '@/components/projects/upload/form/constants';
import type { ProjectFormType } from '@/components/projects/upload/form/schema';

dayjs.extend(customParseFormat);

const DEFAULT_FORMAT = 'YYYY.MM';
const INPUT_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * FIXME(@jun): 서버쪽 인터페이스가 YYYY-MM-DD로 픽스되고 정우가 유럽을 떠나서
 * 어쩔 수 없이 서버쪽으로만 임시로 날짜 형식을 맞춰주는 함수입니다.
 * 인터페이스가 수정되면 냅다 지워주세요.
 *
 * @remark YYYY.MM => YYYY-MM-DD(startOf('month'))로 변경하는 함수
 */
export const convertPeriodFormat = (period: string) => {
  return dayjs(period, DEFAULT_FORMAT).startOf('month').format(INPUT_DATE_FORMAT);
};

/**
 * @param period string('YYYY-MM-DD')
 * @desc 'YYYY-MM-DD' => 'YYYY.MM' 으로 변경하는 함수입니다. (수정 시 사용)
 */
export const convertPeriodFormatReverse = (period: string) => {
  return dayjs(period, DEFAULT_FORMAT).format(DEFAULT_FORMAT);
};

/**
 * @param members 폼의 팀원 배열 (memberRole만 사용)
 * @desc 역할이 입력된 팀원 수와 역할별 인원을 요약하는 함수입니다.
 * @returns count: 역할이 입력된 팀원 수, detail: '역할 N명 · 역할 M명' 형식의 요약 문자열
 * @example getMemberSummary([{ memberRole: 'PM' }, { memberRole: 'DESIGN' }]) // { count: 2, detail: 'PM 1명 · Designer 1명' }
 */
export const getMemberSummary = (members: Array<{ memberRole?: string }>) => {
  const roles = members.map((member) => member.memberRole).filter((role): role is string => !!role);
  const roleCount = roles.reduce<Record<string, number>>((acc, role) => {
    const label = MemberRoleInfo[role as keyof typeof MemberRoleInfo] ?? role;
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});
  const detail = Object.entries(roleCount)
    .map(([label, count]) => `${label} ${count}명`)
    .join(' · ');

  return { count: roles.length, detail };
};

export const convertToProjectData = (formData: ProjectFormType, writerId: number): ProjectInput => ({
  name: formData.name,
  generation: formData.generation ? Number(formData.generation) : null,
  category: formData.category as ProjectCategory,
  detail: formData.detail,
  summary: formData.summary,
  serviceType: formData.serviceType as ServiceType[],
  startAt: convertPeriodFormat(formData.period.startAt),
  ...(formData.period.endAt ? { endAt: convertPeriodFormat(formData.period.endAt) } : {}),
  isAvailable: formData.status.isAvailable,
  isFounding: formData.status.isFounding,
  images: formData.projectImages.map(({ imageUrl }) => imageUrl).filter((image) => image !== DEFAULT_IMAGE_URL),
  logoImage: formData.logoImage,
  thumbnailImage: formData.thumbnailImage,
  members: [
    ...formData.members.map((member) => ({
      ...member,
      memberId: Number(member.memberId),
      memberRole: member.memberRole as MemberRole,
      isTeamMember: true,
    })),
    ...formData.releaseMembers.map((releasedMember) => ({
      ...releasedMember,
      memberId: Number(releasedMember.memberId),
      memberRole: releasedMember.memberRole as MemberRole,
      isTeamMember: false,
    })),
  ],
  links: formData.links,
  writerId,
});

export const convertProjectToFormType = (projectData: ProjectDetail): ProjectFormType => {
  return {
    name: projectData.name,
    generation: projectData.generation ? `${projectData.generation}` : null,
    category: projectData.category,
    detail: projectData.detail,
    summary: projectData.summary,
    serviceType: projectData.serviceType as [string, ...string[]],
    period: {
      startAt: convertPeriodFormatReverse(projectData.startAt),
      endAt: projectData.endAt ? convertPeriodFormatReverse(projectData.endAt) : null,
    },
    status: {
      isAvailable: projectData.isAvailable,
      isFounding: projectData.isFounding,
    },
    projectImages: [...projectData.images.map((image) => ({ imageUrl: image })), { imageUrl: DEFAULT_IMAGE_URL }],
    logoImage: projectData.logoImage,
    thumbnailImage: projectData.thumbnailImage,
    members: projectData.members
      .filter((member) => member.isTeamMember)
      .map((member) => convertMemberToMemberFormType(member)),
    releaseMembers: projectData.members
      .filter((member) => !member.isTeamMember)
      .map((member) => convertMemberToMemberFormType(member)),
    links: projectData.links,
  };
};

const convertMemberToMemberFormType = (member: ProjectDetail['members'][number]) => {
  return {
    memberId: `${member.memberId}`,
    memberRole: member.memberRole,
  };
};
