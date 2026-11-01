import { spacing } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

import type { RoundType } from '@/domain/settlement/types';

import SettlementRound from '../SettlementRound';

interface SettlementListProps {
  meetingId: number;
  rounds: RoundType[];
  isLeader: boolean;
  isEnded: boolean;
}

const SettlementList = ({ meetingId, rounds, isLeader, isEnded }: SettlementListProps) => {
  const hasClosedRound = rounds.some((round) => round.isClosed);

  return (
    <SList>
      {rounds.map((round) => (
        <SettlementRound
          key={round.roundId}
          meetingId={meetingId}
          round={round}
          isLeader={isLeader}
          isEnded={isEnded}
          hasClosedRound={hasClosedRound}
        />
      ))}
    </SList>
  );
};

export default SettlementList;

const SList = styled('section', {
  'maxWidth': '1020px',
  'margin': '60px auto 0',
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '120px',
  '@desktop': {
    maxWidth: '708px',
    marginTop: spacing.s40,
  },
  '@mobile': {
    maxWidth: 'none',
    width: 'calc(100% + 8px)',
    marginLeft: '-4px',
    marginTop: '30px',
    gap: spacing.s80,
  },
});
