import { useUserProfileQueryOption } from '@api/user/query';
import { getSettlementRole } from '@domain/settlement/util';
import { spacing } from '@sopt-mds/design-tokens';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

import type { RoundType } from '@/domain/settlement/types';

import SettlementRound from '../SettlementRound';

interface SettlementListProps {
  meetingId: number;
  rounds: RoundType[];
  isLeader: boolean;
  isApprovedPayer: boolean;
  isEnded: boolean;
  isSettlementInfoModified?: boolean;
}

const SettlementList = ({
  meetingId,
  rounds,
  isLeader,
  isApprovedPayer,
  isEnded,
  isSettlementInfoModified = false,
}: SettlementListProps) => {
  const { data: user } = useQuery(useUserProfileQueryOption());
  const settlementRole = getSettlementRole({ isLeader, isApprovedPayer, rounds });
  const hasClosedRound = rounds.some((round) => round.isClosed);

  return (
    <SList>
      {[...rounds]
        .sort((a, b) => b.roundNumber - a.roundNumber)
        .map((round) => (
          <SettlementRound
            key={round.roundId}
            meetingId={meetingId}
            round={round}
            isLeader={isLeader}
            isEnded={isEnded}
            isSettlementInfoModified={isSettlementInfoModified}
            settlementRole={settlementRole}
            userId={user?.orgId}
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
  'paddingBottom': spacing.s120,
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s80,
  '@desktop': {
    maxWidth: '708px',
    marginTop: spacing.s40,
    gap: spacing.s120,
  },
  '@mobile': {
    maxWidth: 'none',
    width: 'calc(100% + 8px)',
    marginLeft: '-4px',
    marginTop: '30px',
    gap: spacing.s80,
  },
});
