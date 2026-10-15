import { parseRoundId } from '../../../_shared/parseRoundId';

// 정적 export의 동적 페이지로 직접 접근하거나 새로고침할 수 있도록 연결합니다.
export const onRequest: PagesFunction = ({ next, params }) => {
  const id = parseRoundId(params.id);

  if (id !== null) {
    return next('/feed/sopmodam/[id]');
  }

  return next();
};
