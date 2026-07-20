import styled from '@emotion/styled';
import type { FC } from 'react';
import type { Control, FormState } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import type { FormProgressItem } from '@/components/common/form/FormProgress';
import FormProgress from '@/components/common/form/FormProgress';
import type { ProjectFormType } from '@/components/projects/upload/form/schema';
import { dateStringSchema } from '@/components/projects/upload/form/schema';

interface UploadProjectProgressProps {
  formState: FormState<ProjectFormType>;
  control: Control<ProjectFormType>;
}

const UploadProjectProgress: FC<UploadProjectProgressProps> = ({ formState, control }) => {
  const { dirtyFields } = formState;

  const [members, serviceType, period] = useWatch({ control, name: ['members', 'serviceType', 'period'] });
  const isMemberFilled = Boolean(members?.[0]?.memberId && members?.[0]?.memberRole);
  const isPeriodFilled =
    dateStringSchema.safeParse(period?.startAt).success &&
    (period?.endAt === null || dateStringSchema.safeParse(period?.endAt).success);

  const items: FormProgressItem[] = [
    { title: '프로젝트 이름', active: dirtyFields.name, required: true },
    {
      title: '기수',
      active: dirtyFields.generation,
      required: true,
    },
    {
      title: '어디서 진행했나요?',
      active: dirtyFields.category,
      required: true,
    },
    {
      title: '팀원',
      active: isMemberFilled,
      required: true,
    },
    {
      title: '서비스 형태',
      active: Boolean(serviceType?.length),
      required: true,
    },
    {
      title: '프로젝트 기간',
      active: isPeriodFilled,
      required: true,
    },
    {
      title: '프로젝트 한줄 소개',
      active: dirtyFields.summary,
      required: true,
    },
    { title: '프로젝트 설명', active: dirtyFields.detail, required: true },
    { title: '로고 이미지', active: dirtyFields.logoImage, required: true },
    {
      title: '썸네일 이미지',
      active: dirtyFields.thumbnailImage,
      required: true,
    },
    {
      title: '프로젝트 이미지',
      active: dirtyFields.projectImages?.some((image) => Boolean(image) && image.imageUrl !== false),
      required: true,
    },
  ];

  return <StyledFormProgress title='등록 진행' items={items} />;
};

export default UploadProjectProgress;

const StyledFormProgress = styled(FormProgress)``;
