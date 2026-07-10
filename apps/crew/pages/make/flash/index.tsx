import { usePostFlashMutation } from '@api/flash/mutation';
import { useUserProfileQueryOption } from '@api/user/query';
import BungaeIcon from '@assets/svg/bungae.svg';
import { useDisplay } from '@hook/useDisplay';
import { zodResolver } from '@hookform/resolvers/zod';
import FlashPresentation from '@shared/form/Presentation/FlashPresentation';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { useQuery } from '@tanstack/react-query';
import type { FlashFormType } from '@type/form';
import { flashSchema } from '@type/form';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const DevTool = dynamic(() => import('@hookform/devtools').then((module) => module.DevTool), {
  ssr: false,
});

const Flash = () => {
  const router = useRouter();
  const { isMobile } = useDisplay();
  const { data: me } = useQuery(useUserProfileQueryOption());
  const formMethods = useForm<FlashFormType>({
    mode: 'onChange',
    resolver: zodResolver(flashSchema),
  });
  const { isValid, errors, isDirty } = formMethods.formState;
  const { mutateAsync: mutateCreateFlash, isPending: isSubmitting } = usePostFlashMutation();

  const handleChangeImage = (index: number, url: string) => {
    const files = formMethods.getValues().files.slice();
    files.splice(index, 1, url);
    formMethods.setValue('files', files);
  };

  const handleDeleteImage = (index: number) => {
    const files = formMethods.getValues().files.slice();
    files.splice(index, 1);
    formMethods.setValue('files', files);
  };

  const onSubmit: SubmitHandler<FlashFormType> = async (formData) => {
    mutateCreateFlash(formData, {
      onSuccess: (data) => {
        ampli.completedMakeGroup({
          from_resume: false,
          from_group_suggest: false,
          group_category: '번쩍',
          group_id: data.meetingId,
          group_owner_id: Number(me?.orgId),
          location: router.pathname,
          platform_type: isMobile ? 'MO' : 'PC',
          user_id: Number(me?.orgId),
        });
        router.push(`/detail/flash?id=${data.meetingId}`);
      },
    });
  };

  return (
    <FormProvider {...formMethods}>
      <SContainer>
        <SFormContainer>
          <SFormName>번쩍 개설하기</SFormName>
          <SFormCaution>개설에 필요한 필수 항목이 모두 입력 되었는지 꼼꼼하게 확인해주세요!</SFormCaution>
          <FlashPresentation
            errors={errors}
            submitButtonLabel={
              <>
                {/* todo: mds icon 으로 교체 */}
                <BungaeIcon />
                번쩍 개설하기
              </>
            }
            handleChangeImage={handleChangeImage}
            handleDeleteImage={handleDeleteImage}
            onSubmit={formMethods.handleSubmit(onSubmit)}
            disabled={isSubmitting || !isValid || Object.keys(errors).length > 0 || !isDirty}
          />
        </SFormContainer>
      </SContainer>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
};

export default Flash;

const SContainer = styled('div', {
  'margin': '80px 0',
  'display': 'flex',
  'gap': '30px',

  '@mobile': {
    margin: 0,
  },
});
const SFormContainer = styled('div', {
  'width': '100%',
  'padding': '36px 40px 56px',
  'borderRadius': '15px',

  '@mobile': {
    padding: '40px 0 0 0',
    background: '$gray950',
  },
});
const SFormName = styled('h1', {
  'fontAg': '24_bold_100',
  'color': '$gray10',
  'marginBottom': '20px',

  '@mobile': {
    margin: 0,
    paddingBottom: '40px',
    borderBottom: '1px solid $gray700',
  },
});

const SFormCaution = styled('div', {
  ...fontsObject.BODY_4_13_M,
  padding: '14px 18px',
  marginBottom: '60px',
  borderRadius: '10px',
  border: `1px solid ${colors.blue600}`,
  background: 'var(--blue-alpha-100, rgba(52, 111, 250, 0.10))',
});
