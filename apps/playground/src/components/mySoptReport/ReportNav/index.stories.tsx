import type { Meta } from '@storybook/react';

import ReportNav from '@/components/mySoptReport/ReportNav';

export default {
  component: ReportNav,
} as Meta<typeof ReportNav>;

export const Default = {
  render: function Rendered() {
    return <ReportNav activeTab={'sopt'} handleSetActive={() => {}} />;
  },

  args: {},
  name: '기본',
};
