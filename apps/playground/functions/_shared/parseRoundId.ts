export const parseRoundId = (value: unknown): number | null => {
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const roundId = Number(value);
  return Number.isSafeInteger(roundId) ? roundId : null;
};
