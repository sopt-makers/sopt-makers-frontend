import type { components, paths } from '@/__generated__/schema';

export type SettlementCardItem = components['schemas']['DiningV2DiningCardDto'];
export type SettlementListTab = NonNullable<NonNullable<paths['/dining/v2']['get']['parameters']['query']>['tab']>;
