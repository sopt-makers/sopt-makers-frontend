import type { CategoryType } from '@constant/option';

export interface MumuFeedCardData {
  meetingTitle: string;
  meetingCategory: CategoryType;
  postId: number;
  likeCount: number;
  commentCount: number;
  title: string;
  content: string;
  isLiked?: boolean;
}
