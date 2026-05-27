type MemberCard = {
  id: number;
  name: string;
  screen?: 'recommended' | 'TL' | 'member';
};

export type UserProperties = {
  id: number;
  major: string | null;
  organization: string | null;
  job: string | null;
  part: string[];
  generation: number[];
  coffeeChatStatus: string;
  receivedCoffeeChatCount: number;
  sentCoffeeChatCount: number;
  uploadSopticleCount: number;
  uploadReviewCount: number;
};

type GotoCoffeechat = {
  organization: string;
  job: string;
  generation: number[];
  part: string[];
};

type Coffeechat = {
  career: string;
  organization: string;
  job: string;
  bio: string;
  section: string[];
  title: string;
  topic_tag: string[];
  topic_detail: string;
  meeting_type: string;
  guideline: string;
  generation: number[];
  part: string[];
};

type Vote = {
  category: string | undefined;
  feedId: string;
};

export interface ClickEvents {
  // ==== 인증 ====
  registerLink: undefined;
  registerWith: {
    method: 'facebook' | 'google' | 'apple';
  };

  // ==== 온보딩 배너 ====
  onboardingBannerProjectUpload: undefined;
  onboardingBannerProfileUpload: undefined;

  // ==== 네비게이션 ====
  // 헤더
  myProfile: undefined;
  reviewUpload: undefined;
  // 푸터
  aboutMakers: undefined;
  // 홈 - 미리보기
  homeSectionMore: {
    homeSection: 'member' | 'community' | 'project' | 'coffeechat';
  };

  // ==== 멤버 ====
  memberCard: MemberCard;
  // 멤버 리스트 - 필터
  filterGeneration: {
    generation: string;
  };
  filterPart: {
    part: string;
  };
  filterTeam: {
    team: string;
  };
  filterMbti: {
    mbti: string;
  };
  filterEmployed: {
    employed: string;
  };
  filterOrderBy: {
    orderBy: string;
  };
  // 멤버 상세
  TabProfile: {
    id: number;
    name: string;
  };
  profileSameGroupCard: {
    id: number;
    name: string;
  };
  memberRecommendCard: {
    id: number;
    name: string;
    recommendationType:
      | 'SAME_PART'
      | 'SAME_CREW'
      | 'SAME_MBTI'
      | 'SAME_PROJECT'
      | 'SAME_UNIVERSITY'
      | 'SAME_GENERATION';
    referral: 'memberTab' | 'profile' | 'home';
  };

  // 프로필 편집
  editProfile: undefined;

  // ==== 프로젝트 ====
  projectCard: { id: number };
  projectUpload: {
    referral: string;
  };
  clickProjectShare: undefined;

  // ==== 멘토링 ====
  mentoringCard: {
    mentorId: number;
  };
  mentorProfile: {
    mentorId: number;
  };
  mentorProfileCareer: {
    mentorId: number;
  };
  mentoringCarouselButton: undefined;
  mentoringApplicationButton: {
    mentorId: number;
  };
  mentorApplicationButton: undefined;

  // ==== 커뮤니티(피드) ====
  // 글 작성
  feedUploadButton: undefined;
  communityRulesClick: undefined;
  communityUploadCodeButton: undefined;
  quitUploadCommunity: undefined;
  // 리스트 / 카드
  feedListCategoryFilter: {
    category: string;
  };
  feedCard: {
    feedId: string;
    category: string;
    referral?: 'category_HOT';
  };
  feedShareButton: {
    feedId: string;
    referral: 'list' | 'more' | 'detail';
  };
  feedBackButton: {
    feedId: string;
    referral: 'more' | 'detail';
  };
  feedCategoryChipLink: {
    feedId: string;
  };
  feedLike: {
    feedId: string;
    category: string;
  };
  feedUnlike: {
    feedId: string;
    category: string;
  };
  // 투표
  vote: Vote;
  voteResult: Vote;

  // ==== 커피솝 ====
  coffeechatCard: {
    career: string | undefined;
    organization: string | undefined | null;
    job: string | undefined;
    section: string | undefined;
    title: string | undefined;
    topic_tag: string | undefined;
    generation: number[] | undefined;
    part: string[] | undefined;
    channel: string;
  };
  coffeechatFilter: {
    topic_tag: string | undefined;
    career: string | undefined;
    part: string | undefined;
  };
  coffeechatSection: {
    section: string;
  };
  coffeechatGuide: undefined;
  coffeechatBadge: undefined;
  coffeechatToggleOff: undefined;
  coffeechatToggleOn: undefined;
  coffeechatBanner: undefined;
  coffeechatReviewCard: undefined;
  gotoCoffeechat: GotoCoffeechat;
  openCoffeechat: undefined;
  sendCoffeechat: undefined;
  senderPhone: undefined;
  messageBadge:
    | {
        isRecommended?: boolean;
      }
    | undefined;

  // ==== 끝말잇기 ====
  wordchainEntry: undefined;

