export const TIME_PERIODS = ['AM', 'PM'] as const;

export type TimePeriod = (typeof TIME_PERIODS)[number];

export const START_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export const formatStartTimeInput = (value: string): string => {
  const input = value.replace(/[^\d:]/g, '');

  if (input.includes(':')) return input.slice(0, 5);

  const digits = input.slice(0, 4);
  const hourLength = digits.length === 3 && Number(digits.slice(0, 2)) > 24 ? 1 : 2;

  return digits.length > 2 ? `${digits.slice(0, hourLength)}:${digits.slice(hourLength)}` : digits;
};

export const normalizeStartTime = (value: string): string => {
  const input = value.trim();
  const formattedInput = /^\d{3,4}$/.test(input) ? formatStartTimeInput(input) : input;
  const match = /^(\d{1,2})(?::(\d{1,2}))?$/.exec(formattedInput);

  if (!match) return value;

  const hour = Number(match[1]);
  const minute = Number(match[2] ?? '00');

  if (hour > 24 || minute > 59) return value;

  return `${String(hour === 24 ? 0 : hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

export const to24HourStartTime = (value: string, period: TimePeriod): string => {
  const time = normalizeStartTime(value);

  if (!START_TIME_PATTERN.test(time)) return time;

  const hour = Number(time.slice(0, 2));

  if (hour === 0 || hour > 12) return time;

  const hour24 = (hour % 12) + (period === 'PM' ? 12 : 0);
  return `${String(hour24).padStart(2, '0')}${time.slice(2)}`;
};

export const getStartTimeDisplay = (value: string, fallbackPeriod: TimePeriod = 'AM') => {
  const time = normalizeStartTime(value);

  if (!START_TIME_PATTERN.test(time)) return { time: value, period: fallbackPeriod };

  const hour = Number(time.slice(0, 2));
  const period: TimePeriod = hour < 12 ? 'AM' : 'PM';

  return { time: `${String(hour % 12 || 12).padStart(2, '0')}${time.slice(2)}`, period };
};
