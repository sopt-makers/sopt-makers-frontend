import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { QS } from '@toss/utils';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export interface ProjectsRequestParams {
  limit?: number;
  cursor?: number;
  name?: string | null;
  isAvailable?: boolean | null;
  isFounding?: boolean | null;
  category?: string | null;
  generation?: number | null;
}

const linkSchema = z.object({
  linkId: z.number(),
  linkTitle: z.string(),
  linkUrl: z.string(),
});

const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  generation: z.number().nullable(),
  category: z.string(),
  serviceType: z.array(z.string()),
  isAvailable: z.boolean(),
  isFounding: z.boolean(),
  summary: z.string(),
  detail: z.string(),
  logoImage: z.string(),
  thumbnailImage: z.string(),
  links: z.array(linkSchema),
});

const getProjectsEndpoint = createEndpoint({
  request: (params: ProjectsRequestParams) => ({
    method: 'GET',
    url: `api/v1/projects${QS.create(params)}`,
  }),
  serverResponseScheme: z.object({
    projectList: z.array(projectSchema),
    hasNext: z.boolean(),
    totalCount: z.number(),
  }),
});

export const projectsQueryKey = {
  all: ['getProjectsQuery'] as const,
  list: (params: ProjectsRequestParams = {}) => [...projectsQueryKey.all, params] as const,
};

export const useGetProjectsQuery = (params: ProjectsRequestParams = {}) => {
  return useInfiniteQuery({
    queryKey: projectsQueryKey.list(params),
    queryFn: ({ pageParam = 0 }) => getProjectsEndpoint.request({ ...params, cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) {
        return undefined;
      }
      return lastPage.projectList[lastPage.projectList.length - 1].id;
    },
    placeholderData: keepPreviousData,
  });
};

export type Project = z.infer<typeof projectSchema>;
