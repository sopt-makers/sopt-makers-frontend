import UserIcon from '@assets/svg/user.svg?rect';
import Avatar from '@common/avatar/Avatar';
import { PART_NAME } from '@constant/option';
import type { HomeMeetingCardProps } from '@domain/home/HomeCardList/type';
import { fontsObject } from '@sopt-makers/fonts';
import { getResizedImage } from '@util/image';
import Link from 'next/link';
import { styled } from 'stitches.config';

const DesktopCard = ({
  id,
  imageURL,
  title,
  subTitle,
  ownerName,
  ownerImage,
  approvedCount,
  capacity,
  category,
  canJoinOnlyActiveGeneration,
  joinableParts,
}: HomeMeetingCardProps) => {
  const isAllParts = joinableParts.length === 6 || joinableParts === null;
  const displayParts = isAllParts ? '전체 파트' : joinableParts.map((part) => PART_NAME[part]).join(', ');

  return (
    <Link href={`/detail?id=${id}`}>
      <SCardWrapper>
        <SThumbnailImage src={getResizedImage(imageURL ?? '', 285)} />
        <SUserInfoWrapper>
          <Avatar src={ownerImage} alt={`${title} 모임장 프로필`} sx={{ width: '18px', height: '18px' }} />
          <SMetaStyle>
            {ownerName}
            <SMetaSubStyle>|</SMetaSubStyle>
            {category}
          </SMetaStyle>
        </SUserInfoWrapper>

        <STitleStyle>{title}</STitleStyle>
        {subTitle && <SSubTitle>{subTitle}</SSubTitle>}

        <SMetaWrapper>
          <SUserIcon />
          <SInfoStyle>{`${approvedCount}/${capacity}명`}</SInfoStyle>
          <SDot>·</SDot>
          <SInfoStyle>{`${canJoinOnlyActiveGeneration ? '활동 기수' : '전체 기수'} / ${displayParts}`}</SInfoStyle>
        </SMetaWrapper>
      </SCardWrapper>
    </Link>
  );
};

export default DesktopCard;

const SCardWrapper = styled('article', {
  display: 'flex',
  flexDirection: 'column',

  width: '285px',
  height: '318px',
});

const SThumbnailImage = styled('img', {
  width: '285px',
  height: '180px',

  borderRadius: '$12',

  backgroundColor: '$gray800',
  objectFit: 'cover',
  flexShrink: 0,
});

const SUserInfoWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
  pt: '$16',
});

const SMetaStyle = styled('p', {
  ...fontsObject.LABEL_5_11_SB,
  color: '$white',
});

const SMetaSubStyle = styled('span', {
  padding: '0 $3',

  color: '$gray500',
});

const STitleStyle = styled('h3', {
  pt: '$4',

  ...fontsObject.HEADING_6_18_B,
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
});

const SSubTitle = styled('p', {
  ...fontsObject.BODY_2_16_M,
  color: '$gray200',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  pt: '$2',
});

const SMetaWrapper = styled('div', {
  pt: '$8',
  display: 'flex',
  alignItems: 'center',
});

const SUserIcon = styled(UserIcon, {
  width: '16px',
  height: '16px',
  mr: '$6',
  stroke: '$gray500',
});

const SInfoStyle = styled('p', {
  ...fontsObject.LABEL_4_12_SB,
  color: '$gray300',
});

const SDot = styled('span', {
  ...fontsObject.LABEL_4_12_SB,

  color: '$gray500',
  padding: '0 $3',
});
