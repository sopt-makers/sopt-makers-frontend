import { useInfiniteQuery } from '@tanstack/react-query';
import { QS } from '@toss/utils';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

import { recursiveCommentSchema } from './getComment';

interface Params {
  category?: string;
  filter?: string;
  limit?: number;
  cursor?: number | null;
}

const memberSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    profileImage: z.string().nullable(),
    activity: z.object({
      part: z.string(),
      generation: z.number(),
      team: z.string().nullable(),
    }),
    careers: z
      .object({
        companyName: z.string(),
        title: z.string(),
      })
      .nullable(),
  })
  .nullable();

const VoteSchema = z
  .object({
    id: z.number(),
    isMultiple: z.boolean(),
    hasVoted: z.boolean(),
    totalParticipants: z.number(),
    options: z.array(
      z.object({
        id: z.number(),
        content: z.string(),
        voteCount: z.number(),
        votePercent: z.number(),
        isSelected: z.boolean(),
      }),
    ),
  })
  .nullable();

const PostsSchema = z.array(
  z.object({
    id: z.number(),
    sourceType: z.string(),
    member: memberSchema,
    writerId: z.number().nullable(),
    isMine: z.boolean(),
    isLiked: z.boolean(),
    likes: z.number(),
    categoryGroup: z.string(),
    categoryCode: z.string(),
    categoryName: z.string(),
    tag: z.array(z.string()).nullish(),
    title: z.string(),
    content: z.string(),
    hits: z.number(),
    commentCount: z.number(),
    images: z.array(z.string().nullish()),
    isBlindWriter: z.boolean(),
    sopticleUrl: z.string().nullable(),
    anonymousProfile: z
      .object({
        nickname: z.string(),
        profileImgUrl: z.string(),
      })
      .nullable(),
    createdAt: z.string().nullable(),
    comments: z.array(recursiveCommentSchema),
    vote: VoteSchema,
    meetingId: z.number().nullable(),
  }),
);

const getPostsSchema = z.object({
  hasNext: z.boolean(),
  posts: PostsSchema,
});

export type PostsType = z.infer<typeof getPostsSchema>;

export const getPosts = createEndpoint({
  request: (params: Params = {}) => ({
    method: 'GET',
    url: `api/v1/community/posts${QS.create(params)}`,
  }),
  serverResponseScheme: getPostsSchema,
});

export const useGetPostsInfiniteQuery = ({ category, filter }: { category?: string; filter?: string } = {}) => {
  return useInfiniteQuery({
    queryKey: useGetPostsInfiniteQuery.getKey(category, filter),
    queryFn: async ({ pageParam }) => {
      return await getPosts.request({
        limit: 30,
        category,
        filter,
        ...(pageParam != null ? { cursor: pageParam } : {}),
      });
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.posts[lastPage.posts.length - 1].id : null;
    },
    enabled: !!category,
  });
};

useGetPostsInfiniteQuery.getKey = (category?: string, filter?: string) => [
  'INFINITE',
  ...getPosts.cacheKey({ limit: 0, cursor: 0, category, filter }),
];
