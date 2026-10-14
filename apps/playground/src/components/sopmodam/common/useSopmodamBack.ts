import { playgroundLink } from '@sopt/constant';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { NavigationContext } from '@/components/navigation/navigationContext';

export const useSopmodamBack = () => {
  const router = useRouter();
  const { getLastRouteState } = useContext(NavigationContext);

  return () => {
    const lastRoute = getLastRouteState();
    if (lastRoute?.type === 'move' && lastRoute.fromPath !== router.asPath) {
      router.back();
    } else {
      void router.replace(playgroundLink.feedList());
    }
  };
};
