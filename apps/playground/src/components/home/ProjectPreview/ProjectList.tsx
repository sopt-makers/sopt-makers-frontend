import styled from '@emotion/styled';

import { useGetRandomProjects } from '@/api/endpoint/menuPreview/getRandomProjects';
import ScrollCarousel from '@/components/common/ScrollCarousel';
import useMediaQuery from '@/hooks/useMediaQuery';
import { DESKTOP_TWO_MEDIA_QUERY, MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';

import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const { data: projects = [] } = useGetRandomProjects();

  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const itemsPerView = isMobile ? 1 : 2;

  return (
    <>
      {/* ~1200: 캐러셀 (모바일 1장 / 태블릿 2장) */}
      <CarouselWrapper>
        <ScrollCarousel
          items={projects}
          itemsPerView={itemsPerView}
          autoSlideInterval={3000}
          renderItem={(project) => <ProjectCard project={project} />}
        />
      </CarouselWrapper>

      {/* 1200~: 캐러셀 없이 카드 3장 고정 */}
      <StaticGrid>
        {projects.map((project) => (
          <ProjectCard key={`static-${project.id}`} project={project} />
        ))}
      </StaticGrid>
    </>
  );
};

export default ProjectList;

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
