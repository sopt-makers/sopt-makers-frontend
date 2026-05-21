import { playgroundLink } from '@sopt/constant';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import Intro from '@/components/intro';

const IntroPage = () => {
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenAtom);

  useEffect(() => {
    if (!(router.isReady && accessToken === null)) {
      router.replace(playgroundLink.home());
    }
  }, [accessToken, router, router.isReady]);

  return (
    <>
      <Intro />
    </>
  );
};

export default IntroPage;
