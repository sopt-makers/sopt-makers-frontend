import type { GetMeeting } from '@api/meeting/type';
import MentorTooltip from '@domain/detail/MeetingController/MentorTooltip';
import ProfileAnchor from '@domain/detail/MeetingController/ProfileAnchor';
import RecruitmentStatusTag from '@shared/Tag/RecruitmentStatusTag';
import { fontsObject } from '@sopt-makers/fonts';
import dayjs from 'dayjs';
import { styled } from 'stitches.config';

const MeetingAbout = ({ detailData }: { detailData: GetMeeting['response'] }) => {
  const {
    title,
    status,
    startDate,
    subTitle,
    endDate,
    user: { orgId: hostId, name: hostName, profileImage: hostProfileImage },
    category,
    coMeetingLeaders,
    isMentorNeeded,
  } = detailData;

  return (
    <SAbout>
      <SStatusWrapper>
        <RecruitmentStatusTag status={status} />
        <SPeriod>
          {dayjs(startDate).format('YY.MM.DD')} - {dayjs(endDate).format('YY.MM.DD')}
        </SPeriod>
      </SStatusWrapper>
      <h1>
        <span>{category}</span>
        {title}
      </h1>
      <SSubTitle>{subTitle}</SSubTitle>
      <SHostWrapper>
        <ProfileAnchor
          profileData={{
            orgId: hostId,
            userprofileImage: hostProfileImage,
            userName: hostName,
          }}
        />
        {coMeetingLeaders?.map((item: (typeof coMeetingLeaders)[number]) => (
          <ProfileAnchor key={item.orgId} profileData={item} />
        ))}
      </SHostWrapper>
      {isMentorNeeded && <MentorTooltip />}
    </SAbout>
  );
};

export default MeetingAbout;

const SAbout = styled('div', {
  'mr': '$90',

  '@mobile': {
    mr: '$0',
  },

  '& > div': {
    flexType: 'verticalCenter',
    mb: '$12',
  },

  '& > h1': {
    'span': {
      'color': '$gray400',
      'mr': '$8',

      '@mobile': {
        mr: '$4',
      },
    },

    'fontAg': '34_bold_140',
    'color': '$gray10',

    '@mobile': {
      fontStyle: 'H3',
    },
  },
});

const SSubTitle = styled('p', {
  // TODO: mds 적용
  ...fontsObject.BODY_1_18_M,

  'color': '$gray200',
  'mb': '$20',

  '@tablet': {
    ...fontsObject.BODY_2_16_R,
  },

  '@mobile': {
    ...fontsObject.BODY_3_14_M,
    mb: '$16',
  },
});

const SStatusWrapper = styled('div', {
  'display': 'flex',
  'gap': '$12',
  '@mobile': {
    gap: '$8',
  },
});

const SPeriod = styled('div', {
  'fontAg': '20_bold_100',
  'color': '$gray300',

  '@mobile': {
    fontStyle: 'T6',
  },
});

const SHostWrapper = styled('div', {
  'position': 'relative',
  'gap': '16px',
  '@media (max-width: 414px)': {
    gap: '6px',
  },
});
