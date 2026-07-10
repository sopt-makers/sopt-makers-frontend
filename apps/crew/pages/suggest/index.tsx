import { useCreateMeetingDemandMutation } from '@api/meetingDemand/mutation';
import type { CreateMeetingDemandRequest } from '@api/meetingDemand/type';
import { useUserProfileQueryOption } from '@api/user/query';
import AdditionalInfoSection from '@domain/suggest/AdditionalInfoSection';
import Header from '@domain/suggest/Header';
import RequiredInfoSection from '@domain/suggest/RequiredInfoSection';
import type { SuggestFormValues } from '@domain/suggest/schema';
import { suggestFormSchema } from '@domain/suggest/schema';
import SubmitButton from '@domain/suggest/SubmitButton';
import { useDisplay } from '@hook/useDisplay';
import useModal from '@hook/useModal';
import { zodResolver } from '@hookform/resolvers/zod';
import ConfirmationModal from '@shared/modal/ConfirmationModal';
import { spacing } from '@sopt-mds/design-tokens';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const getCreateMeetingDemandRequest = ({ joinInfo, ...formValues }: SuggestFormValues): CreateMeetingDemandRequest => {
  const hasJoinInfo = joinInfo?.meetingType != null || joinInfo?.meetingFrequency != null;

  return {
    ...formValues,
    ...(hasJoinInfo ? { joinInfo } : {}),
  };
};

const SuggestMeetingPage = () => {
  const router = useRouter();
  const { isMobile } = useDisplay();
  const { data: me } = useQuery(useUserProfileQueryOption());
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
      onSuccess: ({ meetingDemandId }) => {
        ampli.completedMakeGroupSuggest({
          location: router.pathname,
          platform_type: isMobile ? 'MO' : 'PC',
          suggest_id: meetingDemandId,
          user_id: Number(me?.orgId),
        });
        confirmationModal.handleModalClose();
        formMethods.reset();
        router.push(`/suggest/detail?id=${meetingDemandId}`);
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
