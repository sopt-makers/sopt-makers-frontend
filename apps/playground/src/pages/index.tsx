import type { NextPage } from 'next';

import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import HomePopupContainer from '@/components/common/HomePopup/HomePopupContainer';
import Responsive from '@/components/common/Responsive';
import MenuEntryIcons from '@/components/feed/list/MenuEntryIcons/MenuEntryIcons';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  return (
    <AuthRequired>
      <HomePopupContainer />
      <ActiveBannerSlot />
      <Responsive only='mobile'>
        <MenuEntryIcons />
      </Responsive>
      <FeedHomePage />
    </AuthRequired>
  );
};

setLayout(Home, 'header');

export default Home;
