import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight } from '@sopt-mds/icons';
import { ActionButton, Tag } from '@sopt-mds/ui';
import Link from 'next/link';

import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import type { SopmodamBannerContent } from '@/components/sopmodam/banner/types';

type SopmodamBannerProps = { content: SopmodamBannerContent } & (
  | { variant: 'vote'; eventName: string }
  | { variant: 'answer'; question: string }
);

const SopmodamBanner = (props: SopmodamBannerProps) => {
  const { tag, description, button } = props.content;
  const { logClickEvent } = useEventLogger();

  return (
    <SContainer variant={props.variant}>
      <SHeader>
        <STitle>솝모담</STitle>
        <Tag size='small' shape='rect' variant='primary' type='subtle'>
          {tag}
        </Tag>
      </SHeader>
      <SContent>
        <STextGroup>
          {props.variant === 'vote' ? (
            <SHeadline>
              <SEventName>{props.eventName},</SEventName>
              <p>무엇이 가장 궁금한가요?</p>
            </SHeadline>
          ) : (
            <>
              <SQuestionLabel>이번 솝모담 질문</SQuestionLabel>
              <SHeadline>
                <p>{props.question}</p>
              </SHeadline>
            </>
          )}
          <SDescription>{description}</SDescription>
        </STextGroup>
        {button && (
          <LoggingClick eventKey='sopmodamCard'>
            <SButtonLink href={button.href}>
              <SActionButton
                size='medium'
                variant='primary'
                rightAddon={<IconChevronRight />}
                onClick={() => button.eventKey && logClickEvent(button.eventKey)}
              >
                {button.label}
              </SActionButton>
            </SButtonLink>
          </LoggingClick>
        )}
      </SContent>
    </SContainer>
  );
};

export default SopmodamBanner;

const SContainer = styled.div<{ variant: SopmodamBannerProps['variant'] }>`
  display: flex;
  flex-direction: column;
  gap: ${({ variant }) => (variant === 'vote' ? spacing.s12 : spacing.s20)};
  padding: 18px ${spacing.s20};
  width: 100%;
  background-color: ${colors.bg.neutral.ghost};
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
