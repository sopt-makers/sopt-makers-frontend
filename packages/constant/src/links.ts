export const MAKERS_TEAM_URL =
  'https://makers.sopt.org/?utm_source=playground&utm_medium=footer&utm_campaign=recruiting&utm_id=3rd_makers';
export const PRIVACY_POLICY_URL = 'https://sopt-makers.notion.site/d17c0071ab0e440baadd36c548bc36e4';

export const playgroundLink = {
  home: () => `/`,
  memberList: () => `/members`,
  teamLeaderList: () => `/members/team-leaders`,
  memberDetail: (id: string | number) => `/members/${id}`,
  memberUpload: () => `/members/upload`,
  memberEdit: () => '/members/edit',
  projectList: () => `/projects`,
  projectDetail: (id: string | number) => `/projects/${id}`,
  projectUpload: () => `/projects/upload`,
  projectEdit: (id: string | number) => `/projects/edit/${id}`,
  groupList: () => '/group',
  groupDetail: (id: string | number) => `/group/detail?id=${id}`,
  intro: () => `/intro`,
  login: () => `/accounts`,
  register: () => `/accounts/sign-up/auth`,
  resetLogin: () => `/auth/reset`,
  reconnectSocialAuth: () => `/auth/reconnect`,
  connectSocialAuth: () => `/auth/register`,
  makers: () => `/makers`,
  blog: () => `/blog`,
  blogSuccess: () => `/blog/success`,
  mentoringDetail: (id: number) => `/mentoring/${id}`,
  wordchain: () => `/wordchain`,
  feedList: () => `/feed`,
  feedDetail: (id: string | number) => `/feed/${id}`,
  feedUpload: () => `/feed/upload`,
  feedEdit: (id: string | number) => `/feed/edit/${id}`,
  remember: () => `/remember`,
  coffeechatUpload: () => `/coffeechat/upload`,
  coffeechatEdit: (id: string | number) => `/coffeechat/edit/${id}`,
  coffeechat: () => `/coffeechat`,
  coffeechatDetail: (id: string | number) => `/coffeechat/${id}`,
  mySoptReport: () => `/mySoptReport`,
  accounts: () => `/accounts`,
};

export const crewLink = {
  crewHome: () => `/group`,
  feedDetail: (id: string | number) => `/group/post?id=${id}`,
  groupDetail: (id: string | number) => `/group/detail?id=${id}`,
};
