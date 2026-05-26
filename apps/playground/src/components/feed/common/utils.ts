import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export const getRelativeTime = (date: string) => {
  return dayjs(date).fromNow();
};

interface Post {
  member: {
    activity: {
      generation: number;
      part: string;
      team: string | null;
    };
    careers: {
      companyName: string;
      title: string;
    } | null;
  };
  categoryCode?: string | null;
  categoryName: string;
}

const 특수임원List = [
  '메이커스 리드',
  '메이커스 팀장',
  '기획 파트장',
  '디자인 파트장',
  '웹 파트장',
  '서버 파트장',
  '안드로이드 파트장',
  'iOS 파트장',
  '운영 팀장',
  '미디어 팀장',
  '회장',
  '부회장',
  '총무',
] as const;

export function getMemberInfo(post: Post) {
  const is특수임원 = 특수임원List.some((keyword) => post.member.activity.part.includes(keyword));
  const isMakers = post.member.activity.team === '메이커스';

  return `${post.member.activity.generation}기 ${
    is특수임원 ? post.member.activity.part : isMakers ? '메이커스' : `${post.member.activity.part}파트`
  }`;
}
