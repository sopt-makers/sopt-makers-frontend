import { useOverlay } from '@hook/useOverlay/Index';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import FeedCreateWithSelectMeetingModal from './FeedCreateWithSelectMeetingModal';

const FeedCreateModalController = () => {
  const router = useRouter();
  const { modal, entry } = router.query;
  const overlay = useOverlay();

  useEffect(() => {
    if (modal !== 'create-feed') return;

    const nextQuery = { ...router.query };

    delete nextQuery.modal;
    delete nextQuery.entry;

    void router.replace(
      {
        pathname: router.pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true },
    );

    overlay.open(({ isOpen, close }) => (
      <FeedCreateWithSelectMeetingModal
        isModalOpened={isOpen}
        handleModalClose={close}
        isMumuEntry={entry === 'mumu'}
      />
    ));
  }, [modal, entry, overlay, router]);

  return null;
};

export default FeedCreateModalController;
