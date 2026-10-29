import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@sopt-mds/ui';
import { useState } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';

import CoverImageField from '../fields/CoverImageField';
import DiningDateField from '../fields/DiningDateField';
import JoinablePartsField from '../fields/JoinablePartsField';
import LocationFields from '../fields/LocationFields';
import StartTimeField from '../fields/StartTimeField';
import FormActions from '../FormActions';
import FormLayout from '../FormLayout';
import type { SettlementFormValues } from '../schema';
import { settlementFormSchema } from '../schema';

const DEFAULT_SETTLEMENT_FORM_VALUES: SettlementFormValues = {
  title: '',
  place: '',
  naverMapLink: '',
  kakaoMapLink: '',
  diningDate: '',
  startTime: '',
  joinableParts: [],
  files: [],
};

interface SettlementFormProps {
  mode: 'create' | 'edit';
  initialValues?: SettlementFormValues;
  // TODO: API 연결 시 onSubmit을 필수로 변경하고, 옵셔널 호출과 버튼의 !onSubmit 조건을 제거
  onSubmit?: (values: SettlementFormValues) => void | Promise<void>;
  onDelete?: () => void;
}

const SettlementForm = ({ mode, initialValues, onSubmit, onDelete }: SettlementFormProps) => {
  const methods = useForm<SettlementFormValues>({
    defaultValues: initialValues ?? DEFAULT_SETTLEMENT_FORM_VALUES,
    resolver: zodResolver(settlementFormSchema),
    mode: 'onBlur',
  });
  const { field: title, fieldState: titleState } = useController({ control: methods.control, name: 'title' });
  const [isUploading, setIsUploading] = useState(false);
  const isEdit = mode === 'edit';
  const isPending = methods.formState.isSubmitting || isUploading;

  return (
    <FormProvider {...methods}>
      <FormLayout
        title={isEdit ? '회식 정보 수정' : '회식 정보 입력'}
        description='회식 등록에 필요한 필수 항목이 모두 입력되었는지 꼼꼼하게 확인해주세요.'
        onSubmit={methods.handleSubmit((values) => onSubmit?.(values))}
        actions={
          <FormActions
            submitLabel={isEdit ? '회식 수정하기' : '회식 등록하기'}
            submitDisabled={!onSubmit || !methods.formState.isValid || isPending}
            deleteLabel={isEdit ? '회식 삭제하기' : undefined}
            deleteDisabled={isPending}
            onDelete={onDelete}
          />
        }
      >
        <TextField
          {...title}
          label='회식명'
          placeholder='회식명'
          maxLength={30}
          required
          errorMessage={titleState.error?.message}
        />
        <LocationFields />
        <DiningDateField />
        <StartTimeField />
        <JoinablePartsField />
        <CoverImageField isUploading={isUploading} onUploadStateChange={setIsUploading} />
      </FormLayout>
    </FormProvider>
  );
};

export default SettlementForm;
