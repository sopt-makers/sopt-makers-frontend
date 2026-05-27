import { SUB_CATEGORY_CODE } from '@/components/feed/constants';

export const getCategoryAndSubcategory = (categoryTag: string): [string, string | undefined] => {
  for (const [category, subCategories] of Object.entries(SUB_CATEGORY_CODE)) {
    if (subCategories.includes(categoryTag)) {
      return [category, categoryTag];
    }
  }
  return [categoryTag, undefined];
};
