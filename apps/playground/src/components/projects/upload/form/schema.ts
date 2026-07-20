import type { DefaultValues } from 'react-hook-form';
import * as z from 'zod';

import { DEFAULT_LINK, DEFAULT_MEMBER } from '@/components/projects/upload/form/constants';

export const dateStringSchema = z.string().regex(/^\d{4}.(0[1-9]|1[0-2])/g, '날짜 형식에 맞게 입력해주세요.');

export const uploadSchema = z.object({
  name: z.string().min(1, '프로젝트 이름을 입력해주세요.'),
  generation: z.string().min(1, '기수를 입력해주세요.').nullable(),
  period: z.object({
    startAt: dateStringSchema,
    endAt: dateStringSchema.nullable(),
  }),
  category: z.string({
    required_error: '프로젝트를 어디서 진행했는지 선택해주세요.',
  }),
  members: z
    .array(
      z.object({
        memberId: z
          .string({
            required_error: '유저를 선택해주세요.',
          })
          .min(1, '유저를 선택해주세요.'),
        memberRole: z.string().min(1, '역할을 선택해주세요.'),
      }),
    )
    .min(1, '프로젝트를 멤버를 추가해주세요.'),
  releaseMembers: z
    .array(
      z.object({
        memberId: z.string(),
        memberRole: z.string(),
      }),
    )
    .superRefine((members, ctx) => {
      members.forEach((member, index) => {
        const isEmpty = member.memberId === '' && member.memberRole === '';
        if (isEmpty) return;

        if (member.memberId === '') {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: [index, 'memberId'], message: '유저를 선택해주세요.' });
        }
        if (member.memberRole === '') {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: [index, 'memberRole'], message: '역할을 선택해주세요.' });
        }
      });
    })
    .transform((members) => members.filter((member) => member.memberId !== '' || member.memberRole !== '')),
  summary: z.string().min(1, '프로젝트 한줄 소개를 입력해주세요.'),
  detail: z.string().min(1, '프로젝트 설명을 입력해주세요.'),
  status: z.object({
    isAvailable: z.boolean(),
    isFounding: z.boolean(),
  }),
  serviceType: z.array(z.string()).nonempty('서비스 형태를 선택해주세요.'),
  logoImage: z.string().min(1, '로고 이미지를 업로드해주세요.'),
  thumbnailImage: z.string().min(1, '썸네일 이미지를 업로드해주세요.'),
  projectImages: z
    .array(
      z.object({
        imageUrl: z.string(),
      }),
    )
    .refine((images) => {
      const firstImage = images[0];
      if (firstImage.imageUrl === '') {
        return false;
      }
      return true;
    }, '프로젝트 이미지를 업로드해주세요.'),
  links: z
    .array(
      z.object({
        linkTitle: z.string(),
        linkUrl: z.string(),
      }),
    )
    .superRefine((links, ctx) => {
      links.forEach((link, index) => {
        if (link.linkUrl === '') return;

        if (!z.string().url().safeParse(link.linkUrl).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [index, 'linkUrl'],
            message: '올바른 링크를 입력해주세요.',
          });
        }
      });
    })
    .transform((links) => links.filter((link) => link.linkUrl !== '')),
});

export type ProjectFormType = z.infer<typeof uploadSchema>;

export const defaultUploadValues: DefaultValues<ProjectFormType> = {
  name: '',
  generation: '',
  period: {
    startAt: '',
    endAt: '',
  },
  category: undefined,
  members: [DEFAULT_MEMBER],
  releaseMembers: [DEFAULT_MEMBER],
  detail: '',
  summary: '',
  status: {
    isAvailable: false,
    isFounding: false,
  },
  serviceType: [],
  logoImage: '',
  thumbnailImage: '',
  projectImages: [
    {
      imageUrl: '',
    },
  ],
  links: [DEFAULT_LINK],
};
