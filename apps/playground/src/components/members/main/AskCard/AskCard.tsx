import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconUser } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';

import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface AskCardProps {
  memberId: number;
  profileName: string;
  askContent: string;
  profileImageUrl?: string;
  onAnswerClick: () => void;
}

const AskCard = ({ memberId, profileName, askContent, profileImageUrl, onAnswerClick }: AskCardProps) => {
  return (
    <LoggingImpression eventKey='askContentCard' param={{ id: memberId, name: profileName }}>
      <StyledContainer>
        <StyledTopContainer>
          <StyledAskTitleContainer>
            {profileImageUrl ? (
              <StyledAskProfileImage src={profileImageUrl} alt={`${profileName}님의 프로필 이미지`} />
            ) : (
              <StyledIconUser />
            )}
            <StyledAskTitle>
              <StyledName>{profileName}</StyledName>님에게 온 에스크
            </StyledAskTitle>
          </StyledAskTitleContainer>
          <StyledAskContents>{askContent}</StyledAskContents>
        </StyledTopContainer>

        <ButtonContainer>
          <Button size='md' onClick={onAnswerClick} theme='black'>
            답변 보러가기
          </Button>
        </ButtonContainer>
      </StyledContainer>
    </LoggingImpression>
  );
};

export default AskCard;

const StyledContainer = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const StyledIconUser = styled(IconUser)`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${colors.gray700};
  color: ${colors.gray400};
  padding-top: 4px;
`;

const StyledAskTitle = styled.div`
  color: ${colors.gray100};
  ${fonts.BODY_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_R};
  }
`;

const StyledName = styled.span`
  color: ${colors.gray10};
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
  min-height: 44px;
`;

const ButtonContainer = styled.div`
  & button {
    width: 100%;

    @media ${MOBILE_MEDIA_QUERY} {
      ${fonts.LABEL_12_SB}
      height: 36px;
      padding: 9px 14px;
      border-radius: 8px;
    }
  }
`;
