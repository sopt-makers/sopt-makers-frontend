import type { MeetingData } from '@api/meeting/type';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import type { CategoryKoType } from '@constant/option';
import { CategoryChip } from '@domain/list/Card/DesktopSizeCard/CategoryChip';
import { MeetingInformation } from '@domain/list/Card/DesktopSizeCard/constant';
import RecruitmentStatusTag from '@shared/Tag/RecruitmentStatusTag';
import { Flex } from '@shared/util/layout/Flex';
import { Tag } from '@sopt-makers/ui';
import { getResizedImage } from '@util/image';
import { styled } from 'stitches.config';

interface CardProps {
  meetingData: MeetingData;
  isFlash?: boolean;
  flashDetailInfo?: {
    label: string;
    value: () => string;
    isValid: boolean;
  }[];
  flashCount?: string;
}

const MOCK_DATA = {
  subtitle: '3대 째 운영되는 온라인 독서모임이며 스장 존녜존잼 보장 제미나이야 일해라',
};

function DesktopSizeCard({ meetingData, isFlash = false, flashDetailInfo, flashCount }: CardProps) {
  const detailInfo = isFlash && flashDetailInfo ? flashDetailInfo : MeetingInformation(meetingData);

  return (
    <>
      <ImageWrapper>
        <RecruitmentStatusTag status={meetingData.status} style={{ position: 'absolute', top: '16px', left: '16px' }} />
        <STag size='md' type='solid'>
          {isFlash ? flashCount : `${meetingData.approvedCount} / ${meetingData.capacity}명`}
        </STag>
        <SThumbnailImage
          css={{
            backgroundImage: `url(${getResizedImage(meetingData.imageURL[0]?.url ?? '', 380)})`,
          }}
        />
      </ImageWrapper>

      <CategroyChipWrapper>
        <CategoryChip
          category={meetingData.category as CategoryKoType}
          meetingKeywordTypes={meetingData.meetingKeywordTypes}
        />
      </CategroyChipWrapper>

      <TitleSection>
        <Title>{meetingData.title}</Title>
        <SubTitle>{MOCK_DATA.subtitle}</SubTitle>
      </TitleSection>

      <Flex css={{ mb: '$8' }} align='center'>
        <SProfileWrapper>
          {meetingData.user.profileImage ? (
            <SProfile src={getResizedImage(meetingData.user.profileImage, 120)} alt='' />
          ) : (
            <ProfileDefaultIcon width={24} height={24} />
          )}
        </SProfileWrapper>
        <SName>{meetingData.user.name}</SName>
      </Flex>
      {detailInfo.map(({ label, value, isValid }) => (
        <SInfoRow key={label}>
          {isValid ? (
            <>
              <SKey>{label}</SKey>
              <SValue>{value()}</SValue>
            </>
          ) : null}
        </SInfoRow>
      ))}
    </>
  );
}

export default DesktopSizeCard;
const ImageWrapper = styled('div', {
  position: 'relative',
});

const STag = styled(Tag, {
  position: 'absolute',
  top: '16px',
  right: '16px',
});

const SThumbnailImage = styled('div', {
  width: '380px',
  height: '260px',
  overflow: 'hidden',
  borderRadius: '$12',
  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
});

const CategroyChipWrapper = styled('div', {
  'my': '$16',
  '@media (max-width: 768px)': {
    my: '$8',
  },
});

const SProfileWrapper = styled('div', {
  flexType: 'verticalCenter',
  color: '$gray10',
  width: 'fit-content',
  mr: '$8',
});
const SProfile = styled('img', {
  width: '$24',
  height: '$24',
  borderRadius: '50%',
  objectFit: 'cover',
  background: '$gray700',
});

const SName = styled('p', {
  fontStyle: 'T5',
});
const TitleSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  mb: '$12',
});
const Title = styled('p', {
  maxWidth: '380px',
  fontStyle: 'H2',
});
const SubTitle = styled('p', {
  maxWidth: '380px',
  fontStyle: 'B16',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  color: '$gray200',
});
const SInfoRow = styled(Flex, {
  '& + &': {
    mt: '$4',
  },
});
const SInfo = styled('p', {
  fontStyle: 'B3',
});
const SKey = styled(SInfo, {
  width: '52px',
  color: '$gray500',
  mr: '$12',
  whiteSpace: 'nowrap',
});
const SValue = styled(SInfo, {
  color: '$gray300',
});
