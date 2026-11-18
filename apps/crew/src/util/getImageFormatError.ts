import { ACCEPTED_IMAGE_TYPES } from '@type/form';

export const getImageFormatError = (file: File): string | undefined => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return '이미지 파일(JPG/JPEG, PNG, WebP, GIF)만 업로드할 수 있어요.';
  }
};
