import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const AnonymousProfileSchema = z
  .object({
    nickname: z.string(),
    profileImgUrl: z.string(),
  })
  .nullable();

const MemberSchema = z
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

const PostsSchema = z.object({
  id: z.number(),
  categoryGroup: z.string(),
  categoryCode: z.string(),
  title: z.string(),
  content: z.string(),
  hits: z.number(),
  images: z.array(z.string().nullish()),
  isBlindWriter: z.boolean(),
  isReported: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  sopticleUrl: z.string().nullable(),
  vote: VoteSchema,
});

const CategorySchema = z.object({
  categoryGroup: z.string(),
  code: z.string(),
  name: z.string(),
  parentCode: z.string().nullable(),
  parentCategoryName: z.string().nullable(),
});

export const PostSchema = z.object({
  anonymousProfile: AnonymousProfileSchema,
  member: MemberSchema,
  posts: PostsSchema,
  category: CategorySchema,
  isMine: z.boolean(),
  isLiked: z.boolean(),
  likes: z.number(),
});

export type PostType = z.infer<typeof PostSchema>;

export const getPost = createEndpoint({
  request: (postId: string) => ({
    method: 'GET',
    url: `api/v1/community/posts/${postId}`,
  }),
  serverResponseScheme: PostSchema,
});

export const useGetPostQuery = (postId: string | undefined) => {
  const id = postId ?? '';

  return useQuery({
    queryKey: getPost.cacheKey(id),
    queryFn: () => getPost.request(id),
    enabled: !!postId,
  });
};
