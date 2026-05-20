import AuthRequired from '@/components/auth/AuthRequired';
import { setLayout } from '@/utils/layout';

const FeedMainPage = () => {
  return (
    <AuthRequired>
      <div>커뮤니티 페이지</div>
    </AuthRequired>
  );
};
setLayout(FeedMainPage, 'headerFooter');

export default FeedMainPage;
