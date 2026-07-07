export interface OpenedMeetingAuthor {
  id: number;
  name: string;
  profileImageUrl?: string;
}

export interface OpenedMeetingData {
  id: number;
  imageUrl?: string;
  title: string;
  category: string;
  author: OpenedMeetingAuthor;
}

export interface MeetingDemandCommentAuthor {
  nickname: string;
  imageUrl?: string;
}

export interface MeetingDemandCommentData {
  id: number;
  author?: MeetingDemandCommentAuthor;
  isMine: boolean;
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
  isBlocked: boolean;
}

export interface MeetingDemandParentCommentData extends MeetingDemandCommentData {
  replies: MeetingDemandCommentData[];
}
