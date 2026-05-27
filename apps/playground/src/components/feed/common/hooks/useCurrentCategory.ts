import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';

export function useCategoryInfo(categoryCode: string | undefined) {
  const { data: categoryInfo } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
    enabled: categoryCode != null,
    select: (categories) => {
      if (!categoryCode) return undefined;
      const [parentCode, childCode] = categoryCode.split('_');
      const category = categories.find((c) => c.code === parentCode);
      const tag = childCode ? category?.children.find((t) => t.code === childCode) : null;
      return { category, tag } as const;
    },
  });

  return categoryInfo;
}
