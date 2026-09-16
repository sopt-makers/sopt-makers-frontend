export const LATEST_GENERATION = 39; // TODO: 자동 갱신 로직 추가 고려
export const LATEST_GENERATION_NAME = `PLAY SOPT`; // TODO: 자동 갱신 로직 추가 고려

export const GENERATIONS = Array.from({ length: LATEST_GENERATION }, (_, i) => (i + 1).toString()).reverse();

export const LAST_EDITABLE_GENERATION = 30;
