export type HomeMeetingCardProps = {
  id: number;
  imageURL?: string;
  title: string;
  subTitle?: string;
  ownerName: string;
  ownerImage?: string;
  approvedCount: number;
  capacity: number;
  category: string;
  canJoinOnlyActiveGeneration: boolean;
  joinableParts: string[];
};
