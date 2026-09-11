export const COFFECHAT_SAMPLE_DATA = {
  coffeeChatList: [
    {
      memberId: 6,
      bio: '놀기 상담',
      topicTypeList: ['직무 전문성', '커리어'],
      profileImage: null,
      name: '이솝트',
      career: '아직 없어요',
      organization: '서울대학교',
      companyJob: null,
      soptActivities: ['35기 기획'],
    },
    {
      memberId: 4,
      bio: '솝트 활동 상담',
      topicTypeList: ['이력서/자소서'],
      profileImage:
        'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//dev/image/project/2e41c0b4-abe5-4aaa-be5d-39b5a5d51a63-스크린샷 2022-11-02 오후 9.16.25.png',
      name: '이정민',
      career: '미들 (4-8년)',
      organization: '우아한형제들',
      companyJob: '프론트엔드 개발',
      soptActivities: [
        '27기 디자인',
        '30기 미디어 팀장',
        '30기 미디어 팀장',
        '27기 기획',
        '30기 미디어 팀장',
        '30기 미디어 팀장',
      ],
    },
    {
      memberId: 3,
      bio: '디자인 커리어 상담',
      topicTypeList: ['포트폴리오'],
      profileImage: null,
      name: '김솝트',
      career: '미들 (4-8년)',
      organization: 'Google Korea',
      companyJob: '디자인',
      soptActivities: ['28기 기획'],
    },
    {
      memberId: 3,
      bio: '디자인 커리어 상담',
      topicTypeList: ['포트폴리오'],
      profileImage: null,
      name: '김솝트',
      career: '미들 (4-8년)',
      organization: '네이버',
      companyJob: '백엔드 개발',
      soptActivities: ['35기 기획', '28기 기획'],
    },
    {
      memberId: 2,
      bio: '기획 커리어 상담',
      topicTypeList: ['커리어'],
      profileImage: null,
      name: '박솝트',
      career: '시니어 (9년 이상)',
      organization: '국민대학교',

      companyJob: null,
      soptActivities: ['29기 기획', '29기 기획'],
    },
    {
      memberId: 1,
      bio: '백엔드 커리어 상담',
      topicTypeList: ['창업'],
      profileImage:
        'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//dev/image/project/d06f0b1d-0f1f-4d2f-8d4a-1145074c3acd-Screenshot 2023-03-05 at 4.30.18 PM.png',
      name: '송정우',
      career: '주니어 (0-3년)',
      organization: '솝트대학교',
      companyJob: null,
      soptActivities: [
        '28기 서버 파트장',
        '27기 서버',
        '29기 안드로이드',
        '30기 안드로이드 파트장\n\n',
        '28기 서버 파트장',
      ],
    },
  ],
};
export interface CoffeeChatFilterOption {
  value: string;
  label: string;
  apiValue: string;
  mobileLabel?: string;
}

export const SECTION_FILTER_OPTIONS: (CoffeeChatFilterOption & { icon: string })[] = [
  {
    value: '',
    label: '전체',
    apiValue: '',
    icon: '/icons/logo/coffeechatCategory/ic_default.svg',
  },
  {
    value: 'SOPT 활동',
    label: 'SOPT 활동',
    apiValue: 'SOPT 활동',
    icon: '/icons/logo/coffeechatCategory/ic_sopt.svg',
  },
  {
    value: '기획',
    label: '기획',
    apiValue: '기획',
    icon: '/icons/logo/coffeechatCategory/ic_plan.svg',
  },
  {
    value: '디자인',
    label: '디자인',
    apiValue: '디자인',
    icon: '/icons/logo/coffeechatCategory/ic_design.svg',
  },
  {
    value: '프론트엔드',
    label: '프론트엔드',
    mobileLabel: '프론트',
    apiValue: '프론트',
    icon: '/icons/logo/coffeechatCategory/ic_frontend.svg',
  },
  {
    value: '백엔드',
    label: '백엔드',
    apiValue: '백엔드',
    icon: '/icons/logo/coffeechatCategory/ic_backend.svg',
  },
  {
    value: '앱 개발',
    label: '앱 개발',
    apiValue: '앱 개발',
    icon: '/icons/logo/coffeechatCategory/ic_app.svg',
  },
  {
    value: '기타',
    label: '기타',
    apiValue: '기타',
    icon: '/icons/logo/coffeechatCategory/ic_etc.svg',
  },
];

export const TOPIC_FILTER_OPTIONS: CoffeeChatFilterOption[] = [
  { value: '', label: '전체', apiValue: '' },
  { value: '창업', label: '창업', apiValue: '창업' },
  { value: '네트워킹', label: '네트워킹', apiValue: '네트워킹' },
  { value: '커리어', label: '커리어', apiValue: '커리어' },
  { value: '포트폴리오', label: '포트폴리오', apiValue: '포트폴리오' },
  { value: '이력서/자소서', label: '이력서/자소서', apiValue: '이력서/자소서' },
  { value: '면접', label: '면접', apiValue: '면접' },
  { value: '직무 전문성', label: '직무 전문성', apiValue: '직무 전문성' },
  { value: '프로젝트', label: '프로젝트', apiValue: '프로젝트' },
  { value: '자기계발', label: '자기계발', apiValue: '자기계발' },
  { value: '기타', label: '기타', apiValue: '기타' },
];

export const CAREER_FILTER_OPTIONS: CoffeeChatFilterOption[] = [
  { value: '', label: '전체', apiValue: '' },
  { value: '아직 없음', label: '아직 없음', apiValue: '아직 없어요' },
  { value: '인턴', label: '인턴', apiValue: '인턴 경험만 있어요' },
  { value: '주니어 (0-3년)', label: '주니어 (0-3년)', apiValue: '주니어 (0-3년)' },
  { value: '미들 (4-8년)', label: '미들 (4-8년)', apiValue: '미들 (4-8년)' },
  { value: '시니어 (9년 이상)', label: '시니어 (9년 이상)', apiValue: '시니어 (9년 이상)' },
  { value: '창업 중', label: '창업 중', apiValue: '창업 중' },
];

export const PART_FILTER_OPTIONS: CoffeeChatFilterOption[] = [
  { value: '', label: '전체', apiValue: '' },
  { value: '기획', label: '기획', apiValue: '기획' },
  { value: '디자인', label: '디자인', apiValue: '디자인' },
  { value: '안드로이드', label: '안드로이드', apiValue: '안드로이드' },
  { value: 'iOS', label: 'iOS', apiValue: 'iOS' },
  { value: '웹', label: '웹', apiValue: '웹' },
  { value: '서버', label: '서버', apiValue: '서버' },
];

export const COFFEE_CHAT_FILTER_OPTIONS = {
  section: SECTION_FILTER_OPTIONS,
  topicType: TOPIC_FILTER_OPTIONS,
  career: CAREER_FILTER_OPTIONS,
  part: PART_FILTER_OPTIONS,
};
