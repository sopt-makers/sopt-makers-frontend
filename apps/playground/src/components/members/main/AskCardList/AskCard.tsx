import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';

import Responsive from '@/components/common/Responsive';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface AskCardProps {
  fromName: string;
  askContents: string;
  imgSrc: string;
  handleClick: () => void;
}

const AskCard = ({ fromName, askContents, imgSrc, handleClick }: AskCardProps) => {
  return (
    <StyledContainer>
      <StyledTopContainer>
        <StyledAskTitleContainer>
          <StyledAskProfileImage src={imgSrc} alt={`${fromName}님의 프로필 이미지`} />
          <StyledAskTitle>
            <StyledName>{fromName}</StyledName>님에게 온 에스크
          </StyledAskTitle>
        </StyledAskTitleContainer>
        <StyledAskContents>{askContents}</StyledAskContents>
      </StyledTopContainer>

      <Responsive only='desktop'>
        <Button size='md' onClick={handleClick} theme='black' style={{ width: '100%' }}>
          답변 보러가기
        </Button>
      </Responsive>

      <Responsive only='mobile'>
        <Button size='sm' onClick={handleClick} theme='black' style={{ width: '100%' }}>
          답변 보러가기
        </Button>
      </Responsive>
    </StyledContainer>
  );
};

export default AskCard;

const StyledContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${colors.gray900};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
    gap: 10px;
    border-radius: 8px;
  }
`;

const StyledTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledAskTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledAskProfileImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const StyledAskTitle = styled.div`
  color: ${colors.gray100};
  ${fonts.BODY_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_R};
  }
`;

const StyledName = styled.span`
  color: ${colors.white};
  ${fonts.TITLE_16_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_14_SB};
  }
`;

const StyledAskContents = styled.div`
  ${fonts.BODY_14_R};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
