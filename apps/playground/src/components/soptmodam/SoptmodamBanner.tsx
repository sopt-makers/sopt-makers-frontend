import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight } from '@sopt-mds/icons';
import { ActionButton, Tag } from '@sopt-mds/ui';
import Link from 'next/link';

import { BANNER_CONTENT } from '@/components/soptmodam/constants';
import { SOPTMODAM_BANNER_MOCK } from '@/components/soptmodam/mock';

const SoptmodamBanner = () => {
  // TODO: API 연동 시 교체
  const data = SOPTMODAM_BANNER_MOCK;
  const { cardType, canVote, eventName, selectedQuestion } = data;

  if (cardType === 'VOTE' && !canVote) return null;

  const isVote = cardType === 'VOTE';
  const { tag, description, button } = BANNER_CONTENT[cardType](data);

  return (
    <SContainer isVote={isVote}>
      <SHeader>
        <STitle>솝모담</STitle>
        <Tag size='small' shape='rect' variant='primary' type='subtle'>
          {tag}
        </Tag>
      </SHeader>
      <SContent>
        <STextGroup>
          {!isVote && <SQuestionLabel>이번 솝모담 질문</SQuestionLabel>}
          <SHeadline>
            {isVote && <SEventName>{eventName},</SEventName>}
            <p>{isVote ? '무엇이 가장 궁금한가요?' : selectedQuestion}</p>
          </SHeadline>
          <SDescription>{description}</SDescription>
        </STextGroup>
        {button && (
          <SButtonLink href={button.href}>
            <SActionButton size='medium' variant='primary' rightAddon={<IconChevronRight />}>
              {button.label}
            </SActionButton>
          </SButtonLink>
        )}
      </SContent>
    </SContainer>
  );
};

export default SoptmodamBanner;

const SContainer = styled.div<{ isVote: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ isVote }) => (isVote ? spacing.s12 : spacing.s20)};
  padding: 18px ${spacing.s20};
  width: 100%;
  background-color: ${colors.base.gray800};
  border-radius: ${radius.r14};
`;

const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const STitle = styled.p`
  color: ${colors.fg.neutral.bold};
  ${typography.title5}
`;

const SContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s20};
  width: 100%;
`;

const STextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
`;

const SQuestionLabel = styled.p`
  color: ${colors.fg.brand.default};
  ${typography.label3}
`;

const SHeadline = styled.div`
  color: ${colors.fg.neutral.bold};
  ${typography.title3}
`;

const SEventName = styled.p`
  color: ${colors.fg.brand.default};
`;

const SDescription = styled.p`
  white-space: pre-line;
  color: ${colors.fg.neutral.default};
  ${typography.body2}
`;

const SButtonLink = styled(Link)`
  width: 100%;
`;

const SActionButton = styled(ActionButton)`
  width: 100%;
`;
