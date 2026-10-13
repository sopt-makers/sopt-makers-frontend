import { playgroundLink } from '@sopt/constant';

import type { SoptmodamBannerContent, SoptmodamBannerDataOf, SoptmodamCardType } from '@/components/soptmodam/types';
import { dateIntoMonthDay } from '@/utils/parseDate';

const formatDDay = (dDay: number) => (dDay === 0 ? '오늘 마감' : `D-${dDay}`);

const BANNER_CONTENT: { [T in SoptmodamCardType]: (_data: SoptmodamBannerDataOf<T>) => SoptmodamBannerContent } = {
  VOTE: ({ roundId, dDay }) => ({
    tag: `질문 투표 · ${formatDDay(dDay)}`,
    description: '먼저 경험한 OB들이 답해드려요.',
    button: { label: '궁금한 질문에 투표하기', href: playgroundLink.soptmodamVote(roundId) },
  }),
  ANSWER_PREPARING: ({ answerEndAt }) => ({
    tag: '답변 준비 중',
    description: `OB들의 경험을 차곡차곡 담고 있어요.\n${dateIntoMonthDay(answerEndAt)}에 모아 보여드릴게요.`,
  }),
  ANSWER_COLLECTING: ({ roundId, dDay }) => ({
    tag: `답변 모집 중 · ${formatDDay(dDay)}`,
    description: '먼저 경험한 OB라면, 나의 이야기를 담아 주세요.',
    button: { label: '내 경험 담기', href: playgroundLink.soptmodamUpload(roundId) },
  }),
  REVEALED: ({ roundId, answerCount }) => ({
    tag: `답변 공개 · ${answerCount}명 참여`,
    description: '먼저 경험한 OB들의 다양한 이야기를 확인해보세요.',
    button: { label: '솝모담 열어보기', href: playgroundLink.soptmodam(roundId) },
  }),
};

export const getBannerContent = <T extends SoptmodamCardType>(data: SoptmodamBannerDataOf<T>) =>
  BANNER_CONTENT[data.cardType](data);
