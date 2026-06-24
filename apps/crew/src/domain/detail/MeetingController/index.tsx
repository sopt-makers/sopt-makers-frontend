import FlashQueryKey from '@api/flash/FlashQueryKey';
import type { GetFlash } from '@api/flash/type';
import MeetingQueryKey from '@api/meeting/MeetingQueryKey';
import {
  useDeleteMeetingApplicationMutation,
  useDeleteMeetingMutation,
  usePostEventApplicationMutation,
  usePostMeetingApplicationMutation,
} from '@api/meeting/mutation';
import { useMeetingPartMembersQueryOption } from '@api/meeting/query';
import type { GetMeeting } from '@api/meeting/type';
import { useUserProfileQueryOption } from '@api/user/query';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import ButtonLoader from '@common/loader/ButtonLoader';
import { ERecruitmentStatus } from '@constant/option';
import { CAPACITY } from '@domain/detail/MeetingController/constant';
import FlashAbout from '@domain/detail/MeetingController/FlashAbout';
import MeetingAbout from '@domain/detail/MeetingController/MeetingAbout';
import { useDisplay } from '@hook/useDisplay';
import useModal from '@hook/useModal';
import DefaultModal from '@shared/modal/DefaultModal';
import { playgroundLink } from '@sopt/constant';
import { fontsObject } from '@sopt-makers/fonts';
import { useDialog } from '@sopt-makers/ui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

import ProfileConfirmModal from './Modal/Confirm/ProfileConfirmModal';
import ApplicationModalContent from './Modal/Content/ApplicationModalContent';
import PartStatusModalContent from './Modal/Content/PartStatusModalContent';
import RecruitmentStatusModalContent from './Modal/Content/RecruitmentStatusModalContent';

interface DetailHeaderProps {
  detailData: GetMeeting['response'] | GetFlash['response'];
}

interface DialogOptionType {
  title: ReactNode;
  description: ReactNode;
  type?: 'default' | 'danger' | 'single' | undefined;
  typeOptions?: TypeOptionsProp;
}

interface TypeOptionsProp {
  cancelButtonText?: string;
  approveButtonText?: string;
  buttonFunction?: () => void;
}

