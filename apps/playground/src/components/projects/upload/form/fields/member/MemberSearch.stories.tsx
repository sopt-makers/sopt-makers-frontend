import type { Meta } from '@storybook/react';
import { useState } from 'react';

import type { Member } from '@/components/projects/upload/form/fields/member/useMemberSearch';

import MemberSearch from './MemberSearch';

const dummyData: Member[] = [
  {
    generation: 18,
    id: '1',
    name: '이지은',
    profileImage: '',
  },
  {
    generation: 29,
    id: '2',
    name: '김예진',
    profileImage: '',
  },
  {
    generation: 14,
    id: '3',
    name: '박채원',
    profileImage: '',
  },
  {
    generation: 26,
    id: '4',
    name: '한민지',
    profileImage: '',
  },
  {
    generation: 22,
    id: '5',
    name: '조현아',
    profileImage: '',
  },
  {
    generation: 16,
    id: '6',
    name: '송예슬',
    profileImage: '',
  },
  {
    generation: 32,
    id: '7',
    name: '강서연',
    profileImage: '',
  },
  {
    generation: 12,
    id: '8',
    name: '이수진',
    profileImage: '',
  },
  {
    generation: 25,
    id: '9',
    name: '임정은',
    profileImage: '',
  },
  {
    generation: 20,
    id: '10',
    name: '박서연',
    profileImage: '',
  },
];

const dummySearchMember = async (name: string) => dummyData.filter((data) => data.name.includes(name));
const dummyGetMemberById = async (id: string) => dummyData.find((data) => data.id === id);

export default {
  component: MemberSearch,
  args: {
    searchMember: dummySearchMember,
    getMemberById: dummyGetMemberById,
  },
} as Meta<typeof MemberSearch>;

export const Default = {
  name: '기본',
};

const dummyMember = {
  generation: 18,
  id: '1',
  name: '이지은',
  profileImage: '',
};

export const WithState = () => {
  const [selectedMember, setSelectedMember] = useState<Member | undefined>();
  const onSelect = () => {
    setSelectedMember(dummyMember);
  };
  const onClear = () => {
    setSelectedMember(undefined);
  };

  return (
    <MemberSearch
      placeholder='SOPT 회원 검색'
      selectedMember={selectedMember}
      searchMember={dummySearchMember}
      getMemberById={dummyGetMemberById}
      onSelect={onSelect}
      onClear={onClear}
    />
  );
};
