import type { Meta } from '@storybook/react';

import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';

export default {
  component: CategoryHeader,
} as Meta<typeof CategoryHeader>;

export const Default = {
  args: {
    feedData: {
      categoryCode: null,
      title: '',
      content: '',
      isBlindWriter: false,
      images: [],
    },
    openCategory: () => {
      //
    },
    openTag: () => {
      //
    },
  },
  name: '카테고리 헤더',
};
