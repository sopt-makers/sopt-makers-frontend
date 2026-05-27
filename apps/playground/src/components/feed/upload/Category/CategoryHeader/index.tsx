import styled from '@emotion/styled';
import { Chip } from '@sopt-makers/ui';

import useCategory from '@/components/feed/common/hooks/useCategory';
import type { FeedDataType } from '@/components/feed/upload/types';
import Arrow from '@/public/icons/icon-select-arrow.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CategoryHeaderProp {
  feedData: FeedDataType;
  openCategory: () => void;
  openTag: () => void;
  isSelectorOpen: 'openCategory' | 'openTag' | 'closeAll';
}

export default function CategoryHeader({ feedData, openCategory, openTag, isSelectorOpen }: CategoryHeaderProp) {
  const { findParentCategory, findChildrenCategory } = useCategory();

  const parentCategory = findParentCategory(feedData.categoryCode);
  const childrenCategory = findChildrenCategory(feedData.categoryCode);

  return (
    <CategoryContainer>
      {!feedData.categoryCode ? (
        <StyledChip
          onClick={openCategory}
          RightIcon={() => <OpenArrow active={isSelectorOpen === 'openCategory'} />}
          active={isSelectorOpen === 'openCategory'}
        >
          어떤 게시판에 올릴까요?
        </StyledChip>
      ) : (
        <CategoryWrapper>
          <StyledChip
            type='button'
            onClick={openCategory}
            RightIcon={() => <OpenArrow active={isSelectorOpen === 'openCategory'} />}
            active
          >
            {parentCategory?.name}
          </StyledChip>
          {parentCategory?.children.length !== 0 && childrenCategory ? (
            <StyledChip
              type='button'
              onClick={openTag}
              RightIcon={() => <OpenArrow active={isSelectorOpen === 'openTag'} />}
              active
            >
              {childrenCategory.name}
            </StyledChip>
          ) : (
            <>
              {parentCategory?.children.length !== 0 && parentCategory && (
                <StyledChip
                  onClick={openTag}
                  RightIcon={() => <OpenArrow active={isSelectorOpen === 'openTag'} />}
                  active={isSelectorOpen === 'openTag'}
                >
                  어떤 주제인가요?
                </StyledChip>
              )}
            </>
          )}
        </CategoryWrapper>
      )}
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledChip = styled(Chip)`
  padding: 10px 20px;
  height: 42px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 9px 14px;
    height: 36px;
  }
`;

const OpenArrow = styled(Arrow)<{ active?: boolean }>`
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'none')};
  transition: transform 0.2s;
  width: 14px;
  height: 14px;
  will-change: transform;
`;
