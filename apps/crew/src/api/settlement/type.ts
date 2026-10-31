import type { components, paths } from '@/__generated__/schema';

export type GetSettlementList = {
  request: NonNullable<paths['/dining/v2']['get']['parameters']['query']>;
  response: paths['/dining/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
};

export type SettlementListParams = GetSettlementList['request'] &
  Required<Pick<GetSettlementList['request'], 'tab' | 'page' | 'take'>>;

export type SettlementCardItem = components['schemas']['DiningV2DiningCardDto'];
export type SettlementListTab = NonNullable<GetSettlementList['request']['tab']>;
export type SettlementListStatus = NonNullable<GetSettlementList['request']['status']>;
export type SettlementListPart = NonNullable<GetSettlementList['request']['part']>;
export type SettlementRequest = components['schemas']['DiningV2CreateAndUpdateDiningBodyDto'];
export type SettlementRoundRequest = components['schemas']['DiningV2CreateAndUpdateRoundBodyDto'];
