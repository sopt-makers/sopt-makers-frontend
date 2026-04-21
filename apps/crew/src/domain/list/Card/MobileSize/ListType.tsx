import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import RecruitmentStatusTag from '@shared/Tag/RecruitmentStatusTag';
import { Flex } from '@shared/util/layout/Flex';
import { getResizedImage } from '@util/image';
import { styled } from 'stitches.config';

import type { MobileSizeCardProps } from '.';

const MOCK_DATA = {
  subTitle: '3대 째 운영되는 온라인 독서모임이며 스장 존녜존잼 보장 제미나이야 일해라',
};

function ListType({ meetingData }: Omit<MobileSizeCardProps, 'mobileType'>) {
  return (
    <Container>
      <Flex align='center' css={{ mb: '$16' }}>
        <ImageWrapper>
          <RecruitmentStatusTag status={meetingData.status} style={{ position: 'absolute', top: '8px', left: '8px' }} />
          <SThumbnailImage
            css={{
              backgroundImage: `url(${getResizedImage(meetingData.imageURL[0]?.url ?? '', 120)})`,
            }}
          />
        </ImageWrapper>

        <InfoGroup>
          <STitle>{meetingData.title}</STitle>
          {/* @TODO subTitle api 연동 */}
          <SSubTitle>{MOCK_DATA.subTitle}</SSubTitle>
          <Flex align='center'>
            <SCategory>{meetingData.category}</SCategory>
            <Divider>|</Divider>
            <SProfileWrapper>
              {meetingData.user.profileImage ? (
                <SProfile src={getResizedImage(meetingData.user.profileImage, 120)} alt='' />
              ) : (
                <ProfileDefaultIcon width={20} height={20} />
              )}
            </SProfileWrapper>
            <SUserInfo>{meetingData.user.name}</SUserInfo>
          </Flex>
          <TagWrapper>
            {meetingData.meetingKeywordTypes?.map((keyword) => (
              <WelcomeTag key={keyword}>{keyword}</WelcomeTag>
              // @TODO: 참여 정보 # 000으로 표시 및 API 연동, 키워드 최대 2개 노출, 참여 정보 최대 2개 노출
            ))}
          </TagWrapper>
        </InfoGroup>
      </Flex>
      <Divider />
    </Container>
  );
}

export default ListType;

const Container = styled('div', {
  width: '100%',
});
const ImageWrapper = styled('div', {
  position: 'relative',
});
const SThumbnailImage = styled('div', {
  width: '134px',
  height: '92px',
  borderRadius: '$8',
  overflow: 'hidden',
  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const InfoGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  ml: '$12',
  minWidth: 0,
  flex: 1,
});

const SProfileWrapper = styled('div', {
  flexType: 'verticalCenter',
  color: '$gray10',
  width: 'fit-content',
  mr: '$8',
});
const SProfile = styled('img', {
  width: '$20',
  height: '$20',
  borderRadius: '50%',
  objectFit: 'cover',
  background: '$gray700',
});

const STitle = styled('p', {
  fontStyle: 'H5',
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  mb: '$4',
  color: '$gray10',
});

const SSubTitle = styled('p', {
  fontStyle: 'B4',
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  mb: '$8',
  color: '$gray200',
});

const Divider = styled('p', {
  fontStyle: 'T6',
  color: '$gray300',
  mx: '$4',
});

const SUserInfo = styled('p', {
  fontStyle: 'B4',
  color: '$gray300',
});

const SCategory = styled(SUserInfo, {
  color: '$gray200',
});

const WelcomeTag = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '$3 $8',

  borderRadius: '37px',
  border: '1px solid $gray600',

  color: '$gray100',
  fontStyle: 'L2',
});

const TagWrapper = styled('div', {
  display: 'flex',
  gap: '$4',
  mt: '$8',
});
