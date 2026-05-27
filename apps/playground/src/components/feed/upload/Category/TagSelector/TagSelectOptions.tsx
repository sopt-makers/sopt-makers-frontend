import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Fragment } from 'react';

import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
import useCategory from '@/components/feed/common/hooks/useCategory';
import type { BasicCategory } from '@/components/feed/upload/Category/types';
import type { FeedDataType } from '@/components/feed/upload/types';
import CheckIcon from '@/public/icons/icon_check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface TagSelectOptionsProp {
  onClose: () => void;
  onSave: (categoryCode: string) => void;
  feedData: FeedDataType;
}

export default function TagSelectOptions({ onClose, onSave, feedData }: TagSelectOptionsProp) {
  const { findParentCategory } = useCategory();
  const parentCategory = findParentCategory(feedData.categoryCode);

  const handleSelectTagDesktop = (code: string) => {
    onSave(`${parentCategory?.code}_${code}`);
    onClose();
  };

  const handleSelectTagMobile = (code: string) => {
    onSave(`${parentCategory?.code}_${code}`);
  };

  return (
    <>
      <Select>
        {parentCategory && parentCategory.children.length > 0 && (
          <>
            {parentCategory.children.map((tag: BasicCategory) => {
              return (
                <Fragment key={tag.code}>
                  <Responsive only='desktop'>
                    <Option onClick={() => handleSelectTagDesktop(tag.code)}>
                      {tag.name}
                      {`${parentCategory?.code}_${tag.code}` === feedData.categoryCode && <CheckIcon />}
                    </Option>
                  </Responsive>
                  <Responsive only='mobile'>
                    <Option key={tag.code} onClick={() => handleSelectTagMobile(tag.code)}>
                      {tag.name}
                      {`${parentCategory?.code}_${tag.code}` === feedData.categoryCode && <CheckIcon />}
                    </Option>
                  </Responsive>
                </Fragment>
              );
            })}
            {/* {parentCategory.hasAll && (
              <>
                <Responsive only='desktop'>
                  <Option onClick={() => handleSelectTagDesktop(parentCategory.id ?? 0)}>기타</Option>
                </Responsive>
                <Responsive only='mobile'>
                  <Option onClick={() => handleSelectTagMobile(parentCategory.id ?? 0)}>기타</Option>
                </Responsive>
              </>
            )} */}
          </>
        )}
      </Select>
      <SubmitButton onClick={() => onClose()}>
        <Responsive only='mobile'>
          <SquareLink variant='primary' size='medium'>
            확인
          </SquareLink>
        </Responsive>
      </SubmitButton>
    </>
  );
}

const Select = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;

const Option = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  cursor: pointer;
  padding: 12px;
  width: 100%;
  color: ${colors.gray10};

  &:active {
    background-color: ${colors.gray700};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${colors.gray700};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 8px;
  }
`;

const SubmitButton = styled.button`
  padding: 0 8px;
  width: 100%;
`;
