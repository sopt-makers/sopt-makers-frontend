import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { spacing, typography } from '@sopt-mds/design-tokens';
import { IconPlus } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';
import { ImpressionArea } from '@toss/impression-area';
import { useDebounce } from '@toss/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import type { DecodedValueMap, SetQuery } from 'use-query-params';
import { BooleanParam, createEnumParam, NumberParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { useGetProjectsQuery } from '@/api/endpoint/projects/getProjects';
import EmptyView from '@/components/common/EmptyView';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import type { ProjectCategory } from '@/components/members/detail/types';
import ProjectCard from '@/components/projects/main/card/ProjectCard';
import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

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
  const router = useRouter();
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

  const handleProjectUploadClick = () => {
    logClickEvent('projectUpload', { referral: 'project' });
    router.push(playgroundLink.projectUpload());
  };

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
      <Responsive only='desktop'>
        <StyledActionButton leftAddon={<IconPlus />} variant='primary' size='large' onClick={handleProjectUploadClick}>
          프로젝트 올리기
        </StyledActionButton>
      </Responsive>
      <Responsive only='mobile'>
        <StyledActionButton leftAddon={<IconPlus />} variant='primary' size='small' onClick={handleProjectUploadClick}>
          프로젝트 올리기
        </StyledActionButton>
      </Responsive>
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
  margin: ${spacing.s40} 0;

  margin: 40px 0;
  min-width: ${CONTAINER_MAX_WIDTH}px;

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    min-width: calc(352px * 3 + 15px * 2);
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    min-width: calc(352px * 2 + 15px * 1);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin: ${spacing.s0};
    width: 100%;
    min-width: 352px;
  }
`;

const StyledActionButton = styled(ActionButton)`
  display: flex;
  position: fixed;
  right: 56px;
  bottom: 58px;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    right: ${spacing.s24};
    bottom: 54px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    right: ${spacing.s16};
    bottom: 30px;
  }
`;

const LengthWrapper = styled.div`
  margin-top: ${spacing.s28};
  margin-bottom: ${spacing.s20};

  @media ${MOBILE_MEDIA_QUERY} {
    margin: ${spacing.s0};
    padding: ${spacing.s12} ${spacing.s20};
    width: 100%;
  }
`;

const StyledLength = styled(Text)`
  ${typography.label1}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.body2};
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing.s16};
  min-width: ${CONTAINER_MAX_WIDTH}px;

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    grid-template-columns: repeat(3, 1fr);
    min-width: 0;
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(2, 1fr);
    min-width: 0;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
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
