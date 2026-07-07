import type { MeetingDemandData } from '@domain/suggest/types';

export interface MeetingDemandAuthor {
  orgId: string;
  name: string;
  profileImageUrl?: string;
}

export interface MeetingDemandKeyword {
  label: string;
  hashed: boolean;
}

export interface OpenedMeetingData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  author: MeetingDemandAuthor;
  approvedCount: number;
  capacity: number;
  generation: string;
  parts: string[];
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

export interface MeetingDemandDetailData extends MeetingDemandData {
  author: MeetingDemandAuthor;
  createdAt: string;
  keywords: MeetingDemandKeyword[];
  viewCount: number;
  openedMeetings: OpenedMeetingData[];
}
