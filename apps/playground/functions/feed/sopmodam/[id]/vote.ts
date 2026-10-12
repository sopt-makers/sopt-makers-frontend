// 정적 export의 동적 페이지로 직접 접근하거나 새로고침할 수 있도록 연결합니다.
export const onRequest: PagesFunction = async ({ next, params }) => {
  const id = params.id;

  // CI에서 functions 폴더만 배포하므로 외부 src 코드에 의존하지 않습니다.
  if (typeof id === 'string' && /^[1-9]\d*$/.test(id) && Number.isSafeInteger(Number(id))) {
    return next('/feed/sopmodam/[id]/vote');
  }

  return next();
};
