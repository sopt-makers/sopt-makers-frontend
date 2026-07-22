export const LATEST_GENERATION = 38; // TODO: 자동 갱신 로직 추가 고려
export const LATEST_GENERATION_NAME = `LET'S SOPT`; // TODO: 자동 갱신 로직 추가 고려

export const GENERATIONS = Array.from({ length: LATEST_GENERATION }, (_, i) => (i + 1).toString()).reverse();

export const LAST_EDITABLE_GENERATION = 30;
