import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronRight } from '@sopt-mds/icons';
import { Avatar, ReactionButton } from '@sopt-mds/ui';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import type { SopmodamAnswer } from '@/api/endpoint/sopmodam/getSopmodamAnswers';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const COLLAPSED_LINE_COUNT = 5;

interface SopmodamAnswerCardProps {
  answer: SopmodamAnswer;
}

const SopmodamAnswerCard = ({ answer }: SopmodamAnswerCardProps) => {
  const { content, writer } = answer;
  const router = useRouter();

  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(
    function detectContentTruncation() {
      const element = contentRef.current;
      if (!element || isExpanded) return;

      const updateIsTruncated = () => setIsTruncated(element.scrollHeight > element.clientHeight);
      updateIsTruncated();

      const observer = new ResizeObserver(updateIsTruncated);
      observer.observe(element);
      return () => observer.disconnect();
    },
    [isExpanded],
  );

  return (
    <SContainer>
      <SAuthor>
        <Avatar size={32} src={writer.profileImage ?? undefined} type='ghost' alt={`${writer.name} 프로필 이미지`} />
        <SInfo>
          <SName>{writer.name}</SName>
          <span>∙</span>
          <span>
            {writer.generation}기 {writer.part}
          </span>
        </SInfo>
      </SAuthor>
      <SBody>
        <SContentWrapper>
          <SContent ref={contentRef} isExpanded={isExpanded}>
            {content}
          </SContent>
          {isTruncated && (
            <SToggleButton type='button' aria-expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? '접기' : '더보기'}
            </SToggleButton>
          )}
        </SContentWrapper>
        <ReactionButton
          size='medium'
          rightAddon={<IconChevronRight />}
          onClick={() => router.push(`${playgroundLink.memberDetail(writer.memberId)}?tab=ask`)}
        >
          에스크로 더 물어보기
        </ReactionButton>
      </SBody>
    </SContainer>
  );
};

export default SopmodamAnswerCard;

const SContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s8};
  padding: ${spacing.s24} ${spacing.s0};
  border-bottom: 1px solid ${colors.stroke.neutral.ghost};
  background-color: ${colors.bg.layer.basement};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: ${spacing.s16} ${spacing.s0};
  }
`;

const SAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s12};
`;

const SInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s2};
  color: ${colors.fg.neutral.subtle};
  ${typography.body2}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.body3}
  }
`;

const SName = styled.span`
  color: ${colors.fg.neutral.bold};
  ${typography.label2}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.label3}
  }
`;

const SBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing.s16};

  @media ${MOBILE_MEDIA_QUERY} {
    align-items: center;
  }
`;

const SContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.s4};
  width: 100%;
`;

const SContent = styled.p<{ isExpanded: boolean }>`
  /* width: 100%; */
  white-space: pre-line;
  color: ${colors.fg.neutral.bold};
  ${typography.body1}

  ${({ isExpanded }) =>
    !isExpanded &&
    `
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${COLLAPSED_LINE_COUNT};
    overflow: hidden;
  `}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.body2}
  }
`;

const SToggleButton = styled.button`
  color: ${colors.fg.neutral.subtle};
  ${typography.body2}
`;
