import { useOverlay } from '@hook/useOverlay/Index';
import FeedCreateModal from '@shared/feed/Modal/FeedCreateModal';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

interface EmptyViewProps {
  isMember: boolean;
}

const EmptyView = ({ isMember }: EmptyViewProps) => {
  const { query } = useRouter();
  const meetingId = query?.id as string;

  const feedCreateOverlay = useOverlay();

  const handleModalOpen = () => {
    feedCreateOverlay.open(({ isOpen, close }) => {
      return <FeedCreateModal meetingId={meetingId} isModalOpened={isOpen} handleModalClose={close} />;
    });
  };

  return (
    <>
      <SContent>
        <SEmoji>👀</SEmoji>
        <p>아직 작성된 피드가 없어요.</p>

        {isMember && (
          <>
            <p>첫번째 작성자가 되어볼까요?</p>
            <button onClick={handleModalOpen}>작성하러 가기</button>
          </>
        )}
      </SContent>
    </>
  );
};

export default EmptyView;

const SContent = styled('div', {
  'flexType': 'center',
  'flexDirection': 'column',
  'color': '$gray200',
  'fontStyle': 'T1',

  '@media (max-width: 768px)': {
    fontStyle: 'H4',
  },

  'button': {
    'background': '$gray600',
    'color': '$white',
    'mt': '$48',
    'padding': '16px 35.5px',
    'borderRadius': '14px',
    'fontStyle': 'H2',

    '@media (max-width: 768px)': {
      mt: '$32',
      padding: '$10 $20',
      borderRadius: '8px',
      fontStyle: 'H4',
    },
  },
});

const SEmoji = styled('p', {
  'mb': '$20',

  '@media (max-width: 768px)': {
    mb: '$12',
  },
});
