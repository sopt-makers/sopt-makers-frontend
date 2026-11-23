import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/createEndpoint';
import type { WorkPreferenceType } from '@/components/matchmember/constant';

export const postWorkPreference = createEndpoint({
  request: (requestBody: WorkPreferenceType) => ({
    method: 'PATCH',
    url: `api/v1/members/work-preference`,
    json: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostWorkPreferenceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: WorkPreferenceType) => postWorkPreference.request(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getRecommendations'] });
      queryClient.invalidateQueries({ queryKey: ['getMemberOfMe'] });
    },
  });
};
