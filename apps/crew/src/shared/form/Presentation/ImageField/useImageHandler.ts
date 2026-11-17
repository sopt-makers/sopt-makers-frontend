import { getPresignedUrl, uploadImage } from '@api/image';
import { imageS3Bucket } from '@constant/url';
import { MAX_FILE_SIZE } from '@type/form';
import { getImageFormatError } from '@util/getImageFormatError';
import type { ChangeEvent } from 'react';

export interface FileChangeHandler {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
}

type useImageHandlerProps = {
  onChangeImage: (index: number, url: string) => void;
  onDeleteImage: (index: number) => void;
};

const useImageHandler = ({ onChangeImage, onDeleteImage }: useImageHandlerProps) => {
  const uploadFile = async (file: File) => {
    const extension = file.type.split('/')[1];
    const { url, fields } = await getPresignedUrl({
      contentType: extension ?? '',
    });
    await uploadImage(file, url, fields);
    const imageUrls = imageS3Bucket + fields.key;
    return imageUrls;
  };

  const handleChangeFile = (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const imageFormatErrorMessage = getImageFormatError(file);
    if (imageFormatErrorMessage) {
      alert(imageFormatErrorMessage);
      return;
    }

    try {
      const url = await uploadFile(file);
      onChangeImage(index, url);
    } catch {
      alert('이미지를 업로드하지 못했어요. 다시 시도해주세요.');
    }
  };

  const handleDeleteFile = (index: number) => () => {
    onDeleteImage(index);
  };

  const handleAddFiles =
    ({ imageUrls, onChange }: FileChangeHandler) =>
    async (e: ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(e.target.files ?? []);
      e.target.value = '';
      if (newFiles.length === 0) return;

      const imageFormatErrorMessage = newFiles.map(getImageFormatError).find(Boolean);
      if (imageFormatErrorMessage) {
        alert(imageFormatErrorMessage);
        return;
      }
      if (newFiles.some((file) => file.size > MAX_FILE_SIZE)) {
        alert('5MB 이하의 사진만 업로드할 수 있습니다.');
        return;
      }
      const filesCount = imageUrls.length + newFiles.length;
      if (filesCount > 6) {
        alert('이미지는 최대 6개까지 업로드 가능합니다.');
        return;
      }

      try {
        const urls = await Promise.all(newFiles.map(async (file) => await uploadFile(file)));
        onChange([...imageUrls, ...urls]);
      } catch {
        alert('이미지를 업로드하지 못했어요. 다시 시도해주세요.');
      }
    };

  return {
    handleChangeFile,
    handleDeleteFile,
    handleAddFiles,
  };
};

export default useImageHandler;
