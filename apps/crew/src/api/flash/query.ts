import { getFlash } from '@api/flash';
import FlashQueryKey from '@api/flash/FlashQueryKey';
import { queryOptions } from '@tanstack/react-query';

export const useFlashQueryOption = ({ meetingId }: { meetingId: number }) => {
  return queryOptions({
    queryKey: FlashQueryKey.detail(meetingId),
    queryFn: () => getFlash(meetingId),
    enabled: !!meetingId,
  });
};
