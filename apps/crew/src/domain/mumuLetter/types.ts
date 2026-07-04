import type { paths } from '@/__generated__/schema2';

export type MumuLetterSectionData =
  paths['/post/v2/mumu/home']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type MumuFeedCardData = MumuLetterSectionData['mumuPostHomeDtos'][number];

export type MumuTextResponse =
  paths['/post/v2/mumuText']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export type MumuText = MumuTextResponse['mumuText'];
