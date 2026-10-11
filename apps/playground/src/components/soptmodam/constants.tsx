import { playgroundLink } from '@sopt/constant';
import type { ReactNode } from 'react';

import type { SoptmodamBannerResponse, SoptmodamCardType } from '@/components/soptmodam/mock';
import { dateIntoMonthDay } from '@/utils/parseDate';

interface BannerContent {
  tag: string;
  description: ReactNode;
  button?: { label: string; href: string };
}

export const BANNER_CONTENT: Record<SoptmodamCardType, (_data: SoptmodamBannerResponse) => BannerContent> = {
  VOTE: ({ roundId, dDay }) => ({
    tag: `질문 투표 · D-${dDay}`,
    description: '먼저 경험한 OB들이 답해드려요.',
    button: { label: '궁금한 질문에 투표하기', href: playgroundLink.soptmodamVote(roundId) },
  }),
  ANSWER_PREPARING: ({ answerEndAt }) => ({
    tag: '답변 준비 중',
    description: (
      <>
        <p>OB들의 경험을 차곡차곡 담고 있어요.</p>
        <p>{dateIntoMonthDay(answerEndAt)}에 모아 보여드릴게요.</p>
      </>
    ),
  }),
  ANSWER_COLLECTING: ({ roundId, dDay }) => ({
    tag: `경험담 모집 중 · D-${dDay}`,
    description: '먼저 경험한 OB라면, 나의 이야기를 담아 주세요.',
    button: { label: '내 경험 담기', href: playgroundLink.soptmodamUpload(roundId) },
  }),
  REVEALED: ({ roundId, answerCount }) => ({
    tag: `답변 공개 · ${answerCount ?? 0}명 참여`,
    description: '먼저 경험한 OB들의 다양한 이야기를 확인해보세요.',
    button: { label: '솝모담 열어보기', href: playgroundLink.soptmodam(roundId) },
  }),
};