const MeetingController = ({ detailData }: DetailHeaderProps) => {
  const { mutate: mutateMeetingDeletion } = useDeleteMeetingMutation();
  const { mutate: mutateApplication } = usePostMeetingApplicationMutation();
  const { mutate: mutateApplicationDeletion } = useDeleteMeetingApplicationMutation();
  const { mutate: mutateEventApplication } = usePostEventApplicationMutation();

  const isFlash = detailData.category === '번쩍';
  const { status, category, appliedInfo, approved, host: isHost, apply: isApplied, id: meetingId } = detailData;

  const { isMobile } = useDisplay();
  const { open: dialogOpen, close: dialogClose } = useDialog();
  const { data: me } = useQuery(useUserProfileQueryOption());
  const { data: partMembersData } = useQuery({
    ...useMeetingPartMembersQueryOption({ meetingId: Number(meetingId) }),
    enabled: !isFlash && !!meetingId, // 파트 신청 멤버 기능 flash는 제외, 추후 추가하면 enabled 조건에서 isFlash 제거
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const isRecruiting = status === ERecruitmentStatus.RECRUITING;
  const {
    isModalOpened: isProfileModalOpened,
    handleModalOpen: handleProfileModalOpen,
    handleModalClose: handleProfileModalClose,
  } = useModal();
  const {
    isModalOpened: isDefaultModalOpened,
    handleModalOpen: handleDefaultModalOpen,
    handleModalClose: handleDefaultModalClose,
  } = useModal();
  const [modalTitle, setModalTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRecruitmentStatusModal = () => {
    ampli.clickMemberStatus({ crew_status: approved || isHost });
    handleDefaultModalOpen();
    setModalTitle(`모집 현황 (${CAPACITY(detailData)})`);
  };

  const isActiveGeneration = partMembersData?.isActiveGeneration ?? true;
  const partLabel = isActiveGeneration
    ? `${partMembersData?.part} 파트 신청 멤버`
    : `${partMembersData?.activeGeneration}기 신청 멤버`;

  const handlePartStatusModal = () => {
    const { entry_source } = router.query;
    ampli.clickViewMemberModal({
      Applied_generation: isActiveGeneration,
      Applied_part: partMembersData?.part,
      group_category: category,
      group_generation: isActiveGeneration,
      group_id: Number(meetingId),
      location: router.pathname,
      platform_type: isMobile ? 'MO' : 'PC',
      user_id: Number(me?.orgId),
      entry_source: typeof entry_source === 'string' ? entry_source : undefined,
    });
    handleDefaultModalOpen();
    setModalTitle(partLabel);
  };

  const handleHostModalOpen = () => {
    const dialogOption: DialogOptionType = {
      title: '모임을 삭제하시겠습니까?',
      description: '삭제한 모임은 되돌릴 수 없어요',
      type: 'default',
      typeOptions: {
        cancelButtonText: '취소',
        approveButtonText: '삭제하기',
        buttonFunction: handleDeleteMeeting,
      },
    };
    dialogOpen(dialogOption);
  };

  const handleDeleteMeeting = () => {
    queryClient.invalidateQueries({ queryKey: MeetingQueryKey.list() });
    mutateMeetingDeletion(Number(meetingId), {
      onSuccess: () => {
        dialogClose();
        router.push('/');
      },
    });
  };

  const handleApplicationModal = () => {
    if (!isApplied) {
      if (category === '행사') {
        ampli.clickEventApply({
          Applied_generation: isActiveGeneration,
          event_cta_location: 'group/detail',
          event_id: Number(meetingId),
          platform_type: isMobile ? 'MO' : 'PC',
          user_id: Number(me?.orgId),
        });
      } else {
        const { entry_source } = router.query;
        ampli.clickRegisterGroup({
          user_id: Number(me?.orgId),
          entry_source: typeof entry_source === 'string' ? entry_source : undefined,
        });
      }
      handleApplicationButton('No resolution');
      return;
    }

    if (!me?.hasActivities) {
      handleProfileModalOpen();
      return;
    }

    const dialogOption: DialogOptionType = {
      title: '신청을 취소하시겠습니까?',
      description: '',
      type: 'default',
      typeOptions: {
        cancelButtonText: '돌아가기',
        approveButtonText: '취소하기',
        buttonFunction: handleCancelApplication,
      },
    };
    dialogOpen(dialogOption);
  };

  const handleApplicationButton = (textareaValue: string) => {
    setIsSubmitting(true);
    if (category === '행사') {
      mutateEventApplication(
        { meetingId: Number(meetingId), content: textareaValue },
        {
          onSuccess: async () => {
            await queryClient.refetchQueries({
              queryKey: MeetingQueryKey.detail(meetingId),
            });
            dialogOpen({
              title: '신청 완료 되었습니다',
              description: '',
              type: 'single',
              typeOptions: {
                approveButtonText: '확인',
                buttonFunction: dialogClose,
              },
            });

            setIsSubmitting(false);
            handleDefaultModalClose();
          },
          onError: async (error: unknown) => {
            if (error instanceof AxiosError) {
              await queryClient.refetchQueries({
                queryKey: MeetingQueryKey.detail(meetingId),
              });
              const errorResponse = error.response as AxiosResponse;
              dialogOpen({
                title: errorResponse.data.errorCode,
                description: '',
                type: 'single',
                typeOptions: {
                  approveButtonText: '확인',
                  buttonFunction: dialogClose,
                },
              });
              setIsSubmitting(false);
              handleDefaultModalClose();
            }
          },
        },
      );
    } else {
      mutateApplication(
        { meetingId: Number(meetingId), content: textareaValue },
        {
          onSuccess: async () => {
            await queryClient.refetchQueries({
              queryKey: MeetingQueryKey.detail(meetingId),
            });
            await queryClient.refetchQueries({
              queryKey: FlashQueryKey.detail(meetingId),
            });
            dialogOpen({
              title: '신청 완료 되었습니다',
              description: '',
              type: 'single',
              typeOptions: {
                approveButtonText: '확인',
                buttonFunction: dialogClose,
              },
            });

            setIsSubmitting(false);
            handleDefaultModalClose();
          },
          onError: async (error: unknown) => {
            if (error instanceof AxiosError) {
              await queryClient.refetchQueries({
                queryKey: MeetingQueryKey.detail(meetingId),
              });
              await queryClient.refetchQueries({
                queryKey: FlashQueryKey.detail(meetingId),
              });
              const errorResponse = error.response as AxiosResponse;
              dialogOpen({
                title: errorResponse.data.errorCode,
                description: '',
                type: 'single',
                typeOptions: {
                  approveButtonText: '확인',
                  buttonFunction: dialogClose,
                },
              });
            }
            setIsSubmitting(false);
            handleDefaultModalClose();
          },
        },
      );
    }
  };

  const handleCancelApplication = () => {
    setIsSubmitting(true);
    mutateApplicationDeletion(Number(meetingId), {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: MeetingQueryKey.detail(meetingId),
        });
        await queryClient.refetchQueries({
          queryKey: FlashQueryKey.detail(meetingId),
        });
        alert('신청이 취소됐습니다!');
        setIsSubmitting(false);
      },
      onError: async (error: unknown) => {
        if (error instanceof AxiosError) {
          await queryClient.refetchQueries({
            queryKey: MeetingQueryKey.detail(meetingId),
          });
          const errorResponse = error.response as AxiosResponse;
          alert(errorResponse.data.errorCode);
          setIsSubmitting(false);
        }
      },
    });
  };

  return (
    <>
      <SPanelWrapper>
        {isFlash ? (
          <FlashAbout detailData={detailData as GetFlash['response']} />
        ) : (
          <MeetingAbout detailData={detailData as GetMeeting['response']} />
        )}
        <div>
          <SStatusButtonWrapper>
            {/* 파트 신청 멤버 기능 flash는 제외, 추후 추가하면 isFlash 분기 제거  */}
            {!isFlash && (
              <SPartStatusButton onClick={handlePartStatusModal}>
                <span>
                  <SFireEmoji>🔥 </SFireEmoji>
                  {isActiveGeneration ? (
                    <>
                      <SPartName>{partMembersData?.part} 파트</SPartName> {partMembersData?.participantCount ?? 0}명
                      <SApplyingText> 신청 중</SApplyingText>
                    </>
                  ) : (
                    <>
                      <SPartName>{partMembersData?.activeGeneration}기 멤버 </SPartName>
                      {partMembersData?.participantCount ?? 0}명<SApplyingText> 신청 중</SApplyingText>
                    </>
                  )}
                </span>
                <ArrowSmallRightIcon />
              </SPartStatusButton>
            )}
            <SStatusButton onClick={handleRecruitmentStatusModal}>
              <div>
                <span>모집 현황</span>
                <span>{CAPACITY(detailData)}</span>
              </div>
              <ArrowSmallRightIcon />
            </SStatusButton>
          </SStatusButtonWrapper>
          {!isHost && (
            <SGuestButton
              disabled={!isRecruiting || isSubmitting}
              isApplied={isApplied}
              onClick={handleApplicationModal}
            >
              {isSubmitting ? <ButtonLoader /> : `신청${isApplied ? '취소' : '하기'}`}
            </SGuestButton>
          )}
          {isHost && (
            <SHostButtonContainer>
              <button onClick={handleHostModalOpen}>삭제</button>
              <Link href={isFlash ? `/edit/flash?id=${meetingId}` : `/edit?id=${meetingId}`}>수정</Link>
            </SHostButtonContainer>
          )}
        </div>
      </SPanelWrapper>

      <ProfileConfirmModal
        isModalOpened={isProfileModalOpened}
        handleModalClose={handleProfileModalClose}
        handleConfirm={() => (window.location.href = `${playgroundLink.memberUpload()}`)}
      />

      <DefaultModal
        isModalOpened={isDefaultModalOpened}
        title={modalTitle}
        handleModalClose={handleDefaultModalClose}
        isSubmitting={isSubmitting}
      >
        {modalTitle === '모임 신청하기' && (
          <ApplicationModalContent handleApplicationButton={handleApplicationButton} disabled={isSubmitting} />
        )}
        {modalTitle.includes('모집 현황') && (
          <RecruitmentStatusModalContent
            meetingId={Number(meetingId)}
            appliedInfo={appliedInfo}
            isHost={isHost}
            isCoLeader={'isCoLeader' in detailData ? detailData.isCoLeader : false}
            isApplied={isApplied}
          />
        )}
        {modalTitle.includes('신청 멤버') && partMembersData && (
          <PartStatusModalContent partMembersData={partMembersData} />
        )}
      </DefaultModal>
    </>
  );
};

