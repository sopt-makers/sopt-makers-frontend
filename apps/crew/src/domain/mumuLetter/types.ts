// @TODO: 무무씨의 편지 API 명세 확정 후 OpenAPI schema 기반 응답 타입으로 교체
export interface MumuFeedCardData {
  meetingId: number;
  meetingTitle: string;
  meetingCategory: string;
  postId: number;
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
  title: string;
  content: string;
}

export interface MumuLetterSectionData {
  isEmptyAppliedMeeting: boolean;
  hasWrittenTodayMumuPost: boolean;
  mumuText: string;
  mumuPostHomeDtos: MumuFeedCardData[];
}
