import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconMessageSquare } from '@sopt-makers/icons';
import { Skeleton } from '@sopt-makers/ui';

import type { PopularPostType } from '@/api/endpoint/feed/getPopularPost';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import { IconHeart, IconMember } from '@/components/feed/common/Icon';

interface PopularCardProps {
  rank: number;
  card?: PopularPostType[number];
  isLoading?: boolean;
  isProfile?: boolean;
  onClick?: () => void;
}

const PopularSkeleton = ({ rank, isProfile }: { rank: number; isProfile?: boolean }) => {
  return (
    <StyledCardContainer $isProfile={isProfile}>
      <StyledMainContents>
        <StyledRank>{rank}</StyledRank>
        <StyledTitleContainer>
          <SkeletonTag>
            <Skeleton width={20} height={14} color={colors.gray700} />
          </SkeletonTag>
          <SkeletonTitle>
            <Skeleton width={100} height={18} color={colors.gray700} />
          </SkeletonTitle>
        </StyledTitleContainer>
      </StyledMainContents>
      <StyledSubContents>
        {isProfile && (
          <ProfileInfo>
            <IconMember size={20} />
            <Text typography='SUIT_14_SB' color={colors.gray50} lineHeight={18}>
              <Skeleton width={40} height={18} color={colors.gray700} />
            </Text>
          </ProfileInfo>
        )}
        <EtcInfoContainer>
          <EtcInfo>
            <Text typography='SUIT_14_SB' color={colors.gray400} lineHeight={18}>
              <Skeleton width={25} height={18} color={colors.gray700} />
            </Text>
          </EtcInfo>
          <EtcInfo>
            <Text typography='SUIT_14_SB' color={colors.gray400} lineHeight={18}>
              <Skeleton width={25} height={18} color={colors.gray700} />
            </Text>
          </EtcInfo>
        </EtcInfoContainer>
      </StyledSubContents>
    </StyledCardContainer>
  );
};

const PopularCard = ({ card, rank, isProfile = false, isLoading = false, onClick }: PopularCardProps) => {
  if (isLoading || !card) return <PopularSkeleton rank={rank} isProfile={isProfile} />;

  const { categoryTagLabel, title, likeCount, member, commentCount } = card;
  const { name, profileImage } = member;

  return (
    <StyledCardContainer $isProfile={isProfile} onClick={onClick}>
      <StyledMainContents>
        <StyledRank>{rank}</StyledRank>
        <StyledTitleContainer>
          <Tag>{categoryTagLabel}</Tag>
          <TitleText typography='SUIT_14_SB' color={colors.white} lineHeight={18}>
            {title || '제목 없는 게시글'}
          </TitleText>
        </StyledTitleContainer>
      </StyledMainContents>
      <StyledSubContents>
        {isProfile && (
          <ProfileInfo>
            {profileImage ? (
              <ProfileImage width={20} height={20} src={profileImage} alt={card.member.name} />
            ) : (
              <IconMember size={20} />
            )}
            <NameText typography='SUIT_14_SB' color={colors.gray50} lineHeight={18}>
              {name}
            </NameText>
          </ProfileInfo>
        )}
        <EtcInfoContainer>
          <EtcInfo>
            <HeartIcon fill='none' />
            <Text typography='SUIT_14_SB' color={colors.gray400} lineHeight={18}>
              {likeCount}
            </Text>
          </EtcInfo>
          <EtcInfo>
            <MessageIcon />
            <Text typography='SUIT_14_SB' color={colors.gray400} lineHeight={18}>
              {commentCount}
            </Text>
          </EtcInfo>
        </EtcInfoContainer>
      </StyledSubContents>
    </StyledCardContainer>
  );
};

export default PopularCard;

const StyledCardContainer = styled.div<{ $isProfile?: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  border-radius: 12px;
  background: ${colors.gray900};
  cursor: pointer;
  padding: 16px;
  width: 100%;

  &:hover {
    background: ${colors.gray800};
  }
  ${({ $isProfile }) => $isProfile && `flex-direction: column; `}
`;

const StyledMainContents = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledRank = styled(Text)`
  ${fonts.LABEL_18_SB};
  color: ${colors.white};
  width: 16px;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  border-radius: 4px;
  background-color: ${colors.orangeAlpha200};
  padding: 3px 6px;
  width: fit-content;
  height: 20px;
  white-space: nowrap;
  color: ${colors.secondary};
  ${fonts.LABEL_11_SB}
`;

const TitleText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledSubContents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 0;
`;

const SkeletonTag = styled.div`
  border-radius: 4px;
  background-color: ${colors.gray700};
  width: 48px;
  height: 20px;
  flex-shrink: 0;
`;

const SkeletonTitle = styled.div`
  border-radius: 4px;
  background-color: ${colors.gray700};
  width: 160px;
  height: 18px;
`;

const ProfileImage = styled(ResizedImage)`
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const NameText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EtcInfoContainer = styled.div`
  display: flex;
  gap: 4px;
  width: 54px;
  color: ${colors.gray400};
`;

const EtcInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const HeartIcon = styled(IconHeart)`
  flex-shrink: 0;
  width: 14px;
  height: 14px;
`;

const MessageIcon = styled(IconMessageSquare)`
  flex-shrink: 0;
  width: 14px;
  height: 14px;
`;
