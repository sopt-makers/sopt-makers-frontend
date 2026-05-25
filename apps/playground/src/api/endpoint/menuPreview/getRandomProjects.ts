import { useQuery } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const randomProjectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  generation: z.number().nullable(),
  category: z.string(),
  serviceType: z.array(z.string()),
  startAt: z.string().date().nullable(),
  endAt: z.string().date().nullable(),
  isAvailable: z.boolean(),
  isFounding: z.boolean(),
  logoImage: z.string(),
  thumbnailImage: z.string(),
});

const getRandomProjectsEndpoint = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/projects/random',
  }),
  serverResponseScheme: z.array(randomProjectsSchema),
});

export const useGetRandomProjects = () => {
  return useQuery({
    queryKey: getRandomProjectsEndpoint.cacheKey(),
    queryFn: () => getRandomProjectsEndpoint.request(),
    staleTime: Infinity,
  });
};

export type RandomProject = z.infer<typeof randomProjectsSchema>;
