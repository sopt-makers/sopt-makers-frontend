import AuthRequired from '@/components/auth/AuthRequired';
import CoffeeChatLottie from '@/components/coffeechat/Banner/CoffeeChatLottie';
import CoffeeChatCategory from '@/components/coffeechat/CoffeeChatCategory';
import CoffeeChatReviewList from '@/components/coffeechat/CoffeeChatReview';
import CoffeeChatRecentList from '@/components/coffeechat/CoffeeRecentChatList';
import HomePopupContainer from '@/components/common/HomePopup/HomePopupContainer';
import { setLayout } from '@/utils/layout';

const CoffeeChatMainPage = () => {
  return (
    <AuthRequired>
      {/* TODO: 타임캡솝 닫을 때 팝업 코드 제거 */}
      <HomePopupContainer />
      <CoffeeChatLottie />
      <CoffeeChatRecentList />
      <CoffeeChatReviewList />
      <CoffeeChatCategory />
    </AuthRequired>
  );
};
setLayout(CoffeeChatMainPage, 'headerFooter');

export default CoffeeChatMainPage;
