import type { GetUser } from '@api/user/type';
import { SearchField, SelectV2 } from '@sopt-makers/ui';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconSearchOutlined } from '@sopt-mds/icons';
import { ActionButton, Avatar } from '@sopt-mds/ui';
import { useState } from 'react';
import { styled } from 'stitches.config';

// TODO: 회차 목록과 참석자 검색 API 연동
const rounds = [
  { roundId: 1, roundNumber: 1 },
  { roundId: 2, roundNumber: 2 },
  { roundId: 3, roundNumber: 3 },
];
const roundOptions = rounds.map(({ roundId, roundNumber }) => ({ value: roundId, label: `${roundNumber}회차` }));

const members: GetUser = [
  { userId: 1, orgId: 1, userName: '김길동', recentGeneration: 38, recentPart: '기획' },
  { userId: 2, orgId: 2, userName: '김음메', recentGeneration: 39, recentPart: '디자인' },
  { userId: 3, orgId: 3, userName: '김개똥', recentGeneration: 39, recentPart: 'iOS' },
];

const AttendeeControls = () => {
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const matches =
    search.trim() && !selectedMember ? members.filter((member) => member.userName.includes(search.trim())) : [];

  return (
    <SControls>
      <SRoundSelect>
        <SelectV2.Root
          type='text'
          defaultValue={roundOptions[0]}
          onChange={() => {
            // @TODO: 선택한 회차를 참석자 추가 요청에 반영 (장정훈)
          }}
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

      <SSearchContainer>
        <SSearchIcon width={20} height={20} aria-hidden />
        <SSearch
          aria-label='참석자 검색'
          placeholder='참석자를 검색해보세요'
          value={search}
          onChange={(event) => {
            // @TODO: API에서 조회한 사용자 목록으로 검색 (장정훈)
            setSearch(event.target.value);
            setSelectedMember(null);
          }}
          onSubmit={() => {
            // @TODO: API 연동 시 검색 제출 동작 확인 (장정훈)
          }}
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
                onClick={() => {
                  setSearch(member.userName);
                  setSelectedMember(member.userId);
                }}
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
        onClick={() => {
          // @TODO: 참석자 추가 API 연동 (장정훈)
        }}
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
