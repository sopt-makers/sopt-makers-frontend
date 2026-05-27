import { playgroundLink } from '@sopt/constant';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import { useUploadFeed } from '@/api/endpoint/feed/postFeed';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import type { PostedFeedDataType } from '@/components/feed/upload/types';
import { setLayout } from '@/utils/layout';

const FeedUpload: FC = () => {
  const router = useRouter();
  const { logSubmitEvent } = useEventLogger();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useUploadFeed();

  const handlUploadSubmit = ({ data }: { data: PostedFeedDataType; id: number | null }) => {
    mutate(data, {
      onSuccess: async () => {
        const [parentCode] = (data.categoryCode ?? '').split('_');
        logSubmitEvent('submitCommunity', {
          category: data.categoryCode ?? undefined,
          isBlindWriter: data.isBlindWriter,
          vote: !!data.vote,
          /* eslint-disable-next-line no-useless-escape -- [ and ] must be escaped for literal match */
          mention: /@([^\[\]\s@]+)\[(\d+)\]/.test(data.content),
        });
        queryClient.invalidateQueries({
          queryKey: useGetPostsInfiniteQuery.getKey(parentCode),
        });
        queryClient.invalidateQueries({
          queryKey: getRecentPosts.cacheKey(),
        });
        await router.push(playgroundLink.feedList());
      },
    });
  };

  if (isPending) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  return (
    <AuthRequired>
      <FeedUploadPage
        defaultValue={{
          categoryCode: null,
          title: '',
          content: '',
          isBlindWriter: false,
          images: [],
          link: null,
          vote: null,
          mention: null,
        }}
        onSubmit={handlUploadSubmit}
      />
    </AuthRequired>
  );
};

setLayout(FeedUpload, 'empty');

export default FeedUpload;
