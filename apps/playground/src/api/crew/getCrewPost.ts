import { useInfiniteQuery } from '@tanstack/react-query';

import { crewHttpClient } from '@/api';
import CrewQueryKey from '@/api/crew/CrewQueryKey';

type CrewPostsResponse = {
  pageMeta?: { hasNextPage: boolean; page: number };
};

const getCrewPost = async (orgId: number, page: number, take: number) => {
  return crewHttpClient.request<CrewPostsResponse>(`/internal/post/${orgId}`, {
    method: 'GET',
    searchParams: {
      page,
      take,
    },
  });
};

export const useGetCrewPostInfiniteQuery = (orgId: number) => {
  return useInfiniteQuery({
    queryKey: CrewQueryKey.post(orgId),
    queryFn: ({ pageParam }) => getCrewPost(orgId, pageParam, 30),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.pageMeta?.hasNextPage ? lastPage.pageMeta.page + 1 : undefined),
  });
};
