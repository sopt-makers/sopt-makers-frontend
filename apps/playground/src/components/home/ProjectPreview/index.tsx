import styled from '@emotion/styled';

import { useGetRandomProjects } from '@/api/endpoint/menuPreview/getRandomProjects';
import ScrollCarousel from '@/components/common/ScrollCarousel';
import useMediaQuery from '@/hooks/useMediaQuery';
import { getLoopedItems } from '@/hooks/useScrollCarousel';
import { DESKTOP_TWO_MEDIA_QUERY, MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import TitledContent from '../common/TitledContent';
import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton';

const SKELETON_CARD_COUNT = 3;

const ProjectPreview = () => {
  const { data: projects = [], isLoading } = useGetRandomProjects();

  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const itemsPerView = isMobile ? 1 : 2;

  return (
    <TitledContent title={`지금 둘러볼 만한 프로젝트`}>
      {isLoading ? (
        <ProjectSkeletonList aria-hidden>
          {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </ProjectSkeletonList>
      ) : (
        <>
          {/* ~1200: 캐러셀 (모바일 1장 / 태블릿 2장) */}
          <CarouselWrapper>
            <ScrollCarousel
              itemCount={projects.length}
              itemsPerView={itemsPerView}
              autoPlay={{ enabled: true, interval: 3000 }}
            >
              {getLoopedItems(projects, itemsPerView).map((project, index) => (
                <ProjectCard key={`${project.id}-${index}`} project={project} />
              ))}
            </ScrollCarousel>
          </CarouselWrapper>

          {/* 1200~: 캐러셀 없이 카드 3장 고정 */}
          <StaticGrid>
            {projects.map((project) => (
              <ProjectCard key={`static-${project.id}`} project={project} />
            ))}
          </StaticGrid>
        </>
      )}
    </TitledContent>
  );
};

export default ProjectPreview;

const ProjectSkeletonList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* 1200~: 3장 */
  gap: 12px;
  width: 100%;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* ~1200: 2장 */

    & > *:nth-of-type(n + 3) {
      display: none;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: minmax(0, 1fr); /* ~768: 1장 */

    & > *:nth-of-type(n + 2) {
      display: none;
    }
  }
`;

const CarouselWrapper = styled.div`
  display: none;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: block;
    width: 100%;
  }
`;

const StaticGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;

  & > *:nth-of-type(n + 4) {
    display: none; /* 3장만 노출 */
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: none;
  }
`;
