import { useRecommendMeetingListQuery } from '@api/meeting/query';
import type { MeetingData } from '@api/meeting/type';
import DesktopCard from '@domain/home/HomeCardList/DesktopCard';
import MobileCard from '@domain/home/HomeCardList/MobileCard';
import type { HomeMeetingCardProps } from '@domain/home/HomeCardList/type';
import { useDisplay } from '@hook/useDisplay';
import { fontsObject } from '@sopt-makers/fonts';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

type HomeCardProps = {
  label: string;
  isMore?: boolean;
  onMoreClick?: () => void;
  meetingIds: number[];
};

const getMeetingCardProps = (meeting: MeetingData): HomeMeetingCardProps => ({
  id: meeting.id,
  imageURL: meeting.imageURL[0]?.url,
  title: meeting.title,
  subTitle: meeting.subTitle,
  ownerName: meeting.user.name,
  ownerImage: meeting.user.profileImage,
  approvedCount: meeting.approvedCount || 0,
  capacity: meeting.capacity,
  category: meeting.category,
  canJoinOnlyActiveGeneration: meeting.canJoinOnlyActiveGeneration,
  joinableParts: meeting.joinableParts,
});

const CardList = ({ label, isMore = false, onMoreClick = () => {}, meetingIds }: HomeCardProps) => {
  const { isTablet, isLaptop } = useDisplay();
  const data = useQuery(useRecommendMeetingListQuery({ meetingIds })).data?.meetings;

  const MeetingCard = isTablet ? MobileCard : DesktopCard;

  if (!data) return null;
  return (
    <SCardListWrapper>
      <STitleWrapper>
        <STitleStyle>{label}</STitleStyle>
        {isMore && <SMoreBtn onClick={onMoreClick}>{'더보기 >'}</SMoreBtn>}
      </STitleWrapper>
      <SCardWrapper>
        {data.slice(0, isLaptop ? 4 : 3).map((meeting) => (
          <MeetingCard key={meeting.id} {...getMeetingCardProps(meeting)} />
        ))}
      </SCardWrapper>
    </SCardListWrapper>
  );
};

export default CardList;

const SCardListWrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  paddingBottom: spacing.s40,
});

const STitleWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
  paddingBottom: spacing.s16,
});

const STitleStyle = styled('p', {
  ...typography.heading2,
  'color': colors.fg.neutral.bold,

  '@tablet': {
    ...typography.title3,
  },

  '@mobile': {
    ...typography.title4,
  },
});

const SMoreBtn = styled('button', {
  fontStyle: 'B2',
  color: '$gray200',
});

const SCardWrapper = styled('div', {
  'display': 'flex',
  'justifyContent': 'space-between',
  'overflow': 'hidden',

  '@tablet': {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '20px',
    width: '100%',
  },

  '@large_desktop': {
    overflow: 'auto',
    hideScrollbar: true,
  },
});
