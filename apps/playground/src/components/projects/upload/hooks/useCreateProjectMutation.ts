import { useMutation } from '@tanstack/react-query';

import { postProject } from '@/api/endpoint_LEGACY/projects';

const useCreateProjectMutation = () => {
  return useMutation({
    mutationFn: postProject,
    onError: (error: { message: string }) => alert(error.message),
  });
};

export default useCreateProjectMutation;
