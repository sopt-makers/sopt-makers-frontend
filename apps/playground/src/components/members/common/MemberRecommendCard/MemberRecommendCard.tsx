import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconUser } from '@sopt-makers/icons';

import type { RecommendMemberById } from '@/api/endpoint/members/getMemberRecommendById';
import type { RecommendMemberOfMe } from '@/api/endpoint/members/getMemberRecommendOfMe';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import RecommendTypeChip from './RecommendTypeChip';

// 두 API의 recommendType enum 값이 달라 유니온으로 수용
interface Props {
  member: Pick<
    RecommendMemberOfMe | RecommendMemberById,
    'profileImage' | 'name' | 'generation' | 'part' | 'recommendType'
  >;
}

const MemberRecommendCard = ({ member }: Props) => {
  const { profileImage, name, generation, part, recommendType } = member;

  return (
    <StyledContainer>
      <StyledAvatarWrapper>
        {profileImage ? <StyledAvatar src={profileImage} alt={`${name}님의 프로필 이미지`} /> : <StyledDefaultAvatar />}
        <StyledChipOverlay>
          <RecommendTypeChip recommendType={recommendType} />
        </StyledChipOverlay>
      </StyledAvatarWrapper>
      <StyledInfoWrapper>
        <StyledName>{name} &gt;</StyledName>
        <StyledMeta>
          {generation}기 {part}
        </StyledMeta>
      </StyledInfoWrapper>
    </StyledContainer>
  );
};

export default MemberRecommendCard;

const StyledContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px 24px;
  background-color: ${colors.gray900};
  border-radius: 10px;
  cursor: pointer;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 8px;
    padding: 12px 16px;
  }
`;

const StyledAvatarWrapper = styled.div`
  position: relative;
`;

const StyledAvatar = styled.img`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 72px;
    height: 72px;
  }
`;

const StyledDefaultAvatar = styled(IconUser)`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${colors.gray700};
  color: ${colors.gray400};
  padding-top: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 72px;
    height: 72px;
    padding-top: 9px;
  }
`;

const StyledChipOverlay = styled.div`
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledInfoWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 2px;
    align-items: center;
  }
`;

const StyledName = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${colors.gray10};
  ${fonts.HEADING_20_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_14_SB}
  }
`;

const StyledMeta = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${colors.gray200};
  ${fonts.LABEL_14_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_12_SB}
  }
`;
