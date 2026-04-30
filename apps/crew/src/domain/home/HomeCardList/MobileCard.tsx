import UserIcon from '@assets/svg/user.svg?rect';
import Avatar from '@common/avatar/Avatar';
import { PART_NAME } from '@constant/option';
import type { HomeMeetingCardProps } from '@domain/home/HomeCardList/type';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import Link from 'next/link';
import { styled } from 'stitches.config';

const MobileCard = ({
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
        <SThumbnailImage src={imageURL} />
        <SMetaWrapper>
          <STitle>{title}</STitle>
          {subTitle && <SSubTitle>{subTitle}</SSubTitle>}

          <SInfoWrapper>
            <SUserIcon />
            <SInfoStyle style={{ whiteSpace: 'nowrap' }}>{`${approvedCount}/${capacity}명`}</SInfoStyle>
            <SDot>·</SDot>
            <SInfoStyle>{`${canJoinOnlyActiveGeneration ? '활동 기수' : '전체 기수'} / ${displayParts}`}</SInfoStyle>
          </SInfoWrapper>

          <SUserInfoWrapper align='center'>
            <SAvatar src={ownerImage} alt={`${title} 모임장 프로필`} />
            <SMeta>{ownerName}</SMeta>
            <SDivider>|</SDivider>
            <SMeta>{category}</SMeta>
          </SUserInfoWrapper>
        </SMetaWrapper>
      </SCardWrapper>
    </Link>
  );
};

export default MobileCard;

const SCardWrapper = styled('article', {
  display: 'flex',
  gap: '$12',

  width: '100%',
});

const SThumbnailImage = styled('img', {
  'borderRadius': '$12',

  'backgroundColor': '$gray800',
  'objectFit': 'cover',
  'flexShrink': 0,

  '@tablet': {
    width: '158px',
    height: '108px',
  },
  '@mobile': {
    width: '123px',
    height: '84px',
  },
});

const SMetaWrapper = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',

  'overflow': 'hidden',
  '@tablet': {
    py: '$2',
  },
  '@mobile': {
    py: '$0',
  },
});

const STitle = styled('h3', {
  'width': '100%',

  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',

  '@tablet': {
    ...fontsObject.HEADING_7_16_B,
    mb: '$0',
  },
  '@mobile': {
    fontStyle: 'H5',
    mb: '$2',
  },
});

const SSubTitle = styled('p', {
  'width': '100%',

  'overflow': 'hidden',
  'textOverflow': 'ellipsis',
  'whiteSpace': 'nowrap',
  'color': '$gray100',
  'mb': '$8',

  '@tablet': {
    ...fontsObject.BODY_3_14_M,
  },
  '@mobile': {
    fontStyle: 'B4',
  },
});

const SInfoWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',

  mb: '$8',
});

const SUserIcon = styled(UserIcon, {
  'alignContent': 'center',
  'mr': '$6',

  '@tablet': {
    width: '20px',
    height: '20px',
  },

  '@mobile': {
    width: '16px',
    height: '16px',
  },
});

const SInfoStyle = styled('p', {
  ...fontsObject.LABEL_4_12_SB,
  color: '$gray300',
});

const SDot = styled('span', {
  color: '$gray300',
  padding: '0 $3',
});

const SMeta = styled('p', {
  'color': '$white',

  '@tablet': {
    ...fontsObject.LABEL_4_12_SB,
  },
  '@mobile': {
    ...fontsObject.LABEL_5_11_SB,
  },
});

const SDivider = styled('span', {
  color: '$gray400',
  padding: '0 $3',
});

const SUserInfoWrapper = styled(Flex, {
  '@tablet': { mb: '$2' },
  '@mobile': { mb: '$0' },
});

const SAvatar = styled(Avatar, {
  '@tablet': {
    width: '22px',
    height: '22px',
    margin: '0px 6px 0 0',
  },
  '@mobile': {
    width: '18px',
    height: '18px',
    margin: '0px 6px 2 0',
  },
});
