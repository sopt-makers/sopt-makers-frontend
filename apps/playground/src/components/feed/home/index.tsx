import RecentArea from '@/components/feed/home/RecentArea';
import SopticleArea from '@/components/feed/home/SopticleArea';

import ReactionArea from './ReactionArea';

const Hot = () => {
  return (
    <>
      <RecentArea />
      <ReactionArea />
      <SopticleArea />
    </>
  );
};

export default Hot;
