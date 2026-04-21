import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronRight, IconUser } from '@sopt-makers/icons';

import type { MemberGenerationPart } from '@/api/endpoint/members/getMemberGenerationPart';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type SameActivityMemberCardProps = Omit<MemberGenerationPart, 'id'>;

const SameActivityMemberCard = ({ profileImage, name, generation, part }: SameActivityMemberCardProps) => {
  return (
    <StyledContainer>
      {profileImage ? <StyledAvatar src={profileImage} alt={`${name}님의 프로필 이미지`} /> : <StyledDefaultAvatar />}
      <StyledInfoWrapper>
        <StyledName>{name}</StyledName>
        <StyledMeta>
          {generation}기 {part}
        </StyledMeta>
      </StyledInfoWrapper>
      <StyledChevronRight />
    </StyledContainer>
  );
};

export default SameActivityMemberCard;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 6px 12px 12px;
  border-radius: 10px;
  background-color: ${colors.gray900};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 8px 6px 8px 12px;
  }
`;

const StyledAvatar = styled.img`
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
`;

const StyledDefaultAvatar = styled(IconUser)`
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${colors.gray700};
  color: ${colors.gray400};
  padding-top: 6px;
`;

const StyledInfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledName = styled.span`
  color: ${colors.gray10};
  ${fonts.TITLE_16_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_14_SB}
  }
`;

const StyledMeta = styled.span`
  color: ${colors.gray200};
  ${fonts.TITLE_14_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_12_SB}
  }
`;

const StyledChevronRight = styled(IconChevronRight)`
  width: 20px;
  height: 20px;
  color: ${colors.gray300};
`;
