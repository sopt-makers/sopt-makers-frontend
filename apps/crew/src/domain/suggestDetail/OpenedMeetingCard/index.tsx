import type { OpenedMeetingData } from '@domain/suggestDetail/types';
import { useDisplay } from '@hook/useDisplay';

import DesktopCard from './DesktopCard';
import MobileCard from './MobileCard';

interface OpenedMeetingCardProps {
  meeting: OpenedMeetingData;
  onClick?: () => void;
}

const OpenedMeetingCard = ({ meeting, onClick }: OpenedMeetingCardProps) => {
  const { isMobile } = useDisplay();

  return isMobile ? (
    <MobileCard meeting={meeting} onClick={onClick} />
  ) : (
    <DesktopCard meeting={meeting} onClick={onClick} />
  );
};

export default OpenedMeetingCard;
