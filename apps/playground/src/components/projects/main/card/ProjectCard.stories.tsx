import type { Meta, StoryObj } from '@storybook/react';

import type { Project } from '@/api/endpoint/projects/getProjects';

import ProjectCard from './ProjectCard';

const meta = {
  component: ProjectCard,
} satisfies Meta<typeof ProjectCard>;
export default meta;

type Story = StoryObj<typeof meta>;

const 프로젝트_이미지 = {
  타투어:
    'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/392e5423-06b0-4b50-ac39-6cd51449536a',
};

const 프로젝트: Project = {
  id: 1,
  name: 'TATTOUR (타투어)',
  generation: 37,
  category: 'SOPKATHON',
  serviceType: ['APP', 'WEB'],
  isAvailable: false,
  isFounding: false,
  summary:
    '후회없는 선택의 여정을 함께, 커스텀 타투 체험 서비스 TATTOUR\n 후회없는 선택의 여정을 함께, 커스텀 타투 체험 서비스 TATTOUR 후회없는 선택의 여정을 함께, 커스텀 타투 체험 서비스 TATTOUR \n후회없는 선택의 여정을 함께, 커스텀 타투 체험 서비스 TATTOUR',
  detail: '',
  logoImage: 프로젝트_이미지.타투어,
  thumbnailImage: 프로젝트_이미지.타투어,
  links: [],
};

export const Default = {
  args: {
    project: 프로젝트,
  },
} satisfies Story;

export const 창업_및_이용가능 = {
  args: {
    project: {
      ...프로젝트,
      isAvailable: true,
      isFounding: true,
    },
  },
} satisfies Story;

export const 링크_있음 = {
  args: {
    project: {
      ...프로젝트,
      links: [
        { linkId: 1, linkTitle: 'website', linkUrl: 'https://sopt.org' },
        { linkId: 2, linkTitle: 'github', linkUrl: 'https://github.com/sopt-makers' },
      ],
    },
  },
} satisfies Story;
