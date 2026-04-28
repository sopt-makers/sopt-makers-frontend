import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';

import type { SoptActivity } from '@/api/endpoint_LEGACY/members/type';
import { isProjectCategory } from '@/api/endpoint_LEGACY/projects/type';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import PartItem from '@/components/members/detail/PartItem';
import type { Category } from '@/components/projects/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SoptActivitySectionProps {
  soptActivities: SoptActivity[];
  isMine?: boolean;
}

export default function SoptActivitySection({ soptActivities, isMine }: SoptActivitySectionProps) {
  return (
    <StyledMemberDetailSection>
      {soptActivities.map(({ generation, part, projects, team }, idx) => (
        <PartItem
          key={`${generation}-${part}-${team ?? ''}-${idx}`}
          generation={`${generation}`}
          part={part}
          activities={projects.map((project) => ({
            name: project.name,
            type: convertProjectType(project.category) ?? '',
            href: playgroundLink.projectDetail(project.id),
          }))}
          teams={team !== null ? [team] : []}
          isMine={isMine}
        />
      ))}
    </StyledMemberDetailSection>
  );
}

function convertProjectType(typeCode: Category) {
  if (!isProjectCategory(typeCode)) throw new Error('project category type error');

  switch (typeCode) {
    case 'APPJAM':
      return '앱잼';
    case 'ETC':
      return '사이드 프로젝트';
    case 'JOINTSEMINAR':
      return '합동 세미나';
    case 'SOPKATHON':
      return '솝커톤';
    case 'SOPTERM':
      return '솝텀 프로젝트';
    case 'STUDY':
      return '스터디';
    default: {
      const exhaustiveCheck: never = typeCode;
      throw new Error(`project category ${exhaustiveCheck} type error`);
    }
  }
}

const StyledMemberDetailSection = styled(MemberDetailSection)`
  margin-bottom: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 20px;
    gap: 25px;
    margin-bottom: 4px;
  }
`;
