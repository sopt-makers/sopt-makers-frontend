import type { Meta } from '@storybook/react';
import { useState } from 'react';

import ProjectCategorySelect from './ProjectCategorySelect';

const meta = {
  component: ProjectCategorySelect,
} satisfies Meta<typeof ProjectCategorySelect>;
export default meta;

type ProjectCategory = 'APPJAM' | 'SOPKATHON' | 'SOPTERM' | 'STUDY' | 'ETC';

const PROJECT_CATEGORY_LIST: Array<{ value: ProjectCategory; label: string }> = [
  { value: 'APPJAM', label: '앱잼' },
  { value: 'SOPKATHON', label: '솝커톤' },
  { value: 'SOPTERM', label: '솝텀 프로젝트' },
  { value: 'STUDY', label: '스터디' },
  { value: 'ETC', label: '사이드 프로젝트' },
];

export const 기본 = () => {
  return <ProjectCategorySelect placeholder='프로젝트 전체' option={PROJECT_CATEGORY_LIST} />;
};

export const Controlled예시 = () => {
  const [value, onValueChange] = useState<ProjectCategory | undefined>();

  return (
    <ProjectCategorySelect
      placeholder='프로젝트 전체'
      value={value}
      onValueChange={(value) => onValueChange(value as ProjectCategory)}
      allowClear
      onClear={() => onValueChange(undefined)}
      option={PROJECT_CATEGORY_LIST}
    />
  );
};
