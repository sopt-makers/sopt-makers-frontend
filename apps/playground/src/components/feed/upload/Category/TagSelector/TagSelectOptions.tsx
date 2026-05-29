import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Fragment } from 'react';

import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
import useCategory from '@/components/feed/common/hooks/useCategory';
import { PROMOTION_CATEGORY_CODE } from '@/components/feed/constants';
import type { BasicCategory } from '@/components/feed/upload/Category/types';
import type { FeedDataType } from '@/components/feed/upload/types';
import CheckIcon from '@/public/icons/icon_check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface TagSelectOptionsProp {
  onClose: () => void;
  onSave: (categoryCode: string) => void;
  feedData: FeedDataType;
}

const PROMOTION_TAG_DESCRIPTION = {
  EVENT: '유익한 행사 소식을 공유해요.',
  PROJECT: '프로젝트와 관련된 설문조사와 팀빌딩을 진행하고, 릴리즈 소식도 공유해요.',
  RECRUIT: '기업의 모집 공고, 면접 꿀팁 등 취업과 관련된 정보를 공유해요.',
  ETC: '세부 카테고리 없이 기타 소식을 자유롭게 공유해요.',
} as const;

type PromotionTagType = keyof typeof PROMOTION_TAG_DESCRIPTION;

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
                    <Option>
                      <OptionMain onClick={() => handleSelectTagDesktop(tag.code)}>
                        {tag.name}
                        {`${parentCategory?.code}_${tag.code}` === feedData.categoryCode && <CheckIcon />}
                      </OptionMain>
                      <Description>
                        {parentCategory.code === PROMOTION_CATEGORY_CODE && (
                          <div>{PROMOTION_TAG_DESCRIPTION[tag.code as PromotionTagType]}</div>
                        )}
                      </Description>
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
  max-width: 410px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  gap: 2px;
`;

const OptionMain = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  cursor: pointer;
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

const Description = styled.div`
  ${fonts.BODY_13_R}
  color: ${colors.gray200}
`;

const SubmitButton = styled.button`
  padding: 0 8px;
  width: 100%;
`;
