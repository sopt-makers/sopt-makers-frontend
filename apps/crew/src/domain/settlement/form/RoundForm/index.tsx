import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import LocationFields from '../fields/LocationFields';
import StartTimeField from '../fields/StartTimeField';
import FormActions from '../FormActions';
import FormLayout from '../FormLayout';
import type { RoundFieldValues } from '../schema';
import { roundFormSchema } from '../schema';

const DEFAULT_ROUND_FORM_VALUES: RoundFieldValues = {
  place: '',
  naverMapLink: '',
  kakaoMapLink: '',
  startTime: '',
};

interface RoundFormProps {
  mode: 'create' | 'edit';
  initialValues?: RoundFieldValues;
  onSubmit: (values: RoundFieldValues) => void | Promise<void>;
  onDelete?: () => void;
  deleteDisabled?: boolean;
  isDeleting?: boolean;
}

const RoundForm = ({
  mode,
  initialValues,
  onSubmit,
  onDelete,
  deleteDisabled = false,
  isDeleting = false,
}: RoundFormProps) => {
  const methods = useForm<RoundFieldValues>({
    defaultValues: initialValues ?? DEFAULT_ROUND_FORM_VALUES,
    resolver: zodResolver(roundFormSchema),
    mode: 'onBlur',
  });
  const { isSubmitting, isValid } = methods.formState;
  const isPending = isSubmitting || isDeleting;

  return (
    <FormProvider {...methods}>
      <FormLayout
        title={mode === 'edit' ? '회차 수정하기' : '회차 추가하기'}
        description='회식 일자, 참여 파트는 기존과 동일하게 적용돼요.'
        onSubmit={methods.handleSubmit(onSubmit)}
        actions={
          <FormActions
            submitLabel={mode === 'edit' ? '회차 수정하기' : '회차 추가하기'}
            submitDisabled={!isValid || isPending}
            deleteLabel={mode === 'edit' ? '회차 삭제하기' : undefined}
            deleteDisabled={deleteDisabled || isPending}
            onDelete={onDelete}
          />
        }
      >
        <LocationFields />
        <StartTimeField />
      </FormLayout>
    </FormProvider>
  );
};

export default RoundForm;
