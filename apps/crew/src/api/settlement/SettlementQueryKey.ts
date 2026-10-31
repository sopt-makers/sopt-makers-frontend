import type { GetSettlementList } from './type';

const SettlementQueryKey = {
  all: () => ['settlement'] as const,
  list: (params: GetSettlementList['request']) => [...SettlementQueryKey.all(), 'list', params] as const,
};

export default SettlementQueryKey;
