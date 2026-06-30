import { useMutationPostPostWithMention } from '@api/mention/mutation';
import { postPost } from '@api/post';
import PostQueryKey from '@api/post/PostQueryKey';
import { useUserMeetingAllQueryOption, useUserProfileQueryOption } from '@api/user/query';
import useModal from '@hook/useModal';
import useThrottle from '@hook/useThrottle';
import { zodResolver } from '@hookform/resolvers/zod';
import ConfirmModal from '@shared/modal/ConfirmModal';
import type { ModalContainerProps } from '@shared/modal/ModalContainer';
import ModalContainer from '@shared/modal/ModalContainer';
import { parseMentionedUserIds } from '@shared/util/parseMentionedUserIds';
import { useToast } from '@sopt-makers/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@util/dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

import FeedFormPresentation from './FeedFormPresentation';
import type { FormCreateType } from './feedSchema';
import { feedCreateSchema } from './feedSchema';

const DevTool = dynamic(() => import('@hookform/devtools').then((module) => module.DevTool), {
  ssr: false,
});

interface CreateModalProps extends ModalContainerProps {
  isMumuEntry?: boolean;
}

function FeedCreateWithSelectMeetingModal({ isModalOpened, handleModalClose, isMumuEntry = false }: CreateModalProps) {
  const queryClient = useQueryClient();
  const { open } = useToast();
  const router = useRouter();
  const { data: attendMeetingList, isLoading: isFetchAttendMeetingLoading } = useQuery(useUserMeetingAllQueryOption());

  const { data: me } = useQuery(useUserProfileQueryOption());
  const exitModal = useModal();
  const submitModal = useModal();
  const platform = window.innerWidth > 768 ? 'PC' : 'MO';

  const formMethods = useForm<FormCreateType>({
    mode: 'onChange',
    resolver: zodResolver(feedCreateSchema),
  });

  const { isValid } = formMethods.formState;
  const meetingType = formMethods.getValues('meetingId')
    ? attendMeetingList?.filter((item) => item.id == formMethods.getValues('meetingId'))[0]?.category
    : '';

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  let basePath = '';
  const { mutate: mutatePostPostWithMention } = useMutationPostPostWithMention({});

  if (hostname === 'localhost' || hostname.includes('dev')) {
    basePath = 'https://sopt-internal-dev.pages.dev';
  } else {
    basePath = 'https://playground.sopt.org';
  }

  const { mutateAsync: mutateCreateFeed, isPending: isSubmitting } = useMutation({
    mutationFn: (formData: FormCreateType) => postPost(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: PostQueryKey.all() });
      alert('피드를 작성했습니다.');
      mutatePostPostWithMention({
        postId: res.postId,
        orgIds: parseMentionedUserIds(formMethods.getValues().contents),
        content: formMethods.getValues().contents,
      });
      submitModal.handleModalClose();
      handleModalClose();
    },
    onError: () => alert('피드 작성에 실패했습니다.'),
  });

  const handleDeleteImage = (index: number) => {
    const images = formMethods.getValues().images.slice();
    images.splice(index, 1);
    formMethods.setValue('images', images);
  };

  const handleSubmitClick: SubmitHandler<FormCreateType> = () => {
    submitModal.handleModalOpen();
  };

  const onSubmit = useThrottle(async () => {
    const createFeedParameter = { ...formMethods.getValues() };
    await mutateCreateFeed(createFeedParameter);
    ampli.completedFeedPosting({
      user_id: Number(me?.orgId),
      platform_type: platform,
      feed_upload: formatDate(),
    });
  }, 5000);

  useEffect(() => {
    return () => {
      ampli.completedFeedPostingCanceled({
        user_id: Number(me?.orgId),
        platform_type: platform,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={exitModal.handleModalOpen}>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          {!isFetchAttendMeetingLoading && (
            <FeedFormPresentation
              userId={Number(me?.orgId)}
              attendGroupsInfo={attendMeetingList}
              title='피드 작성'
              handleDeleteImage={handleDeleteImage}
              handleModalClose={handleModalClose}
              setMeetingInfo={(meetingInfo) =>
                formMethods.setValue('meetingId', meetingInfo?.id as number, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              onSubmit={formMethods.handleSubmit(handleSubmitClick)}
              disabled={isSubmitting || !isValid}
              shouldShowMumuLetter={isMumuEntry}
            />
          )}
        </FormProvider>
      </SDialogWrapper>
      <ConfirmModal
        isModalOpened={exitModal.isModalOpened}
        message={`피드 작성을 그만두시겠어요?\n지금까지 쓴 내용이 지워져요.`}
        handleModalClose={exitModal.handleModalClose}
        cancelButton='돌아가기'
        confirmButton='그만두기'
        handleConfirm={() => {
          exitModal.handleModalClose();
          handleModalClose();
        }}
      />
      <ConfirmModal
        isModalOpened={submitModal.isModalOpened}
        message='게시글을 작성하시겠습니까?'
        handleModalClose={submitModal.handleModalClose}
        cancelButton='돌아가기'
        confirmButton='확인'
        handleConfirm={onSubmit}
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DevTool control={formMethods.control} />
    </ModalContainer>
  );
}

export default FeedCreateWithSelectMeetingModal;

const SDialogWrapper = styled('div', {
  'position': 'fixed',
  'top': '58px',
  'bottom': '58px',
  'left': '50%',
  'transform': 'translateX(-50%)',
  'zIndex': '$2',
  'borderRadius': '20px',
  'backgroundColor': '$gray700',
  'width': '100%',
  'maxWidth': '$768',
  'height': '889px',
  'boxShadow': '0px 4px 4px rgba(0,0,0,0.25)',
  'maxHeight': 'calc(100vh - 116px)',
  'overflowX': 'hidden',
  'overflowY': 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '@large_desktop': {
    top: '96px',
    bottom: '97px',
    maxHeight: 'calc(100vh - 193px)',
  },
  '@tablet': {
    top: '56px',
    bottom: '56px',
    maxHeight: 'calc(100vh - 112px)',
  },
  '@mobile': {
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    boxShadow: 'none',
    borderRadius: '0',
    overflowY: 'hidden',
  },
});
