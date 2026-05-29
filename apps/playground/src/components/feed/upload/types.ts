export interface FeedDataType {
  categoryCode: string | null;
  groupId?: number;
  title: string;
  content: string;
  isBlindWriter: boolean;
  images: (string | null | undefined)[];
  vote: VoteData;
  mention: {
    userIds: number[];
    writerName?: string;
    webLink?: string;
  } | null;
}

export interface PostedFeedDataType extends FeedDataType {
  link: string | null;
}

export interface EditFeedDataType extends Omit<PostedFeedDataType, 'vote'> {
  postId: number | null;
}

type VoteData = {
  isMultiple: boolean;
  voteOptions: string[];
} | null;
