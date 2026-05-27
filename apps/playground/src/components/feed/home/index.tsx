import styled from '@emotion/styled';

import RecentArea from '@/components/feed/home/RecentArea';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import ReactionArea from './ReactionArea';

const Hot = () => {
  return (
    <StyledContainer>
      <RecentArea />
      <ReactionArea />
    </StyledContainer>
  );
};

export default Hot;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 120px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 28px;
  }
`;
