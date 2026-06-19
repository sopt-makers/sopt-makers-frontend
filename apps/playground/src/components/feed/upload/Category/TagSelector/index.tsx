import styled from '@emotion/styled';

import { BottomSheet } from '@/components/common/BottomSheet';
import Responsive from '@/components/common/Responsive';
import { PROMOTION_CATEGORY_CODE } from '@/components/feed/constants';
import { DropDown } from '@/components/feed/upload/Category/DropDown';
import TagSelectOptions from '@/components/feed/upload/Category/TagSelector/TagSelectOptions';
import type { FeedDataType } from '@/components/feed/upload/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface TagSelectorProps {
  isOpen?: boolean;
  onClose: () => void;
  onSave: (categoryCode: string) => void;
  feedData: FeedDataType;
}
export default function TagSelector({ isOpen = false, onClose, onSave, feedData }: TagSelectorProps) {
  const isPromotion = feedData.categoryCode?.startsWith(PROMOTION_CATEGORY_CODE);
  return (
    <>
      <Responsive only='desktop'>
        <DropDown isOpen={isOpen} onClose={onClose} className={isPromotion ? '' : 'tag-drop'}>
          <TagSelectOptions feedData={feedData} onClose={onClose} onSave={onSave} />
        </DropDown>
      </Responsive>
      <Responsive only='mobile'>
        <BottomSheet isOpen={isOpen} onClose={onClose} header={<Title>어떤 주제인가요?</Title>}>
          <TagSelectOptions feedData={feedData} onClose={onClose} onSave={onSave} />
        </BottomSheet>
      </Responsive>
    </>
  );
}

const Title = styled.header`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 12px;
    align-items: center;

    ${textStyles.SUIT_20_B}

    padding: 0 20px 12px;
  }
`;
