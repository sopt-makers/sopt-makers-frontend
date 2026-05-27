import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';

export default function useCategory() {
  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const findParentCategory = (categoryCode: string | null) => {
    if (!categoryCode) return undefined;
    const [parentCode] = categoryCode.split('_');
    return categoryData?.find((category) => category.code === parentCode);
  };

  const findChildrenCategory = (categoryCode: string | null) => {
    if (!categoryCode || !categoryCode.includes('_')) return null;
    const [parentCode, childCode] = categoryCode.split('_');
    const parentCategory = categoryData?.find((category) => category.code === parentCode);
    return parentCategory?.children.find((tag) => tag.code === childCode) ?? null;
  };

  return { findParentCategory, findChildrenCategory };
}
