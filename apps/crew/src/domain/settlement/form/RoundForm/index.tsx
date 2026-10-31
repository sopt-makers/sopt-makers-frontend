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
  // TODO: API 연동 시 빈 startTime을 요청에서 제외하도록 변환
  startTime: '',
};

interface RoundFormProps {
  mode: 'create' | 'edit';
  initialValues?: RoundFieldValues;
  // TODO: API 연결 시 onSubmit을 필수로 변경하고, 옵셔널 호출과 버튼의 !onSubmit 조건 제거
  onSubmit?: (values: RoundFieldValues) => void | Promise<void>;
  onDelete?: () => void;
}

const RoundForm = ({ mode, initialValues, onSubmit, onDelete }: RoundFormProps) => {
  const methods = useForm<RoundFieldValues>({
    defaultValues: initialValues ?? DEFAULT_ROUND_FORM_VALUES,
    resolver: zodResolver(roundFormSchema),
    mode: 'onBlur',
  });
  const { isSubmitting, isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <FormLayout
        title={mode === 'edit' ? '회차 수정하기' : '회차 추가하기'}
        description='회식 일자, 참여 파트는 기존과 동일하게 적용돼요.'
        onSubmit={methods.handleSubmit((values) => onSubmit?.(values))}
        actions={
          <FormActions
            submitLabel={mode === 'edit' ? '회식 수정하기' : '회식 등록하기'}
            submitDisabled={!onSubmit || !isValid || isSubmitting}
            deleteLabel={mode === 'edit' ? '회식 삭제하기' : undefined}
            deleteDisabled={isSubmitting}
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
