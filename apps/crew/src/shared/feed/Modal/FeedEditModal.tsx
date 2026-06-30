import { putPost } from '@api/post';
import PostQueryKey from '@api/post/PostQueryKey';
import { useGetPostDetailQueryOption } from '@api/post/query';
import { useUserProfileQueryOption } from '@api/user/query';
import { THUMBNAIL_IMAGE_INDEX } from '@constant/index';
import useModal from '@hook/useModal';
import { zodResolver } from '@hookform/resolvers/zod';
import ConfirmModal from '@shared/modal/ConfirmModal';
import type { ModalContainerProps } from '@shared/modal/ModalContainer';
import ModalContainer from '@shared/modal/ModalContainer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

import FeedFormPresentation from './FeedFormPresentation';
import type { FormEditType } from './feedSchema';
import { feedEditSchema } from './feedSchema';

const DevTool = dynamic(() => import('@hookform/devtools').then((module) => module.DevTool), {
  ssr: false,
});

interface EditModal extends ModalContainerProps {
  postId: number;
}

function FeedEditModal({ isModalOpened, postId, handleModalClose }: EditModal) {
  const queryClient = useQueryClient();
  const { data: postData } = useQuery(useGetPostDetailQueryOption(String(postId)));
  const exitModal = useModal();
  const submitModal = useModal();
  const { data: me } = useQuery(useUserProfileQueryOption());

  const formMethods = useForm<FormEditType>({
    mode: 'onChange',
    resolver: zodResolver(feedEditSchema),
  });

  const { isValid } = formMethods.formState;

  const { mutateAsync: mutateEditFeed, isPending: isSubmitting } = useMutation({
    mutationFn: (formData: FormEditType) => putPost(postId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PostQueryKey.detail(postId) });
      queryClient.invalidateQueries({ queryKey: PostQueryKey.all() });
      alert('피드를 수정했습니다.');
      submitModal.handleModalClose();
      handleModalClose();
    },
    onError: () => alert('피드를 수정하지 못했습니다.'),
  });

  const handleDeleteImage = (index: number) => {
    const images = formMethods.getValues().images.slice();
    images.splice(index, 1);
    formMethods.setValue('images', images);
  };

  const handleSubmitClick: SubmitHandler<FormEditType> = () => {
    submitModal.handleModalOpen();
  };

  const onSubmit = async () => {
    await mutateEditFeed(formMethods.getValues());
  };

  //고치기
  useEffect(() => {
    if (!postData) return;
    formMethods.reset({
      title: postData.title,
      contents: postData.contents,
      images: postData.images || [],
    });
  }, [formMethods, isModalOpened, postData]);

  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={exitModal.handleModalOpen}>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          <FeedFormPresentation
            userId={Number(me?.orgId)}
            groupInfo={{
              title: postData?.meeting?.title || '',
              imageUrl: postData?.meeting?.imageURL[THUMBNAIL_IMAGE_INDEX]?.url || '',
              category: postData?.meeting?.category || '',
            }}
            title='피드 수정'
            handleDeleteImage={handleDeleteImage}
            handleModalClose={handleModalClose}
            onSubmit={formMethods.handleSubmit(handleSubmitClick)}
            disabled={isSubmitting || !isValid}
          />
        </FormProvider>
      </SDialogWrapper>
      <ConfirmModal
        isModalOpened={exitModal.isModalOpened}
        message={`수정을 취소하시겠습니까?`}
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
        message='게시글을 수정하시겠습니까?'
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

export default FeedEditModal;

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
