import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from '@toss/error-boundary';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { useGetCategory } from '@/api/endpoint/feed/getCategory';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { useCategoryParam, useSubcategoryParam } from '@/components/feed/common/queryParam';
import Hot from '@/components/feed/home';
import CategorySelect from '@/components/feed/list/CategorySelect';
import CategorySkeleton from '@/components/feed/list/CategorySkeleton';
import CrewFeedList from '@/components/feed/list/CrewFeedList';
import FeedListItems from '@/components/feed/list/FeedListItems';
import { layoutCSSVariable } from '@/components/layout/utils';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface FeedListProps {
  renderFeedDetailLink: (props: { children: ReactNode; feedId: string; category: string }) => ReactNode;
  onScrollChange?: (scrolling: boolean) => void;
}

const CREW_CATEGORY_ID = '24';

const FeedList = ({ renderFeedDetailLink, onScrollChange }: FeedListProps) => {
  const queryClient = useQueryClient();
  const [categoryCode] = useCategoryParam({ defaultValue: '' });
  const [subcategoryCode] = useSubcategoryParam();
  const { data: categoryData, isLoading } = useGetCategory();

  const categories = categoryData?.map((category) => ({
    code: category.code,
    name: category.name,
    hasAllCategory: true,
    tags: category.children.map((item) => ({
      code: item.code,
      name: item.name,
    })),
  }));

  const parentCategory = categories?.find((c) => c.code === categoryCode);
  const subCategory = subcategoryCode ?? parentCategory?.tags[0]?.code;

  const handleCategoryChange = (categoryCode: string) => {
    queryClient.invalidateQueries({
      queryKey: useGetPostsInfiniteQuery.getKey(categoryCode),
    });
    window.scrollTo({ top: 0 });
  };

  return (
    <Container>
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        categories && (
          <CategoryArea>
            <CategorySelect categories={categories} onCategoryChange={handleCategoryChange} />
          </CategoryArea>
        )
      )}

      <HeightSpacer>
        {!categoryCode ? (
          <Hot />
        ) : (
          <ErrorBoundary
            renderFallback={(error) => (
              <div css={{ textAlign: 'center' }}>
                게시글을 보여주는데 문제가 발생했어요.
                <br />({error.error.message})
              </div>
            )}
          >
            {categoryCode === CREW_CATEGORY_ID ? (
              <CrewFeedList categoryId={categoryCode} onScrollChange={onScrollChange} />
            ) : (
              <FeedListItems
                categoryCode={categoryCode}
                subCategory={subCategory}
                renderFeedDetailLink={renderFeedDetailLink}
                onScrollChange={onScrollChange}
              />
            )}
          </ErrorBoundary>
        )}
      </HeightSpacer>
      <LoggingClick eventKey='feedUploadButton'>
        <UploadLink href={playgroundLink.feedUpload()}>
          <UploadIcon src='/icons/icon-pencil-simple.svg' />
          <Text typography='SUIT_18_SB' color={colors.black}>
            글쓰기
          </Text>
        </UploadLink>
      </LoggingClick>
    </Container>
  );
};

export default FeedList;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const CategoryArea = styled.div`
  position: sticky;
  top: ${layoutCSSVariable.globalHeaderHeight};
  z-index: 2; /* Virtuoso가 sticky 위에 와버리는 문제때문에 z-index로 제어 */
  border-radius: 14px 14px 0 0;
  background-color: ${colors.background};
`;

const HeightSpacer = styled.div`
  min-height: 80vh;
`;

const UploadLink = styled(Link)`
  display: flex;
  position: sticky;
  bottom: 24px;
  gap: 4px;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Virtuoso가 sticky 위에 와버리는 문제때문에 z-index로 제어 */
  margin-right: 24px;
  margin-left: auto;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 15%);
  background-color: ${colors.gray10};
  width: 103px;
  height: 48px;
  @media ${MOBILE_MEDIA_QUERY} {
    bottom: 20px;
    margin-right: 16px;
  }
`;

const UploadIcon = styled.img`
  width: 24px;
  height: 24px;
`;
