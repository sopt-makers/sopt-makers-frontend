import { useCreateMeetingDemandMutation } from '@api/meetingDemand/mutation';
import type { CreateMeetingDemandRequest } from '@api/meetingDemand/type';
import AdditionalInfoSection from '@domain/suggest/AdditionalInfoSection';
import Header from '@domain/suggest/Header';
import RequiredInfoSection from '@domain/suggest/RequiredInfoSection';
import type { SuggestFormValues } from '@domain/suggest/schema';
import { suggestFormSchema } from '@domain/suggest/schema';
import SubmitButton from '@domain/suggest/SubmitButton';
import useModal from '@hook/useModal';
import { zodResolver } from '@hookform/resolvers/zod';
import ConfirmationModal from '@shared/modal/ConfirmationModal';
import { spacing } from '@sopt-mds/design-tokens';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

const getCreateMeetingDemandRequest = ({ joinInfo, ...formValues }: SuggestFormValues): CreateMeetingDemandRequest => {
  const hasJoinInfo = joinInfo?.meetingType != null || joinInfo?.meetingFrequency != null;

  return {
    ...formValues,
    ...(hasJoinInfo ? { joinInfo } : {}),
  };
};

const SuggestMeetingPage = () => {
  const { mutate: mutateCreateMeetingDemand, isPending } = useCreateMeetingDemandMutation();
  const confirmationModal = useModal();
  const formMethods = useForm<SuggestFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(suggestFormSchema),
    defaultValues: {
      shortIntro: '',
      expectation: '',
      meetingKeywordTypes: [],
      joinInfo: {},
    },
  });
  const handleSubmit = formMethods.handleSubmit(() => {
    confirmationModal.handleModalOpen();
  });

  const handleConfirm = formMethods.handleSubmit((formValues) => {
    mutateCreateMeetingDemand(getCreateMeetingDemandRequest(formValues), {
      onSuccess: () => {
        confirmationModal.handleModalClose();
        formMethods.reset();
        // @TODO: 응답의 meetingDemandId를 사용해 생성된 모임 수요 상세 페이지로 이동
      },
    });
  });

  return (
    <FormProvider {...formMethods}>
      <SPage>
        <Header />

        <SForm onSubmit={handleSubmit}>
          {/* 두 Section 모두 Input, textArea mds2.0버전 교체 필요 */}
          <RequiredInfoSection />
          <AdditionalInfoSection />
          <SubmitButton disabled={!formMethods.formState.isValid} />
        </SForm>
      </SPage>

      <ConfirmationModal
        isOpen={confirmationModal.isModalOpened}
        title='모임을 제안할까요?'
        description={'원하는 내용을 모두 작성했나요?\n익명으로 제안되고 수정은 어려워요.'}
        cancelLabel='잠깐만요'
        confirmLabel='제안하기'
        onClose={confirmationModal.handleModalClose}
        onConfirm={handleConfirm}
        isPending={isPending}
      />
    </FormProvider>
  );
};

export default SuggestMeetingPage;

const SPage = styled('main', {
  'width': '100%',
  'maxWidth': '1120px',
  'margin': `${spacing.s80} auto`,

  '@desktop': {
    maxWidth: '704px',
  },

  '@tablet': {
    maxWidth: '688px',
  },

  '@mobile': {
    maxWidth: 'none',
    margin: `${spacing.s32} auto`,
  },
});

const SForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
});
