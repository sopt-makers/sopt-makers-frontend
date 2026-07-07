export interface MeetingDemandAuthor {
  orgId: string;
  name: string;
  profileImageUrl?: string;
}

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

export interface MeetingDemandCommentData {
  id: number;
  author: MeetingDemandAuthor;
  isAuthor: boolean;
  createdAt: string;
  content: string;
  likeCount: number;
  isLiked: boolean;
}
