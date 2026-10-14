import type { SopmodamBannerData, SopmodamBannerResponse } from '@/components/sopmodam/banner/types';

export const toBannerData = (res: SopmodamBannerResponse): SopmodamBannerData => {
  switch (res.cardType) {
    case 'VOTE':
      return { cardType: 'VOTE', roundId: res.roundId, eventName: res.eventName, dDay: res.dDay ?? 0 };
    case 'ANSWER_PREPARING':
      return {
        cardType: 'ANSWER_PREPARING',
        selectedQuestion: res.selectedQuestion?.content ?? '',
        answerEndAt: res.answerEndAt,
      };
    case 'ANSWER_COLLECTING':
      return {
        cardType: 'ANSWER_COLLECTING',
        roundId: res.roundId,
        selectedQuestion: res.selectedQuestion?.content ?? '',
        dDay: res.dDay ?? 0,
      };
    case 'REVEALED':
      return {
        cardType: 'REVEALED',
        roundId: res.roundId,
        selectedQuestion: res.selectedQuestion?.content ?? '',
        answerCount: res.answerCount ?? 0,
      };
  }
};
