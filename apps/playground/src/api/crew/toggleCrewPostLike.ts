import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { axiosCrewInstance } from '@/api';
import type { PostsType } from '@/api/endpoint/feed/getPosts';

const postCrewPostLike = async (orgId: number, postId: number) => {
  const response = await axiosCrewInstance.post('/internal/meeting/stats/likes', {
    orgId,
    postId,
  });
  return response.data;
};

interface ToggleCrewPostLikeParams {
  orgId: number;
  postId: number;
  allPostsQueryKey: (string | Params | undefined)[];
  postsQueryKey: (string | Params | undefined)[];
}

export const useToggleCrewPostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgId, postId }: ToggleCrewPostLikeParams) => postCrewPostLike(orgId, postId),
    onMutate: async ({ postId, allPostsQueryKey, postsQueryKey }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: allPostsQueryKey }),
        queryClient.cancelQueries({ queryKey: postsQueryKey }),
      ]);

      const previousAllPostsData = queryClient.getQueryData<{ pages: PostsType[] }>(allPostsQueryKey);
      const previousPostsData = queryClient.getQueryData<{ pages: PostsType[] }>(postsQueryKey);

      queryClient.setQueryData<{ pages: PostsType[] }>(allPostsQueryKey, (oldData) => {
        return produce(oldData, (draft) => {
          if (draft) {
            draft.pages.forEach((page) => {
              page.posts.forEach((post) => {
                if (post.id === postId) {
                  post.likes = post.isLiked ? post.likes - 1 : post.likes + 1;
                  post.isLiked = !post.isLiked;
                }
              });
            });
          }
        });
      });

      queryClient.setQueryData<{ pages: PostsType[] }>(postsQueryKey, (oldData) => {
        return produce(oldData, (draft) => {
          if (draft) {
            draft.pages.forEach((page) => {
              page.posts.forEach((post) => {
                if (post.id === postId) {
                  post.likes = post.isLiked ? post.likes - 1 : post.likes + 1;
                  post.isLiked = !post.isLiked;
                }
              });
            });
          }
        });
      });

      return { previousAllPostsData, previousPostsData };
    },
    onError: (_, { allPostsQueryKey, postsQueryKey }, context) => {
      if (allPostsQueryKey && context?.previousAllPostsData) {
        queryClient.setQueryData(allPostsQueryKey, context.previousAllPostsData);
      }
      if (postsQueryKey && context?.previousPostsData) {
        queryClient.setQueryData(postsQueryKey, context.previousPostsData);
      }
    },
  });
};
