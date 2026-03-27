import type { Meta, StoryObj } from '@storybook/react';

import MatchingStatus from '@/components/soulmate/view/lobby/MatchingStatus';

const meta = {
  component: MatchingStatus,
} satisfies Meta<typeof MatchingStatus>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Matched = {
  args: {
    title: '첫번째 소울메이트와 매칭되었어요',
    mission: '💬 소울메이트와 미션 수행하기',
    chatUrl: '/testurl',
  },
} satisfies Story;

export const NotMatched = {
  args: {
    title: '현재 매칭 대기중이에요',
    mission: '🔔 매칭이 완료되면 문자로 소식을 전해드릴게요!',
  },
} satisfies Story;
