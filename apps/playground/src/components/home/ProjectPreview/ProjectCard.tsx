import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import dayjs from 'dayjs';
import Link from 'next/link';

import type { RandomProject } from '@/api/endpoint/menuPreview/getRandomProjects';
import ResizedImage from '@/components/common/ResizedImage';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';

import ProjectStatus from './ProjectStatus';

const dateIntoMonthPeriod = (startDate: RandomProject['startAt'], endDate: RandomProject['endAt']) => {
  if (!startDate) {
    return null;
  }

  const formattedStart = dayjs(startDate).format('YYYY.MM');
  const formattedEnd = endDate ? `- ${dayjs(endDate).format('YYYY.MM')}` : '진행중';
  return `${formattedStart} ${formattedEnd}`;
};

interface ProjectCardProps {
  project: RandomProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const hasStatus = project.isAvailable || project.isFounding;

  return (
    <LoggingImpression eventKey='projectCard' param={{ projectId: project.id, screen: 'home' }}>
      <LoggingClick eventKey='projectCard' param={{ projectId: project.id, referral: 'home' }}>
        <Link href={playgroundLink.projectDetail(project.id)}>
          <StyledContainer>
            <StyledImage height={180} src={project.thumbnailImage} alt='프로젝트_이미지' />
            <StyledBody>
              <StyledImage height={56} src={project.logoImage} alt='팀_로고_이미지' isLogo={true} />
              <StyledInfo>
                <StyledTitleGroup>
                  <StyledCategory>
                    <span>
                      {project.generation && `${project.generation}기`} {project.category}
                    </span>
                    <StyledDot>∙</StyledDot>
                    <StyledPlatform>{project.serviceType.join('/')}</StyledPlatform>
                  </StyledCategory>
                  <StyledTitle>{project.name}</StyledTitle>
                </StyledTitleGroup>
                <StyledStatusGroup>
                  <StyledDuration>{dateIntoMonthPeriod(project.startAt, project.endAt)}</StyledDuration>
                  {hasStatus && (
                    <StyledStatus>
                      {project.isAvailable && <ProjectStatus>서비스 이용 가능</ProjectStatus>}
                      {project.isFounding && <ProjectStatus>창업 중</ProjectStatus>}
                    </StyledStatus>
                  )}
                </StyledStatusGroup>
              </StyledInfo>
            </StyledBody>
          </StyledContainer>
        </Link>
      </LoggingClick>
    </LoggingImpression>
  );
};

export default ProjectCard;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 302px;
  border-radius: 12px;
  background-color: ${colors.gray900};
  cursor: pointer;
`;

const StyledImage = styled(ResizedImage)<{ isLogo?: boolean }>`
  width: ${(props) => (props.isLogo ? '56px' : '100%')};
  height: ${(props) => (props.isLogo ? '56px' : '180px')};
  border-radius: ${(props) => (props.isLogo ? '6px' : '8px 8px 0 0')};
  object-fit: cover;
`;

const StyledBody = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 16px;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const StyledTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledStatusGroup = styled(StyledTitleGroup)``;

const StyledCategory = styled.div`
  display: flex;
  gap: 2px;
  color: ${colors.gray100};
  ${fonts.LABEL_12_SB}
`;

const StyledDot = styled.span`
  color: ${colors.gray400};
`;

const StyledPlatform = styled(StyledDot)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${colors.white};
  ${fonts.TITLE_16_SB}
`;

const StyledDuration = styled.div`
  color: ${colors.gray50};
  ${fonts.BODY_13_M}
`;

const StyledStatus = styled.div`
  display: flex;
  gap: 6px;
`;
