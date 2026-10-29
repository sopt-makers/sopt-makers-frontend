import { getPresignedUrl, uploadImage } from '@api/image';
import { imageS3Bucket } from '@constant/url';
import { useMutation } from '@tanstack/react-query';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const { url, fields } = await getPresignedUrl({ contentType: file.type.split('/')[1] ?? '' });
      await uploadImage(file, url, fields);
      return imageS3Bucket + fields.key;
    },
  });
};
