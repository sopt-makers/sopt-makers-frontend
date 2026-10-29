import type { SettlementRequest, SettlementRoundRequest } from '@api/settlement/type';
import { PART_VALUES } from '@constant/option';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { z } from 'zod';

dayjs.extend(customParseFormat);

export type RoundFieldValues = Required<SettlementRoundRequest>;
export type SettlementFormValues = Required<SettlementRequest>;

const mapLinkSchema = (hosts: readonly string[]) =>
  z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return true;
      try {
        const url = new URL(value);
        return url.protocol === 'https:' && hosts.includes(url.hostname) && !url.username && !url.password;
      } catch {
        return false;
      }
    }, '올바른 지도 링크를 입력해주세요.');

const roundFieldsSchema = z.object({
  place: z.string().trim().max(30, '30자까지 입력할 수 있어요.'),
  naverMapLink: mapLinkSchema(['naver.me', 'map.naver.com', 'm.map.naver.com']),
  kakaoMapLink: mapLinkSchema(['kko.to', 'map.kakao.com', 'place.map.kakao.com']),
  startTime: z.string().refine((value) => !value || /^([01]\d|2[0-3]):[0-5]\d$/.test(value), {
    message: '올바른 시간을 입력해주세요. (00:00~23:59)',
  }),
}) satisfies z.ZodType<RoundFieldValues>;

export const settlementFormSchema = roundFieldsSchema.extend({
  title: z.string().trim().min(1, '회식명을 입력해주세요.').max(30, '30자까지 입력할 수 있어요.'),
  diningDate: z.string().superRefine((value, context) => {
    const date = dayjs(value, 'YYYY.MM.DD', true);
    if (!date.isValid()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: '올바른 회식 일자를 입력해주세요.',
      });
    } else if (date.isBefore(dayjs(), 'day')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: '오늘 이후의 날짜를 선택해주세요.',
      });
    }
  }),
  joinableParts: z.array(z.enum(PART_VALUES)).min(1, '참여 파트를 선택해주세요.'),
  files: z.array(z.string().url()).max(1, '대표 이미지는 1장만 등록할 수 있어요.'),
}) satisfies z.ZodType<SettlementFormValues>;
