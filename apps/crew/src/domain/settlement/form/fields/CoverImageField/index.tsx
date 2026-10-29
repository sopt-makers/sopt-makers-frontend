import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { IconPlus } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@type/form';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { styled } from 'stitches.config';

import type { SettlementFormValues } from '../../schema';
import { SDescription, SError, SFieldHeader, SLabel } from '../style';

interface CoverImageFieldProps {
  isUploading: boolean;
  onUpload: (file: File) => Promise<string>;
}

const CoverImageField = ({ isUploading, onUpload }: CoverImageFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useController<SettlementFormValues, 'files'>({ name: 'files' });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = useState('');
  const imageUrl = field.value[0];

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setUploadError('이미지 파일만 업로드할 수 있어요.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`${MAX_FILE_SIZE / 1024 ** 2}MB 이하의 이미지를 선택해주세요.`);
      return;
    }

    setUploadError('');
    try {
      const uploadedImageUrl = await onUpload(file);
      field.onChange([uploadedImageUrl]);
      field.onBlur();
    } catch {
      setUploadError('이미지를 업로드하지 못했어요. 다시 시도해주세요.');
    }
  };

  const handleDeleteImage = () => {
    field.onChange([]);
    setUploadError('');
  };

  return (
    <SImageField>
      <SFieldHeader>
        <SLabel htmlFor='settlement-cover-image'>대표 이미지</SLabel>
        <SDescription>회식을 대표하는 이미지 1장을 업로드 해주세요.</SDescription>
      </SFieldHeader>
      <div>
        <SImageArea aria-busy={isUploading}>
          {imageUrl ? (
            <SPreview>
              <SImage src={imageUrl} width={260} height={178} alt='회식 대표 이미지' />
              <SDeleteButton
                ref={field.ref}
                type='button'
                size='xsmall'
                variant='secondary'
                disabled={isUploading}
                onClick={handleDeleteImage}
                onBlur={field.onBlur}
                aria-describedby={uploadError || error ? 'settlement-cover-image-error' : undefined}
              >
                삭제
              </SDeleteButton>
            </SPreview>
          ) : (
            <SUploadButton
              ref={field.ref}
              type='button'
              aria-label='대표 이미지 추가'
              disabled={isUploading}
              onClick={() => inputRef.current?.click()}
              onBlur={field.onBlur}
              aria-describedby={uploadError || error ? 'settlement-cover-image-error' : undefined}
            >
              <IconPlus width={24} height={24} aria-hidden focusable='false' />
            </SUploadButton>
          )}
          <input
            ref={inputRef}
            id='settlement-cover-image'
            type='file'
            hidden
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
            disabled={isUploading || Boolean(imageUrl)}
            onChange={handleUploadImage}
          />
        </SImageArea>
        {(uploadError || error) && (
          <SError id='settlement-cover-image-error' role='alert'>
            {uploadError || error?.message}
          </SError>
        )}
      </div>
    </SImageField>
  );
};

export default CoverImageField;

const SImageField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s8,
});

const SImageArea = styled('div', { width: 260, maxWidth: '100%' });

const SUploadButton = styled('button', {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'width': '100%',
  'height': 178,
  'borderRadius': radius.r10,
  'backgroundColor': colors.bg.neutral.ghost,
  'color': colors.base.gray400,
  '&:disabled': { cursor: 'wait', opacity: 0.5 },
  '&:focus-visible': { outline: `2px solid ${colors.stroke.neutral.defaultFocused}` },
});

const SPreview = styled('div', { position: 'relative', height: 178, borderRadius: radius.r10, overflow: 'hidden' });

const SImage = styled('img', { display: 'block', width: '100%', height: '100%', objectFit: 'cover' });

const SDeleteButton = styled(ActionButton, {
  position: 'absolute',
  right: spacing.s8,
  bottom: spacing.s8,
});