export default MeetingController;

const SPanelWrapper = styled('div', {
  'flexType': 'verticalCenter',
  'justifyContent': 'space-between',
  'pb': '$120',
  'borderBottom': `2px solid $gray700`,
  'mb': '$40',

  '@mobile': {
    display: 'block',
    paddingBottom: '0',
    borderBottom: 'none',
    mb: '$64',
  },
});

const SStatusButtonWrapper = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '$8',
  'mb': '$16',

  '@mobile': {
    flexDirection: 'row',
    mt: '$36',
    mb: '$10',
  },
});

const SPartStatusButton = styled('button', {
  'outline': 'solid 1px $gray700',
  'display': 'flex',
  'alignItems': 'center',
  'width': '$300',
  'height': '$34',
  'borderRadius': '999px',
  'backgroundColor': '$gray800',
  'paddingRight': '$20',
  'color': '$gray10',

  '& > span': {
    flex: 1,
    textAlign: 'center',
    ...fontsObject.BODY_2_16_R,
    whiteSpace: 'nowrap',
  },

  '& > svg': {
    flexShrink: 0,
  },

  // 모바일: flex + SStatusButton과 동일한 UI, 오른쪽 배치
  '@mobile': {
    'outline': 'none',
    'display': 'flex',
    'flex': 1,
    'height': '$46',
    'width': 'auto',
    'borderRadius': '8px',
    'padding': '$13 0',
    'justifyContent': 'center',
    'order': 2,

    '& > span': {
      flex: 'initial',
      textAlign: 'initial',
      ...fontsObject.LABEL_3_14_SB,
      whiteSpace: 'normal',
      mr: '$6',
      color: '$white',
    },

    '& > svg': {
      ml: '$2',
    },
  },
});

