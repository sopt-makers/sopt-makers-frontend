import styled from '@emotion/styled';
import { spacing } from '@sopt-mds/design-tokens';
import { Chip, SearchField } from '@sopt-mds/ui';

import type { ProjectCategory } from '@/api/endpoint_LEGACY/projects/type';
import { GENERATION_OPTIONS } from '@/components/members/main/MemberList/filters/constants';
import { DESKTOP_TWO_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import ProjectCategorySelect from './ProjectCategorySelect';
import type { ProjectQueryParams, SetProjectQueryParams } from './projectQueryParams';

interface ProjectFilterSectionProps {
  value: string;
  onValueChange: (value: string) => void;
  queryParams: ProjectQueryParams;
  setQueryParams: SetProjectQueryParams;
}

const PROJECT_CATEGORY_LIST: Array<{ value: ProjectCategory; label: string }> = [
  { value: 'APPJAM', label: '앱잼' },
  { value: 'SOPKATHON', label: '솝커톤' },
  { value: 'SOPTERM', label: '솝텀 프로젝트' },
  { value: 'STUDY', label: '스터디' },
  { value: 'ETC', label: '사이드 프로젝트' },
];

const ProjectFilterSection = ({ value, onValueChange, queryParams, setQueryParams }: ProjectFilterSectionProps) => {
  return (
    <StyledContainer>
      <StyledSearchFieldContainer>
        <StyledSearchField
          placeholder='프로젝트명 또는 내용을 검색해보세요.'
          value={value ?? ''}
          onValueChange={onValueChange}
        />
      </StyledSearchFieldContainer>
      <StyledClickFilterContainer>
        <StyledSelectContainer>
          <ProjectCategorySelect
            placeholder='프로젝트 전체'
            allowClear
            onClear={() => setQueryParams({ category: null })}
            value={queryParams.category ?? undefined}
            onValueChange={(value) => setQueryParams({ category: value as ProjectCategory })}
            option={PROJECT_CATEGORY_LIST}
          />
          <ProjectCategorySelect
            placeholder='기수 전체'
            allowClear
            onClear={() => setQueryParams({ generation: null })}
            value={queryParams.generation != undefined ? String(queryParams.generation) : undefined}
            onValueChange={(value) => setQueryParams({ generation: Number(value) })}
            option={GENERATION_OPTIONS}
          />
        </StyledSelectContainer>
        <StyledChipContainer>
          <Chip.Toggle
            size='small'
            checked={queryParams.isAvailable ?? false}
            onCheckedChange={(checked) => setQueryParams({ isAvailable: checked || null })}
          >
            이용 가능한 서비스
          </Chip.Toggle>
          <Chip.Toggle
            size='small'
            checked={queryParams.isFounding ?? false}
            onCheckedChange={(checked) => setQueryParams({ isFounding: checked || null })}
          >
            창업 중
          </Chip.Toggle>
        </StyledChipContainer>
      </StyledClickFilterContainer>
    </StyledContainer>
  );
};

export default ProjectFilterSection;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const StyledSearchFieldContainer = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    margin: ${spacing.s20} ${spacing.s20} ${spacing.s8} ${spacing.s20};
  }
`;

const StyledSearchField = styled(SearchField)`
  width: 376px;
  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledClickFilterContainer = styled.div`
  display: flex;
  gap: ${spacing.s10};
  overflow: hidden;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: ${spacing.s8} ${spacing.s20};
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    margin-top: ${spacing.s20};
  }
`;

const StyledSelectContainer = styled.div`
  display: flex;
  gap: ${spacing.s6};
`;

const StyledChipContainer = styled.div`
  display: flex;
  gap: ${spacing.s6};
`;
