import { playgroundLink } from '@sopt/constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { editFeed } from '@/api/endpoint/feed/editFeed';
import { getPost, useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import useModalState from '@/components/common/Modal/useModalState';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import EditImpossibleModal from '@/components/feed/edit/EditImpossibleModal';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import type { EditFeedDataType, PostedFeedDataType } from '@/components/feed/upload/types';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const FeedEdit = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);
  const { data } = useGetPostQuery(query?.id);
  const editingId = data?.posts.id;
  const router = useRouter();
  const { logSubmitEvent } = useEventLogger();
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useModalState(true);

  const { mutate, isPending } = useMutation({
    mutationFn: (requestBody: EditFeedDataType) => editFeed.request(requestBody),
  });

  const handleEditSubmit = ({ data, id }: { data: PostedFeedDataType; id: number | null }) => {
    const { vote: _, ...editData } = data;
    mutate(
      { ...editData, postId: id },
      {
        onSuccess: async () => {
          logSubmitEvent('editCommunity');
          const [parentCode] = (data.categoryCode ?? '').split('_');

          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: useGetPostsInfiniteQuery.getKey(parentCode),
            }),
            queryClient.invalidateQueries({
              queryKey: getRecentPosts.cacheKey(),
            }),
            editingId
              ? queryClient.invalidateQueries({
                  queryKey: getPost.cacheKey(`${editingId}`),
                })
              : Promise.resolve(),
          ]);

          await router.push(playgroundLink.feedList());
        },
      },
    );
  };

  const voteForForm = useMemo(() => {
    if (!data) return null;

    const voteData = data.posts.vote;
    return voteData
      ? {
          isMultiple: voteData.isMultiple,
          voteOptions: voteData.options.map((o) => o.content),
        }
      : null;
  }, [data]);

  if (isPending) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  if (status === 'loading') return null;
  if (status === 'error') return null;

  if (status === 'success') {
    return (
      <>
        {data != null && (
          <AuthRequired>
            {data.isMine ? (
              <FeedUploadPage
                defaultValue={{
                  categoryCode: data.posts.categoryCode,
                  title: data.posts.title,
                  content: data.posts.content,
                  isBlindWriter: data.posts.isBlindWriter,
                  images: data.posts.images,
                  link: data.posts.sopticleUrl,
                  vote: voteForForm,
                  mention: null,
                }}
                onSubmit={handleEditSubmit}
                editingId={data.posts.id}
              />
            ) : (
              <EditImpossibleModal isOpen={isOpen} onClose={onClose} />
            )}
          </AuthRequired>
        )}
      </>
    );
  }

  return null;
};

setLayout(FeedEdit, 'empty');

export default FeedEdit;
