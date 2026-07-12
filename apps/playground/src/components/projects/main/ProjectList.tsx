import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ImpressionArea } from '@toss/impression-area';
import { useDebounce } from '@toss/react';
import Link from 'next/link';
import React, { useState } from 'react';
import type { DecodedValueMap, SetQuery } from 'use-query-params';
import { BooleanParam, createEnumParam, NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { useGetProjectsQuery } from '@/api/endpoint/projects/getProjects';
import EmptyView from '@/components/common/EmptyView';
import Loading from '@/components/common/Loading';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import type { ProjectCategory } from '@/components/members/detail/types';
import ProjectCard from '@/components/projects/main/card/ProjectCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import ProjectFilterSection from './ProjectFilterSection';

const PROJECT_QUERY_PARAM_CONFIG = {
  name: withDefault(StringParam, null),
  isAvailable: withDefault(BooleanParam, null),
  isFounding: withDefault(BooleanParam, null),
  category: createEnumParam<ProjectCategory>(['APPJAM', 'SOPKATHON', 'SOPTERM', 'STUDY', 'ETC']),
  generation: withDefault(NumberParam, null),
};

export type ProjectQueryParams = DecodedValueMap<typeof PROJECT_QUERY_PARAM_CONFIG>;
export type SetProjectQueryParams = SetQuery<typeof PROJECT_QUERY_PARAM_CONFIG>;

const ProjectList = () => {
  const [queryParams, setQueryParams] = useQueryParams(PROJECT_QUERY_PARAM_CONFIG);
  const [value, setValue] = useState(queryParams.name);
  const debouncedChangeName = useDebounce((value: string | null) => setQueryParams({ name: value }), 300);
  const { data, isLoading, fetchNextPage } = useGetProjectsQuery({
    limit: 20,
    name: queryParams.name,
    isAvailable: queryParams.isAvailable,
    isFounding: queryParams.isFounding,
    category: queryParams.category,
    generation: queryParams.generation,
  });

  const totalCount = data?.pages && data.pages[0].totalCount;

  const { logClickEvent } = useEventLogger();

  return (
    <StyledContainer>
      <StyledContent>
        <ProjectFilterSection
          value={value ?? ''}
          onValueChange={(value) => {
            setValue(value);
            debouncedChangeName(value === '' ? null : value);
          }}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
        {isLoading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          <LengthWrapper>
            <StyledLength typography='SUIT_18_M'>전체 {totalCount}개</StyledLength>
          </LengthWrapper>
        )}

        {totalCount === 0 ? (
          <EmptyView />
        ) : (
          <StyledGridContainer>
            {data?.pages.map((page) =>
              page.projectList.map((project) => {
                return (
                  <React.Fragment key={project.id}>
                    <LoggingClick eventKey='projectCard' param={{ projectId: project.id, referral: 'projectTab' }}>
                      <Link href={playgroundLink.projectDetail(project.id)}>
                        <ProjectCard key={project.id} project={project} />
                      </Link>
                    </LoggingClick>
                  </React.Fragment>
                );
              }),
            )}
            <ImpressionArea onImpressionStart={fetchNextPage} />
          </StyledGridContainer>
        )}
      </StyledContent>
      <ProjectUploadButton
        onClick={() => logClickEvent('projectUpload', { referral: 'project' })}
        href={playgroundLink.projectUpload()}
      >
        <PlusIcon />
        프로젝트 올리기
      </ProjectUploadButton>
    </StyledContainer>
  );
};

export default ProjectList;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CONTAINER_MAX_WIDTH = 1480;

const StyledContent = styled.div`
  justify-self: flex-start;
  margin: 40px 0;
  min-width: ${CONTAINER_MAX_WIDTH}px;

  @media screen and (max-width: ${CONTAINER_MAX_WIDTH}px) {
    min-width: calc(352px * 3 + 15px * 2);
  }

  @media screen and (max-width: 1120px) {
    min-width: calc(352px * 2 + 15px * 1);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    margin: 0;
    pading: 0 20px;
    width: 100%;
    min-width: 352px;
  }
`;

const ProjectUploadButton = styled(Link)`
  display: flex;
  position: fixed;
  right: 60px;
  bottom: 80px;
  gap: 8px;
  align-items: center;
  border-radius: 18px;
  background-color: ${colors.gray10};
  padding: 14px 30px 14px 27px;
  color: ${colors.gray950};
  ${fonts.TITLE_20_SB};

  &:hover {
    background-color: ${colors.gray50};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    right: 16px;
    bottom: 16px;
    padding: 12px;
    ${fonts.LABEL_16_SB}
  }
`;

const PlusIcon = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.9208 2.58751C10.9208 2.07966 10.5091 1.66797 10.0013 1.66797C9.49345 1.66797 9.08176 2.07966 9.08176 2.58751V9.08176H2.58751C2.07966 9.08176 1.66797 9.49345 1.66797 10.0013C1.66797 10.5091 2.07966 10.9208 2.58751 10.9208H9.08176V17.4151C9.08176 17.9229 9.49345 18.3346 10.0013 18.3346C10.5091 18.3346 10.9208 17.9229 10.9208 17.4151V10.9208H17.4151C17.9229 10.9208 18.3346 10.5091 18.3346 10.0013C18.3346 9.49345 17.9229 9.08176 17.4151 9.08176H10.9208V2.58751Z'
      fill='#0F0F12'
    />
  </svg>
);

const LengthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 18.5px;
  }
`;

const StyledLength = styled(Text)`
  ${fonts.BODY_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M};
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 22px;
  min-width: ${CONTAINER_MAX_WIDTH}px;

  @media screen and (max-width: ${CONTAINER_MAX_WIDTH}px) {
    grid-template-columns: repeat(3, 1fr);
    justify-content: start;
    min-width: 0;
    min-width: 790px;
  }

  @media screen and (max-width: 1120px) {
    grid-template-columns: repeat(2, 1fr);
    min-width: 0;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    justify-content: start;
    margin-top: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 290px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 170px 0;
    padding-bottom: 100px;
  }
`;
