export interface MeetingDemandData {
  id: number;
  shortIntro: string;
  expectation: string;
  status: string;
  waitCount: number;
  isWaiting: boolean;
}

export interface MeetingDemandPaginationMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface MeetingDemandPageData {
  meetingDemands: MeetingDemandData[];
  meta: MeetingDemandPaginationMeta;
}
