import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import type { ReactNode } from 'react';

import Text from '@/components/common/Text';
import NonIcon from '@/public/icons/img/popup/member_search.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface EmptyMemberViewProps {
  emptyContents: ReactNode;
}

const EmptyMemberView = ({ emptyContents }: EmptyMemberViewProps) => {
  return (
    <StyledContainer>
      <StyledNonIcon />
      <StypedText typography='SUIT_16_SB' color={colors.gray400}>
        {emptyContents}
      </StypedText>
    </StyledContainer>
  );
};

export default EmptyMemberView;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
  }
`;

const StyledNonIcon = styled(NonIcon)`
  width: 60px;
  height: 68px;
`;

const StypedText = styled(Text)`
  text-align: center;
  white-space: pre-line;
  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_14_SB}
  }
`;
