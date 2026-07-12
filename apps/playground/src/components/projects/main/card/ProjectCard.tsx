import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { Tag } from '@sopt-mds/ui';

import type { Project } from '@/api/endpoint/projects/getProjects';
import ResizedImage from '@/components/common/ResizedImage';
import Responsive from '@/components/common/Responsive';
import ProjectCardStatus from '@/components/projects/main/card/ProjectCardStatus';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import { getLinkInfo } from '../../constants';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    thumbnailImage,
    logoImage,
    name,
    serviceType,
    generation,
    category,
    summary,
    isAvailable,
    isFounding,
    links,
  } = project;

  const hasStatus = isAvailable || isFounding;
  const hasLinks = links.length > 0;

  return (
    <StyledCard>
      <Preview>
        <Responsive only='desktop'>
          <ThumbnailImage height={192} src={thumbnailImage} alt='프로젝트_썸네일_이미지' />
        </Responsive>
        <Responsive only='mobile'>
          <LogoImage height={48} src={logoImage} alt='프로젝트_로고_이미지' />
        </Responsive>
        <Header>
          <TitleRow>
            <Title>{name}</Title>
            {serviceType.map((service) => (
              <Tag key={service} size='small'>
                {service}
              </Tag>
            ))}
          </TitleRow>
          <Origin>
            {generation && `${generation}기 `}
            {category}
          </Origin>
        </Header>
      </Preview>

      <Content>
        <Summary>{summary}</Summary>
        {(hasStatus || hasLinks) && (
          <MetaRow>
            {hasStatus && (
              <StatusArea>
                {isAvailable && <ProjectCardStatus>서비스 이용 가능</ProjectCardStatus>}
                {isFounding && <ProjectCardStatus>창업 중</ProjectCardStatus>}
              </StatusArea>
            )}
            {hasLinks && (
              <LinkArea>
                {links.map((link) => {
                  const { Icon: LinkIcon } = getLinkInfo(link.linkTitle);
                  return (
                    <LinkIconWrapper key={link.linkId}>
                      <LinkIcon width={16} height={16} />
                    </LinkIconWrapper>
                  );
                })}
              </LinkArea>
            )}
          </MetaRow>
        )}
      </Content>
    </StyledCard>
  );
};

export default ProjectCard;

const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s16};
  // TODO: border color 피그마 반영 후 변경
  border: 1px solid ${colors.stroke.neutral.ghost};
  border-radius: ${radius.r20};
  padding: ${spacing.s14};
  width: 352px;
  height: 100%;

  transition: transform 0.2s;
  &:hover {
    transform: translateY(-8px);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    height: fit-content;
    gap: ${spacing.s12};
    border: none;
    border-bottom: 1px solid ${colors.stroke.neutral.ghost};
    border-radius: ${radius.r0};
    padding: ${spacing.s12} ${spacing.s20};

    &:hover {
      transform: none;
    }
  }
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s16};

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    gap: ${spacing.s12};
  }
`;

const ThumbnailImage = styled(ResizedImage)`
  flex: none;
  border-radius: ${radius.r8};
  width: 100%;
  height: 192px;
  object-fit: cover;
`;

const LogoImage = styled(ResizedImage)`
  border-radius: ${radius.r10};
  width: 48px;
  height: 48px;
  object-fit: cover;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s2};
  min-width: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: ${spacing.s6};
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s4};
  min-width: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: ${spacing.s6};
  }
`;

const Title = styled.h1`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${colors.fg.neutral.bold};
  ${typography.title3}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.title4}
  }
`;

const Origin = styled.span`
  color: ${colors.fg.neutral.subtle};
  ${typography.label4}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
  flex: 1;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: ${spacing.s6};
  }
`;

const Summary = styled.div`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  color: ${colors.fg.neutral.default};
  ${typography.body2}
`;

const MetaRow = styled.div`
  display: flex;
  flex: 1;
`;

const StatusArea = styled.div`
  display: flex;
  gap: ${spacing.s6};
`;

const LinkArea = styled.div`
  display: flex;
  gap: ${spacing.s4};
  margin-left: auto;
`;

const LinkIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.r6};
  background-color: ${colors.bg.neutral.ghost};
  padding: ${spacing.s4};
  color: ${colors.fg.neutral.bold};
`;
