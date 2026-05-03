import type { GetMeetingPartMembers } from '@api/meeting/type';
import { styled } from 'stitches.config';

interface PartStatusModalContentProps {
  partMembersData: GetMeetingPartMembers['response'];
}

const PartStatusModalContent = ({ partMembersData }: PartStatusModalContentProps) => {
  const memberNames = partMembersData.appliedInfo?.map((info) => info.user.name) ?? [];
  const total = partMembersData.participantCount ?? memberNames.length;

  return (
    <>
      {memberNames.length > 0 ? (
        <SListWrapper>
          <SList>
            {memberNames.map((name, idx) => (
              <SItem key={idx}>{name}</SItem>
            ))}
          </SList>
        </SListWrapper>
      ) : (
        <SEmptyText>신청자가 아직 없어요.</SEmptyText>
      )}
      {memberNames.length > 0 && (
        <SModalBottom>
          <STotal>{total}명 신청</STotal>
        </SModalBottom>
      )}
    </>
  );
};

export default PartStatusModalContent;

const SListWrapper = styled('div', {
  'padding': '$24 $24 0 $24',

  '@tablet': {
    padding: '$0',
  },
});

const SList = styled('div', {
  'display': 'grid',
  'gridTemplateColumns': 'repeat(2, 1fr)',
  'gap': '$12',
  'padding': '0 $24',
  'height': '$219',
  'overflowY': 'scroll',

  '@tablet': {
    gap: '$8',
    padding: '0 $20',
    height: '$160',
  },

  '@mobile': {
    gridTemplateColumns: '1fr',
  },

  '&::-webkit-scrollbar': {
    width: '$6',
  },

  '&::-webkit-scrollbar-thumb': {
    height: '$125',
    background: '$gray200',
    borderRadius: '6px',
  },
});

const SItem = styled('div', {
  'flexType': 'verticalCenter',
  'height': '$64',
  'padding': '$16 $20',
  'borderRadius': '12px',
  'backgroundColor': '$gray700',
  'color': '$gray10',
  'fontAg': '16_semibold_100',

  '@tablet': {
    height: '$48',
    padding: '$11 $12',
    fontAg: '14_medium_100',
  },
});

const SEmptyText = styled('p', {
  'flexType': 'center',
  'width': '100%',
  'height': '$280',
  'color': '$gray400',
  'fontAg': '18_semibold_100',

  '@tablet': {
    height: '$184',
    fontAg: '14_medium_100',
  },
});

const SModalBottom = styled('div', {
  'margin': '$24 $42 $44 $30',
  'flexType': 'verticalCenter',

  '@tablet': {
    margin: '$16 $20 $24 $20',
  },
});

const STotal = styled('p', {
  'color': '$gray400',
  'fontAg': '16_medium_100',

  '@tablet': {
    fontAg: '12_medium_100',
  },
});
