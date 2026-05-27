import type { FC } from 'react';

import { useGetCommentQuery } from '@/api/endpoint/feed/getComment';
import { getPost, useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import FeedLike from '@/components/feed/common/FeedLike';
import { useToggleLike } from '@/components/feed/common/hooks/useToggleLike';
import { getMemberInfo } from '@/components/feed/common/utils';
import DetailFeedCard from '@/components/feed/detail/DetailFeedCard';

import { ALL_CATEGORY_CODE, SOPTICLE_CATEGORY_CODE } from '../constants';

interface FeedDetailContentProps {
  postId: string;
}

const FeedDetailContent: FC<FeedDetailContentProps> = ({ postId }) => {
  const { data: commentData } = useGetCommentQuery(postId);
  const { data: postData } = useGetPostQuery(postId);
  const { handleToggleLike } = useToggleLike();

  if (postData == null) {
    return null;
  }

  const commentLength =
    (commentData?.filter((comment) => !comment.isDeleted).length ?? 0) +
    (commentData?.flatMap((comment) => comment.replies).filter((reply) => !reply.isDeleted).length ?? 0);

  const categoryCode = postData.posts.categoryCode;
  const isSopticle = categoryCode.startsWith(SOPTICLE_CATEGORY_CODE);

  const [parentCategoryCode, subCategoryCode] = categoryCode.split('_');

  return (
    <DetailFeedCard.Main>
      {postData.posts.isBlindWriter ? (
        <DetailFeedCard.Top
          isBlindWriter={postData.posts.isBlindWriter}
          anonymousProfile={postData.anonymousProfile}
          createdAt={postData.posts.createdAt}
          memberId={null}
        />
      ) : postData.member ? (
        <DetailFeedCard.Top
          isBlindWriter={postData.posts.isBlindWriter}
          name={postData.member.name}
          profileImage={postData.member.profileImage}
          info={getMemberInfo({
            categoryCode,
            categoryName: postData.category.name,
            member: postData.member,
          })}
          createdAt={postData.posts.createdAt}
          memberId={postData.member.id}
        />
      ) : null}
      <DetailFeedCard.Content
        title={postData.posts.title}
        hits={postData.posts.hits}
        commentLength={commentLength}
        content={postData.posts.content}
        images={postData.posts.images.filter((img): img is string => img != null)}
        isSopticle={isSopticle}
        sopticleUrl={postData.posts.sopticleUrl ?? ''}
        thumbnailUrl={postData.posts.images[0] ?? ''}
        isMine={postData.isMine}
        vote={postData.posts.vote}
        postId={postData.posts.id}
        categoryCode={categoryCode}
        like={
          <LoggingClick
            eventKey={postData.isLiked ? 'feedUnlike' : 'feedLike'}
            param={{ feedId: postId, category: postData.category.name }}
          >
            <FeedLike
              isLiked={postData.isLiked}
              likes={postData.likes}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                handleToggleLike({
                  postId: Number(postId),
                  isLiked: postData.isLiked,
                  likes: postData.likes,
                  allPostsQueryKey: useGetPostsInfiniteQuery.getKey(parentCategoryCode, ALL_CATEGORY_CODE),
                  postsQueryKey: useGetPostsInfiniteQuery.getKey(parentCategoryCode, subCategoryCode),
                  postQueryKey: getPost.cacheKey(postId),
                  recentPostsQuerykey: getRecentPosts.cacheKey(),
                });
              }}
            />
          </LoggingClick>
        }
      />
    </DetailFeedCard.Main>
  );
};

export default FeedDetailContent;
