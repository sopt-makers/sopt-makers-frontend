import { useCallback } from 'react';

import type { ResolutionRequestBody } from '@/api/endpoint/resolution/postResolution';
import { usePostResolutionMutation } from '@/api/endpoint/resolution/postResolution';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';

interface Options extends ResolutionRequestBody {
  onSuccess?: () => void;
}

export const useConfirmResolution = () => {
  const { mutateAsync, isPending } = usePostResolutionMutation();
  const { logSubmitEvent } = useEventLogger();

  const handleConfirmResolution = useCallback(
    async (options: Options) => {
      mutateAsync(options, {
        onSuccess: async () => {
          logSubmitEvent('makeTimeCapsule');
          options.onSuccess?.();
        },
      });
    },
    [mutateAsync, logSubmitEvent],
  );

  return { handleConfirmResolution, isPending };
};
