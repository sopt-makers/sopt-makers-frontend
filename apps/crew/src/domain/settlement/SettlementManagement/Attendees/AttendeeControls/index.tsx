import { useAddSettlementAttendeeMutation } from '@api/settlement/mutation';
import { useSettlementDetailQueryOption } from '@api/settlement/query';
import { useUserProfileQueryOption, useUserQueryOption } from '@api/user/query';
import type { RoundType } from '@domain/settlement/types';
import { getSettlementRole } from '@domain/settlement/util';
import { SearchField, SelectV2 } from '@sopt-makers/ui';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconSearchOutlined } from '@sopt-mds/icons';
import { ActionButton, Avatar } from '@sopt-mds/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const AttendeeControls = ({ meetingId, rounds }: { meetingId: number; rounds: RoundType[] }) => {
  const { data: members = [] } = useQuery(useUserQueryOption());
  const { data: user } = useQuery(useUserProfileQueryOption());
  const { data: settlement } = useQuery(useSettlementDetailQueryOption(meetingId));
  const { mutate: addAttendee, isPending } = useAddSettlementAttendeeMutation(meetingId);
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [selectedRoundId, setSelectedRoundId] = useState<number>();
  const selectedRound = rounds.find((round) => round.roundId === selectedRoundId) ?? rounds[0];
  const roundOptions = rounds.map(({ roundId, roundNumber }) => ({ value: roundId, label: `${roundNumber}회차` }));
  const matches =
    search.trim() && selectedMember === null ? members.filter((member) => member.userName.includes(search.trim())) : [];

  const handleSelectMember = (userId: number, userName: string) => {
    setSearch(userName);
    setSelectedMember(userId);
  };

  const handleSearchSubmit = () => {
    const exactMatches = matches.filter((member) => member.userName === search.trim());
    const [exactMatch] = exactMatches;
    if (exactMatches.length === 1 && exactMatch) handleSelectMember(exactMatch.userId, exactMatch.userName);
  };

  const handleAddAttendee = () => {
    if (!selectedRound || selectedMember === null) return;

    addAttendee(
      { roundId: selectedRound.roundId, userId: selectedMember },
      {
        onSuccess: () => {
          ampli.completeAddSettlementAttendee({
            group_id: meetingId,
            settlement_role: settlement ? getSettlementRole(settlement) : undefined,
            settlement_round_id: selectedRound.roundId,
            settlement_round_no: selectedRound.roundNumber,
            user_id: user?.orgId,
          });
          setSearch('');
          setSelectedMember(null);
        },
      },
    );
  };

  return (
    <SControls>
      <SRoundSelect>
        <SelectV2.Root
          key={selectedRound?.roundId}
          type='text'
          defaultValue={roundOptions.find(({ value }) => value === selectedRound?.roundId)}
          onChange={(value) => setSelectedRoundId(value as number)}
        >
          <SelectV2.Trigger>
            <SRoundTrigger aria-label='회차 선택' />
          </SelectV2.Trigger>

          <SelectV2.Menu>
            {roundOptions.map((round) => (
              <SelectV2.MenuItem key={round.value} option={round} />
            ))}
          </SelectV2.Menu>
        </SelectV2.Root>
      </SRoundSelect>

      <SSearchContainer
        onBlurCapture={(event) => {
          const target = event.relatedTarget;
          if (
            !(target instanceof HTMLButtonElement && target.type === 'reset' && event.currentTarget.contains(target))
          ) {
            // SearchField는 포커스가 다른 요소로 이동할 때도 onReset을 호출해 검색 결과가 초기화돼요. 따라서 MDS2.0이 나오기 전까지 이렇게 구현해둘게요.
            event.stopPropagation();
          }
        }}
      >
        <SSearchIcon width={20} height={20} aria-hidden />
        <SSearch
          aria-label='참석자 검색'
          placeholder='참석자를 검색해보세요'
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setSelectedMember(null);
          }}
          onSubmit={handleSearchSubmit}
          onReset={() => {
            setSearch('');
            setSelectedMember(null);
          }}
        />
        {matches.length > 0 && (
          <SResults aria-label='참석자 검색 결과'>
            {matches.map((member) => (
              <SResult
                key={member.userId}
                type='button'
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelectMember(member.userId, member.userName)}
              >
                <Avatar size={32} src={member.profileImageUrl || undefined} strokeColor='neutralGhost' aria-hidden />
                <span>
                  <SName>{member.userName}</SName>
                  <SMemberDescription>
                    {member.recentGeneration}기 {member.recentPart}
                  </SMemberDescription>
                </span>
              </SResult>
            ))}
          </SResults>
        )}
      </SSearchContainer>

      <ActionButton
        size='medium'
        disabled={!selectedRound || selectedMember === null || isPending}
        onClick={handleAddAttendee}
      >
        추가하기
      </ActionButton>
    </SControls>
  );
};

export default AttendeeControls;

const SControls = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s12,
  '@mobile': {
    flexWrap: 'wrap',
    rowGap: spacing.s12,
    columnGap: spacing.s10,
  },
});

const SRoundSelect = styled('div', {
  'width': '160px',
  '& > div, & > div > button': {
    width: '100%',
  },
  '@mobile': {
    width: '100px',
  },
});

const SRoundTrigger = styled(SelectV2.TriggerContent, {
  '&&': {
    width: '100%',
    minWidth: 0,
    whiteSpace: 'nowrap',
  },
  '@mobile': {
    '&&': {
      paddingInline: spacing.s12,
    },
  },
});

const SSearchContainer = styled('div', {
  'position': 'relative',
  'width': '335px',
  '@mobile': {
    order: -1,
    width: '100%',
  },
});

const SSearch = styled(SearchField, {
  'display': 'flex',
  'padding': `${spacing.s10} ${spacing.s14} ${spacing.s10} calc(${spacing.s14} + 20px + ${spacing.s8})`,
  'borderRadius': radius.r10,
  'backgroundColor': colors.bg.neutral.ghost,
  '& > button': {
    top: '50%',
    bottom: 'auto',
    transform: 'translateY(-50%)',
  },
  '& > button:disabled, &:not(:focus-within) > button': {
    display: 'none',
  },
});

const SSearchIcon = styled(IconSearchOutlined, {
  position: 'absolute',
  zIndex: 1,
  top: '50%',
  left: spacing.s14,
  transform: 'translateY(-50%)',
  color: colors.fg.neutral.subtle,
  pointerEvents: 'none',
});

const SResults = styled('div', {
  position: 'absolute',
  zIndex: 1,
  top: '100%',
  width: '100%',
  marginTop: spacing.s8,
  padding: spacing.s8,
  border: `1px solid ${colors.stroke.neutral.ghost}`,
  borderRadius: radius.r12,
  backgroundColor: colors.bg.layer.basement,
});

const SResult = styled('button', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s12,
  'width': '100%',
  'padding': spacing.s8,
  'textAlign': 'left',
  'border': 0,
  'borderRadius': radius.r8,
  'background': 'transparent',
  'cursor': 'pointer',
  '&:hover, &:focus-visible': {
    backgroundColor: colors.bg.neutral.subtle,
  },
});

const SName = styled('span', {
  ...typography.label2,
  display: 'block',
  color: colors.fg.neutral.bold,
});

const SMemberDescription = styled('span', {
  ...typography.label3,
  display: 'block',
  color: colors.fg.neutral.subtle,
});
