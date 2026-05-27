import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const baseCategory = z.object({
  code: z.string(),
  name: z.string(),
  content: z.string().nullable(),
  hasBlind: z.boolean(),
});

type Category = z.infer<typeof baseCategory> & {
  children: Category[];
};

const categorySchema: z.ZodType<Category> = baseCategory.extend({
  children: z.lazy(() => z.array(categorySchema)),
});

export type categoryType = z.infer<typeof categorySchema>;

export const getCategory = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/community/category',
  },
  serverResponseScheme: z.array(categorySchema),
});

export const useGetCategory = () => {
  return useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: () => getCategory.request(),
  });
};
