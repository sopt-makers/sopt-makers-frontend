import type { MeetingData } from '@api/meeting/type';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import type { CategoryKoType } from '@constant/option';
import { CategoryChip } from '@domain/list/Card/DesktopSizeCard/CategoryChip';
import type { CardInfoItem } from '@domain/list/Card/DesktopSizeCard/constant';
import { MeetingInformation } from '@domain/list/Card/DesktopSizeCard/constant';
import RecruitmentStatusTag from '@shared/Tag/RecruitmentStatusTag';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { Tag } from '@sopt-makers/ui';
import { getResizedImage } from '@util/image';
import { styled } from 'stitches.config';

interface CardProps {
  meetingData: MeetingData;
  isFlash?: boolean;
  flashDetailInfo?: CardInfoItem[];
  flashCount?: string;
}

function DesktopSizeCard({ meetingData, isFlash = false, flashDetailInfo, flashCount }: CardProps) {
  const detailInfo: CardInfoItem[] = isFlash && flashDetailInfo ? flashDetailInfo : MeetingInformation(meetingData);

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

      <STitleSection>
        <STitle>{meetingData.title}</STitle>
        <SSubTitle>{meetingData.subTitle}</SSubTitle>
      </STitleSection>

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
          {isValid && (
            <>
              <SKey>{label}</SKey>
              {Array.isArray(value) ? (
                <SArrayValues>
                  {value.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </SArrayValues>
              ) : (
                <SValue>{value}</SValue>
              )}
            </>
          )}
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
const STitleSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  mb: '$12',
});
const STitle = styled('p', {
  maxWidth: '380px',
  fontStyle: 'H2',
});
const SSubTitle = styled('p', {
  ...fontsObject.BODY_2_16_M,
  maxWidth: '380px',
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
const SArrayValues = styled('div', {
  display: 'flex',
  gap: '$6',
  flexWrap: 'wrap',
  color: '$gray300',
  fontStyle: 'B3',
});
