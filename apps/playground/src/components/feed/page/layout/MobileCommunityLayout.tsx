import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import type { ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import WordChainEntry from '@/components/wordchain/WordchainEntry/WordChainEntry';
import { zIndex } from '@/styles/zIndex';

interface MobileCommunityLayoutProps {
  isDetailOpen: boolean;
  listSlot: ReactNode;
  detailSlot: ReactNode;
}

const MobileCommunityLayout = ({ listSlot, detailSlot, isDetailOpen }: MobileCommunityLayoutProps) => {
  return (
    <Container>
      <WordChainWrapper>
        <StyledWordChainEntry />
      </WordChainWrapper>
      <ListSlotBox>{listSlot}</ListSlotBox>
      {isDetailOpen && (
        <Overlay>
          <RemoveScroll>
            <DetailSlot>{detailSlot}</DetailSlot>
          </RemoveScroll>
        </Overlay>
      )}
    </Container>
  );
};

export default MobileCommunityLayout;

const WordChainWrapper = styled.div`
  margin: 0 auto;
  padding: 12px 20px;
`;

const StyledWordChainEntry = styled(WordChainEntry)`
  max-width: none;
`;

const Container = styled.div`
  position: relative;
`;

const ListSlotBox = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${zIndex.헤더};
  overflow: hidden;
`;

const DetailSlot = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${colors.background};
  width: 100vw;
`;
