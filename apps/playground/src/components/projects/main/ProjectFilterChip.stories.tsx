import type { Meta } from '@storybook/react';
import { StoryObj } from '@storybook/react';
import { useState } from 'react';

import ProjectFilterChip from './ProjectFilterChip';

const meta = {
  component: ProjectFilterChip,
} satisfies Meta<typeof ProjectFilterChip>;
export default meta;

export const Default = () => {
  const [checked, onChange] = useState<boolean>(false);
  return (
    <ProjectFilterChip checked={checked} onCheckedChange={onChange}>
      창업 중
    </ProjectFilterChip>
  );
};
Default.storyName = '기본';
