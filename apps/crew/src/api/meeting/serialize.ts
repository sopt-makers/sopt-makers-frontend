import type { FormType } from '@type/form';

import type { PatchMeeting, PostMeeting } from './type';

export const serializeMeetingData = (formData: FormType, meetingDemandId?: number): PostMeeting['request'] => {
  const refinedParts = formData.detail.joinableParts
    // NOTE: value가 null, 'all' 인 것들을 필터링한다
    .filter((part) => part.value && part.value !== 'all')
    .map((part) => part.value) as ('PM' | 'DESIGN' | 'IOS' | 'ANDROID' | 'SERVER' | 'WEB')[];

  return {
    title: formData.title,
    subTitle: formData.subTitle ?? '',
    joinInfo: {
      meetingType: formData.participationMethod ?? undefined,
      meetingFrequency: formData.participationIntensity ?? undefined,
    },
    files: formData.files,
    category: formData.category.value,
    startDate: formData.dateRange[0] ?? '',
    endDate: formData.dateRange[1] ?? '',
    capacity: formData.capacity,
    desc: formData.detail.desc,
    processDesc: '',
    mStartDate: '',
    mEndDate: '',
    leaderDesc: formData.detail.leaderDesc ?? '',
    note: '',
    isMentorNeeded: formData.detail.isMentorNeeded ?? false,
    canJoinOnlyActiveGeneration: formData.detail.canJoinOnlyActiveGeneration ?? false,
    joinableParts: refinedParts,
    coLeaderUserIds: formData.detail.coLeader?.map((user) => user.userId) ?? [],
    meetingKeywordTypes: formData.meetingKeywordTypes === null ? undefined : formData.meetingKeywordTypes,
    meetingDemandId,
  };
};

export const serializeUpdateMeetingData = (formData: FormType): PatchMeeting['request'] => {
  const refinedParts = formData.detail.joinableParts
    .filter((part) => part.value && part.value !== 'all')
    .map((part) => part.value) as ('PM' | 'DESIGN' | 'IOS' | 'ANDROID' | 'SERVER' | 'WEB')[];

  return {
    title: formData.title,
    subTitle: formData.subTitle || undefined,
    joinInfo:
      formData.participationMethod == null && formData.participationIntensity == null
        ? undefined
        : {
            meetingType: formData.participationMethod ?? undefined,
            meetingFrequency: formData.participationIntensity ?? undefined,
          },
    files: formData.files,
    category: formData.category.value,
    startDate: formData.dateRange[0] ?? '',
    endDate: formData.dateRange[1] ?? '',
    capacity: formData.capacity,
    desc: formData.detail.desc,
    processDesc: '',
    mStartDate: '',
    mEndDate: '',
    leaderDesc: formData.detail.leaderDesc ?? '',
    note: '',
    isMentorNeeded: formData.detail.isMentorNeeded ?? false,
    canJoinOnlyActiveGeneration: formData.detail.canJoinOnlyActiveGeneration ?? false,
    joinableParts: refinedParts,
    coLeaderUserIds: formData.detail.coLeader?.map((user) => user.userId) ?? [],
    meetingKeywordTypes: formData.meetingKeywordTypes === null ? undefined : formData.meetingKeywordTypes,
  };
};
