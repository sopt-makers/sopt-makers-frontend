import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
// import { colors } from '@sopt-makers/colors';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconTrashOutlined } from '@sopt-mds/icons';
import { ActionButton, Tag } from '@sopt-mds/ui';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { deleteProject } from '@/api/endpoint_LEGACY/projects';
import useConfirm from '@/components/common/Modal/useConfirm';
import Responsive from '@/components/common/Responsive';
import MemberBlock from '@/components/members/common/MemberBlock';
import { getLinkInfo } from '@/components/projects/constants';
import { MemberRoleInfo } from '@/components/projects/constants';
import ProjectImageSlider from '@/components/projects/main/ProjectImageSlider';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import useGetProjectQuery from '@/components/projects/upload/hooks/useGetProjectQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const memberRoleOrder = [
  'TEAMLEADER',
  'MAINPM',
  'PM',
  'TEAMIMPROVEMENT',
  'DESIGN',
  'WEB',
  'SERVER',
  'ANDROID',
  'IOS',
] as const;
const sortByRole = <T extends { memberRole: (typeof memberRoleOrder)[number] }>(projectMembers: T[]): T[] =>
  [...projectMembers].sort((x, y) => memberRoleOrder.indexOf(x.memberRole) - memberRoleOrder.indexOf(y.memberRole));

interface ProjectDetailProps {
  projectId: string;
}

const ProjectDetail = ({ projectId }: ProjectDetailProps) => {
  const router = useRouter();

  const { data: project } = useGetProjectQuery({ id: projectId });
  const { data: me } = useGetMemberOfMe();
  const { refetch } = useGetProjectListQuery();

  const startAt = dayjs(project?.startAt).format('YYYY-MM');
  const endAt = project?.endAt ? dayjs(project.endAt).format('YYYY-MM') : '';
  const mainImage = project?.images[0];
  const sortedMembers = useMemo(() => sortByRole([...(project?.members ?? [])]), [project]);

  const { confirm } = useConfirm();

  const askDelete = async () => {
    const result = await confirm({
      title: '프로젝트 삭제',
      description: '프로젝트를 정말 삭제하시겠어요?',
      okButtonText: '삭제',
      okButtonColor: colors.bg.danger.default,
      cancelButtonText: '취소',
    });

    if (result) {
      handleDeleteProject();
    }
  };

  const handleDeleteProject = async () => {
    if (project) {
      await deleteProject(project.id);
      refetch();
      router.push(playgroundLink.projectList());
    }
  };

  return (
    <Container>
      <Header>
        <LogoImage src={project?.logoImage} alt={project?.name} />
        <InfoWrapper>
          <PrimaryInfo>
            <ServiceTypeWrapper>
              {project?.serviceType.map((type) => (
                <Tag key={type} size='large'>
                  {type}
                </Tag>
              ))}
            </ServiceTypeWrapper>
            <Name>{project?.name}</Name>
            <Description>{project?.summary}</Description>
          </PrimaryInfo>
          <PeriodInfo>
            <StartEndAt>{startAt}</StartEndAt>
            {endAt ? <StartEndAt> - {endAt}</StartEndAt> : <InProgress>진행 중</InProgress>}
          </PeriodInfo>
          <MobileServiceTypeWrapper>
            {project?.serviceType.map((type) => (
              <Tag key={type} size='small'>
                {type}
              </Tag>
            ))}
          </MobileServiceTypeWrapper>
        </InfoWrapper>

        {project?.writerId === me?.id && (
          <ControlWrapper>
            <Responsive only='desktop' asChild>
              <ActionButton
                size='large'
                variant='secondary'
                onClick={() => project && router.push(playgroundLink.projectEdit(project.id))}
              >
                수정하기
              </ActionButton>
            </Responsive>
            <Responsive only='mobile' asChild>
              <ActionButton
                size='small'
                variant='secondary'
                onClick={() => project && router.push(playgroundLink.projectEdit(project.id))}
              >
                수정하기
              </ActionButton>
            </Responsive>
            <DeleteButton onClick={askDelete}>
              <IconTrashOutlined />
            </DeleteButton>
          </ControlWrapper>
        )}
      </Header>

      {project?.images.length === 1 && (
        <MainImageWrapper>
          <MainImage src={mainImage} alt={project?.name} />
        </MainImageWrapper>
      )}
      {(project?.images ?? []).length > 1 && <StyledProjectImageSlider images={project?.images ?? []} />}

      <ProjectDetailContainer>
        <DetailContainer>
          <DetailTitle>Project Overview</DetailTitle>
          <DetailContent>{project?.detail}</DetailContent>
          <LinksWrapper>
            {project?.links.map((link) => {
              const { Icon } = getLinkInfo(link.linkTitle);
              return (
                <LinkBox key={link.linkId} href={link.linkUrl}>
                  <LinkIcon>
                    <Icon />
                  </LinkIcon>
                  {link.linkTitle}
                </LinkBox>
              );
            })}
          </LinksWrapper>
        </DetailContainer>

        <UserWrapper>
          <Info>
            {project?.generation && `${project.generation}기 `}
            {project?.category}
          </Info>
          <UserList>
            {sortedMembers.map((member) => {
              const badges = [];
              if (member.memberGenerations.length > 0) {
                badges.push(member.memberGenerations.map(String).join(', ') + '기');
              }

              return (
                <Link key={member.memberId} href={playgroundLink.memberDetail(member.memberId)}>
                  <MemberBlock
                    name={member.memberName}
                    position={MemberRoleInfo[member.memberRole]}
                    imageUrl={member.memberProfileImage}
                    badges={badges ?? []}
                  />
                </Link>
              );
            })}
            <MemberBlock name='조혜린' position='Front-end' imageUrl='' badges={['38기']} />
            <MemberBlock name='조혜린' position='Front-end' imageUrl='' badges={['38기']} />
            <MemberBlock name='조혜린' position='Front-end' imageUrl='' badges={['38기']} />
            <MemberBlock name='조혜린' position='Front-end' imageUrl='' badges={['38기']} />
          </UserList>
        </UserWrapper>
      </ProjectDetailContainer>
    </Container>
  );
};

