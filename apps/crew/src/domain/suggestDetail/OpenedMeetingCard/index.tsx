import type { OpenedMeetingData } from '@domain/suggestDetail/types';
import { useDisplay } from '@hook/useDisplay';

import DesktopCard from './DesktopCard';
import MobileCard from './MobileCard';

interface OpenedMeetingCardProps {
  meeting: OpenedMeetingData;
}

const OpenedMeetingCard = ({ meeting }: OpenedMeetingCardProps) => {
  const { isMobile } = useDisplay();

  return isMobile ? <MobileCard meeting={meeting} /> : <DesktopCard meeting={meeting} />;
};

export default OpenedMeetingCard;
