import type { components, paths } from '@/__generated__/schema';

export type SettlementCardItem = components['schemas']['DiningV2DiningCardDto'];
export type SettlementListTab = NonNullable<NonNullable<paths['/dining/v2']['get']['parameters']['query']>['tab']>;
export type SettlementRequest = components['schemas']['DiningV2CreateAndUpdateDiningBodyDto'];
export type SettlementRoundRequest = components['schemas']['DiningV2CreateAndUpdateRoundBodyDto'];

export type SettlementDetailResponse = components['schemas']['DiningV2GetDiningDetailResponseDto'];

export type PostSettlement = {
  request: SettlementRequest;
  response: paths['/dining/v2']['post']['responses']['201']['content']['application/json;charset=UTF-8'];
};

export type PutSettlement = {
  request: SettlementRequest;
  response: void;
};