export default ProjectDetail;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: ${spacing.s80};
  }
`;

const Header = styled.div`
  display: flex;
  gap: ${spacing.s40};
  align-items: center;
  padding: ${spacing.s48} 0 ${spacing.s36} 0;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: ${spacing.s20};
    align-items: flex-start;
    padding: ${spacing.s20} ${spacing.s20} ${spacing.s24} ${spacing.s20};
  }
`;

const LogoImage = styled.img`
  flex-shrink: 0;
  border-radius: 20px;
  width: 150px;
  height: 150px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 80px;
    height: 80px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s12};
  width: 100%;
`;

const PrimaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s4};

  @media ${MOBILE_MEDIA_QUERY} {
    gap: ${spacing.s6};
  }
`;

const ServiceTypeWrapper = styled.div`
  display: flex;
  gap: ${spacing.s6};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const MobileServiceTypeWrapper = styled.div`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: ${spacing.s6};
  }
`;

const Name = styled.h2`
  color: ${colors.fg.neutral.bold};
  ${typography.heading1}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.heading2}
  }
`;

const Description = styled.p`
  color: ${colors.fg.neutral.bold};
  ${typography.title3}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.body2}
  }
`;

const PeriodInfo = styled.p`
  display: flex;
  gap: ${spacing.s8};
`;

const StartEndAt = styled.span`
  color: ${colors.fg.neutral.subtle};
  ${typography.label1}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.label3}
  }
`;

const InProgress = styled.span`
  color: ${colors.fg.neutral.bold};
  ${typography.label1}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.label3}
  }
`;

const ControlWrapper = styled.div`
  display: flex;
  gap: ${spacing.s8};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;

    & > button {
      width: 100%;
    }
  }
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.s16};
  border-radius: ${radius.r12};
  background-color: ${colors.bg.neutral.subtle};
  cursor: pointer;

  &:hover {
    background-color: ${colors.bg.neutral.subtleHover};
  }

  & > svg {
    width: 24px;
    height: 24px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: ${spacing.s8};
    border-radius: ${radius.r10};

    & > svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const MainImageWrapper = styled.section`
  margin-bottom: 54px;
  border-radius: 12px;
  width: 100%;
  height: 675px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 0;
    border-radius: 0;
    height: 210px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledProjectImageSlider = styled(ProjectImageSlider)`
  margin-bottom: 54px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 0;
  }
`;

const ProjectDetailContainer = styled.section`
  display: flex;
  gap: ${spacing.s32};
  padding-bottom: 200px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: ${spacing.s48};
    padding: ${spacing.s24} ${spacing.s20} ${spacing.s0};
  }
`;

const DetailContainer = styled.div`
  border-radius: ${radius.r12};
  background: ${colors.bg.layer.default};
  padding: ${spacing.s48};
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: ${radius.r0};
    background: transparent;
    padding: ${spacing.s0};
  }
`;

const DetailTitle = styled.h3`
  margin-bottom: ${spacing.s32};
  color: ${colors.fg.neutral.bold};
  ${typography.heading3}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: ${spacing.s24};
    ${typography.heading4}
  }
`;

const DetailContent = styled.div`
  margin-bottom: ${spacing.s64};
  color: ${colors.fg.neutral.bold};
  white-space: pre-wrap; /* or pre-line */
  ${typography.body1}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: ${spacing.s48};
    ${typography.body2}
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: ${spacing.s32};
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  @media ${MOBILE_MEDIA_QUERY} {
    gap: ${spacing.s24};
  }
`;

const LinkBox = styled.a`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
  align-items: center;
  cursor: pointer;
  color: ${colors.fg.neutral.subtle};
  ${typography.label3}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.label4}
  }
`;

const LinkIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${colors.bg.neutral.subtle};
  width: 72px;
  height: 72px;
  color: ${colors.fg.neutral.bold};

  & svg {
    width: 48px;
    height: 48px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 54px;
    height: 54px;

    & svg {
      width: 36px;
      height: 36px;
    }
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s36};
  flex-shrink: 0;
  border-radius: ${radius.r12};
  background: ${colors.bg.layer.default};
  height: fit-content;
  padding: ${spacing.s48} ${spacing.s28};

  @media ${MOBILE_MEDIA_QUERY} {
    gap: ${spacing.s28};
    border-radius: ${radius.r0};
    background-color: transparent;
    padding: ${spacing.s0};
  }
`;

const Info = styled.div`
  color: ${colors.fg.neutral.bold};
  ${typography.heading3}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.heading4}
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s24};
`;
