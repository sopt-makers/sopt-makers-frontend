import { useRouter } from 'next/router';
import { createEnumParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { COFFEE_CHAT_FILTER_OPTIONS } from '@/components/coffeechat/constants';

const filterParam = (options: { value: string }[]) =>
  withDefault(createEnumParam(options.map(({ value }) => value).filter(Boolean)), '');

export const COFFEE_CHAT_QUERY_CONFIG = {
  section: filterParam(COFFEE_CHAT_FILTER_OPTIONS.section),
  topicType: filterParam(COFFEE_CHAT_FILTER_OPTIONS.topicType),
  career: filterParam(COFFEE_CHAT_FILTER_OPTIONS.career),
  part: filterParam(COFFEE_CHAT_FILTER_OPTIONS.part),
  search: withDefault(StringParam, ''),
};

export type CoffeeChatFilters = Record<keyof typeof COFFEE_CHAT_QUERY_CONFIG, string>;
export type SetCoffeeChatFilter = (key: keyof CoffeeChatFilters, value: string) => void;

const toCoffeeChatApiParams = (filters: CoffeeChatFilters): Record<string, string> => {
  const params: Record<string, string> = {};

  for (const key of Object.keys(COFFEE_CHAT_FILTER_OPTIONS) as (keyof typeof COFFEE_CHAT_FILTER_OPTIONS)[]) {
    const option = COFFEE_CHAT_FILTER_OPTIONS[key].find(({ value }) => value === filters[key]);
    if (option?.apiValue) params[key] = option.apiValue;
  }

  if (filters.search) params.search = filters.search;

  return params;
};

export const useCoffeeChatFilters = () => {
  const { isReady } = useRouter();
  const [filters, setQuery] = useQueryParams(COFFEE_CHAT_QUERY_CONFIG);

  const setFilter: SetCoffeeChatFilter = (key, value) => {
    setQuery({ [key]: value === '' || (key !== 'search' && value === '전체') ? undefined : value }, 'replaceIn');
  };

  return { filters, apiParams: toCoffeeChatApiParams(filters), setFilter, isReady };
};
