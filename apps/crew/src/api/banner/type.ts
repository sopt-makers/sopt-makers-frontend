export interface BannerImage {
  pc_url: string;
  mobile_url: string;
  start_date: string;
  end_date: string;
  link: string | null;
}

export interface GetBannersResponse {
  success: boolean;
  message: string;
  data: BannerImage[];
}
