import type { ComponentMeta, ComponentStory } from '@storybook/react';

import PopularCard from './index';

export default {
  component: PopularCard,
  title: 'Components/Feed/PopularCard',
} as ComponentMeta<typeof PopularCard>;

const Template: ComponentStory<typeof PopularCard> = (args) => <PopularCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  rank: 1,
  card: {
    id: 1,
    categoryTagLabel: '자유',
    categoryTag: 'FREE',
    title: '여기는 제목입니다',
    hits: 5,
    likeCount: 15,
    commentCount: 3,
    member: {
      id: 1,
      profileImage: 'null',
      name: '김솝트',
    },
  },
};

export const WithProfile = Template.bind({});
WithProfile.args = {
  rank: 2,
  isProfile: true,
  card: {
    id: 2,
    categoryTagLabel: '자유',
    categoryTag: 'FREE',
    title: '프로필 정보가 표시되는 카드입니다',
    likeCount: 15,
    commentCount: 3,
    hits: 5,
    member: {
      id: 2,
      profileImage: 'https://avatars.githubusercontent.com/u/90364711?v=4',
      name: '이솝트',
    },
  },
};

export const WithoutProfileImage = Template.bind({});
WithoutProfileImage.args = {
  rank: 3,
  isProfile: true,
  card: {
    id: 3,
    categoryTagLabel: '자유',
    categoryTag: 'FREE',
    title: '프로필 정보가 표시되지 않는 카드입니다',
    likeCount: 25,
    commentCount: 10,
    hits: 5,
    member: {
      id: 3,
      profileImage: null,
      name: '박솝트',
    },
  },
};