const SFireEmoji = styled('span', {
  '@mobile': { display: 'none' },
});

const SPartName = styled('span', {
  'color': '$orange400',
  'fontWeight': 'bold',
  '@mobile': { color: 'inherit' },
});

const SApplyingText = styled('span', {
  '@mobile': { display: 'none' },
});

const Button = styled('button', {
  width: '$300',
  height: '$60',
  borderRadius: '8px',
  color: '$gray10',
});

const SStatusButton = styled(Button, {
  'flexType': 'verticalCenter',
  'justifyContent': 'space-between',
  'padding': '$21 $20',
  'backgroundColor': '$gray800',
  ...fontsObject.LABEL_1_18_SB,

  '@mobile': {
    flex: 1,
    height: '$46',
    padding: '$13 0',
    ...fontsObject.LABEL_3_14_SB,

    textAlign: 'center',
    justifyContent: 'center',
    fontStyle: 'T5',

    order: 1,

    svg: {
      ml: '$2',
    },
  },

  'span:first-child': {
    mr: '$6',
    color: '$gray400',
  },
});

const SGuestButton = styled(Button, {
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  ...fontsObject.LABEL_1_18_SB,

  'padding': '$20 0',
  'textAlign': 'center',
  'color': '$gray950',
  '@mobile': {
    width: '100%',
    height: '$46',
    fontStyle: 'T5',
    padding: '$13 0',
  },

  '&:disabled': {
    opacity: '0.35',
    backgroundColor: '$gray600',
    color: '$gray100',
    cursor: 'not-allowed',
  },

  'variants': {
    isApplied: {
      true: {
        border: `2px solid $gray600`,
        color: '$gray10',
      },
      false: {
        backgroundColor: '$gray10',
      },
    },
    isApproved: {
      true: {
        color: '$gray10',
        border: `2px solid $gray600`,
      },
    },
  },
});

const SHostButtonContainer = styled('div', {
  '& > *': {
    'width': '$144',
    'color': '$gray10',
    'padding': '$20 0',
    'textAlign': 'center',
    'borderRadius': '$50',
    'fontAg': '20_bold_100',

    '@mobile': {
      width: 'calc(50% - 3.5px)',
      padding: '$16 0',
      fontAg: '14_bold_100',
    },
  },

  'button': {
    'border': `2px solid $gray600`,
    'mr': '$12',

    '@mobile': {
      mr: '$7',
    },
  },

  'a': {
    display: 'inline-block',
    backgroundColor: '$gray10',
    color: '$gray950',
  },
});
