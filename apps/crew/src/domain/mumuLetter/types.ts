export interface MumuFeedCardData {
  meetingTitle: string;
  meetingCategory: 'STUDY' | 'LECTURE' | 'FLASH' | 'EVENT' | 'SEMINAR';
  postId: number;
  likeCount: number;
  commentCount: number;
  title: string;
  content: string;
  isLiked?: boolean;
}