  // ==== 마이 솝트 리포트 ====
  clickMyReportNavbar: {
    myReportSection: string;
  };
  clickMyReportGotoProject: undefined;
  clickMyReportGotoWordchain: undefined;
  clickMyReportGotoMoimFeed: undefined;
  clickMyReportGotoCoffeesopt: undefined;
  bannerOpenMyReport: undefined;

  // ==== 활동후기 ====
  reviewGoToHomepage: undefined;

  // ==== 타임캡솝 ====
  bannerTimeCapsule: {
    isAlreadySubmitted: boolean;
  };
  profileUploadTimeCapsule: undefined;
  // 다른 기능 이동 모달
  timeCapsuleGotoCrew: undefined;
  timeCapsuleGotoProject: undefined;
  timeCapsuleGotoMember: undefined;
  timeCapsuleGotoCoffeechat: undefined;
  // 종무식
  bannerOpenResolution: undefined;
  luckyTimeCapsule: undefined;
  saveResolutionImage: undefined;

  // ==== 홈(광고) ====
  ads: {
    id: number | undefined;
    bannerId: number;
    pageUrl: string;
    timeStamp: string;
  };
  hideAdPopupToday: undefined;
  adPopupBody: undefined;
  adPopupClose: undefined;

  // ==== 에스크 ====
  CTAAsk: {
    id: number;
    name: string;
  };
  TabAsk: {
    id: number;
    name: string;
    hasRecentAsk: boolean;
  };
  AskUploadButton: undefined;
  AnswerUploadButton: undefined;
  AskLike: {
    feedId: number;
  };
  askContentCard: {
    id: number;
    name: string;
  };
  memberAskPreview: {
    id: number;
    name: string;
  };

  // ==== 기획경선 특집 ====
  balancegame: undefined;
  newmember: undefined;
  TL_list: undefined;
  TL_introduce: undefined;
  TL_appjam: undefined;
  refreshmember: undefined;
}

export interface SubmitEvents {
  // ==== 인증 ====
  verify: {
    by: 'phone' | 'email';
  };

  // ==== 멤버 ====
  searchMember: {
    content: string;
  };
  sendMessage: {
    category: string;
    receiverId: number;
    referral: 'mentoringDetail' | 'memberDetail' | 'memberList';
  };
  editProfile: undefined;

  // ==== 프로젝트 ====
  projectUpload: {
    writerId: string;
  };
  projectEdit: {
    projectId: string;
    editorId: string;
  };

  // ==== 커뮤니티(피드) ====
  submitCommunity: {
    category: string | undefined;
    isBlindWriter: boolean;
    vote: boolean;
    mention: boolean;
  };
  editCommunity: undefined;
  postComment: {
    feedId: string;
    referral: 'more' | 'detail';
    isBlindWriter: boolean;
    category: string;
    mention: boolean;
  };

  // ==== 커피솝 ====
  searchCoffeeChat: {
    search_content: string;
  };
  sendCoffeechat: {
    content: string | undefined;
    receiverId: string;
    senderId: string | undefined;
  };
  openCoffeechat: Coffeechat;
  coffeechatDelete: undefined;
  editCoffeechat: undefined;
  coffeechatReview: undefined;

  // ==== 끝말잇기 ====
  postWordchain: {
    word: string;
  };
  wordchainNewGame: undefined;

  // ==== 활동후기 ====
  reviewUpload: undefined;

  // ==== 타임캡솝 ====
  makeTimeCapsule: undefined;
  luckyTimeCapsule: {
    event_winner: boolean;
  };

  // ==== 에스크 ====
  submitAsk: {
    feedId: number;
  };
  submitAnswer: {
    feedId: number;
  };

  // ==== 기획경선 특집 ====
  balancegame: undefined;
}

export interface PageViewEvents {
  // ==== 멤버 ====
  memberPageList: undefined;
  memberCard: MemberCard;

  // ==== 멘토링 ====
  mentoringDetail: {
    mentorId: number;
  };

  // ==== 끝말잇기 ====
  wordchain: undefined;
}

export interface ImpressionEvents {
  // ==== 멤버 ====
  memberCard: MemberCard;

  // ==== 커뮤니티(피드) ====
  feedCard: {
    feedId?: string;
    category?: string;
    screen?: '멤버' | '기획경선 홈팝업' | 'TL리스트';
  };

  // ==== 홈(광고) ====
  ads: { bannerId: number; pageUrl: string; timeStamp: string };
  adPopup: undefined;

  // ==== 에스크 ====
  AskCard: {
    feedId: number;
  };
  askContentCard: {
    id: number;
    name: string;
  };

  // ==== 추천 카드 ====
  memberRecommendCard: {
    id: number;
    name: string;
    recommendationType:
      | 'SAME_PART'
      | 'SAME_CREW'
      | 'SAME_MBTI'
      | 'SAME_UNIVERSITY'
      | 'SAME_GENERATION'
      | 'SAME_PROJECT';
    screen: 'memberTab' | 'profile' | 'home';
  };

  // ==== 기획경선 특집 ====
  balancegame: undefined;
}
