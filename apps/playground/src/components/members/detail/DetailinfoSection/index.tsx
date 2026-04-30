import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import type { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import InfoItem from '@/components/members/detail/InfoItem';

import MemberDetailSection from '../ActivitySection/MemberDetailSection';

interface DetailInfoSectionProps {
  profile: ProfileDetail;
}

const DetailInfoSection = ({ profile }: DetailInfoSectionProps) => {
  const hasProfileInfo = profile.university || profile.major || profile.address;

  if (!hasProfileInfo) return null;

  return (
    <StyledContainer>
      {profile.university && <InfoItem label='학교'>{profile.university}</InfoItem>}
      {profile.major && <InfoItem label='전공'>{profile.major}</InfoItem>}
      {profile.address && (
        <InfoItem label='활동 지역'>
          <StyledAddressBadgeWrapper>
            {profile.address.split(',').map((address) => (
              <AddressItem key={address}>{address}</AddressItem>
            ))}
          </StyledAddressBadgeWrapper>
        </InfoItem>
      )}
    </StyledContainer>
  );
};

export default DetailInfoSection;

const StyledContainer = styled(MemberDetailSection)`
  gap: 28px;
  padding: 28px 40px 32px 40px;
`;

const StyledAddressBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const AddressItem = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    display: inline-block;
    margin: 0 10px;
    background-color: ${colors.gray600};
    width: 1px;
    height: 16px;
    content: '';
  }
`;
