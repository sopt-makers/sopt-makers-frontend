import { useRouter } from 'next/router';
import { createEnumParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import { COFFEE_CHAT_FILTER_OPTIONS } from '@/components/coffeechat/constants';

import type { CoffeeChatFilters } from './coffeeChatFilters.types';

const filterParam = (options: { value: string }[]) =>
  withDefault(createEnumParam(options.map(({ value }) => value).filter(Boolean)), '');

export const COFFEE_CHAT_QUERY_CONFIG = {
  section: filterParam(COFFEE_CHAT_FILTER_OPTIONS.section),
  topicType: filterParam(COFFEE_CHAT_FILTER_OPTIONS.topicType),
  career: filterParam(COFFEE_CHAT_FILTER_OPTIONS.career),
  part: filterParam(COFFEE_CHAT_FILTER_OPTIONS.part),
  search: withDefault(StringParam, ''),
};

export type SetCoffeeChatFilter = (key: keyof CoffeeChatFilters, value: string) => void;

export const useCoffeeChatFilters = () => {
  const { isReady } = useRouter();
  const [filters, setQuery] = useQueryParams(COFFEE_CHAT_QUERY_CONFIG);

  const setFilter: SetCoffeeChatFilter = (key, value) => {
    setQuery({ [key]: value === '' ? undefined : value }, 'replaceIn');
  };

  return { filters, setFilter, isReady };
};
