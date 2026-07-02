import AdditionalInfoSection from '@domain/suggest/AdditionalInfoSection';
import Header from '@domain/suggest/Header';
import RequiredInfoSection from '@domain/suggest/RequiredInfoSection';
import type { SuggestFormValues } from '@domain/suggest/schema';
import { suggestFormSchema } from '@domain/suggest/schema';
import SubmitButton from '@domain/suggest/SubmitButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { spacing } from '@sopt-mds/design-tokens';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

const SuggestMeetingPage = () => {
  const formMethods = useForm<SuggestFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(suggestFormSchema),
    defaultValues: {
      title: '',
      expectation: '',
      topics: [],
      participationMethod: '',
      participationLevel: '',
    },
  });
  const handleSubmit = formMethods.handleSubmit((formValues) => {
    // @TODO: 모임 제안 API 연동
    void formValues;
  });

  return (
    <FormProvider {...formMethods}>
      <SPage>
        <Header />

        <SForm onSubmit={handleSubmit}>
          {/* 두 Section 모두 Input, textArea mds2.0버전 교체 필요 */}
          <RequiredInfoSection />
          <AdditionalInfoSection />
          <SubmitButton />
        </SForm>
      </SPage>
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
