import AuthRequired from '@/components/auth/AuthRequired';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import { setLayout } from '@/utils/layout';

const FeedMainPage = () => {
  return (
    <AuthRequired>
      <FeedHomePage />
    </AuthRequired>
  );
};
setLayout(FeedMainPage, 'headerFooter');

export default FeedMainPage;
