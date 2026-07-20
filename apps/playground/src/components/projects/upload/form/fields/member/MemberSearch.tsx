import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { colorBg, colorFg, colorStroke, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconSearchOutlined } from '@sopt-mds/icons';
import { Command } from 'cmdk';

import Text from '@/components/common/Text';
import type { Member } from '@/components/projects/upload/form/fields/member/useMemberSearch';
import { useMemberSearch } from '@/components/projects/upload/form/fields/member/useMemberSearch';
import IconClear from '@/public/icons/icon-member-search-clear.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

const getProfileImage = (profileImage: Member['profileImage']) => {
  if (profileImage === null || profileImage === '') {
    return '/icons/icon-member-search-default.svg';
  }
  return profileImage;
};

interface MemberSearchProps {
  className?: string;
  isError?: boolean;
  placeholder?: string;
  selectedMember?: Member;
  memberId?: string;
  searchMember: (name: string) => Promise<Member[]>;
  getMemberById: (id: string) => Promise<Member | undefined>;
  onSelect: (member: Member) => void;
  onClear: () => void;
}

const MemberSearch = ({
  className,
  placeholder,
  selectedMember: selectedMemberProp,
  isError,
  memberId,
  searchMember,
  getMemberById,
  onSelect,
  onClear,
}: MemberSearchProps) => {
  const { name, onValueChange, onValueClear, searchedMemberList, defaultValue } = useMemberSearch({
    memberId,
    searchMember,
    getMemberById,
  });
  const selectedMember = selectedMemberProp ?? defaultValue;

  const handleSelect = (member: Member) => {
    onSelect(member);
    onValueClear();
  };

  const handleClear = () => {
    onClear();
    onValueClear();
  };

  return (
    <StyledSearch className={className} shouldFilter={false} isError={isError}>
      <StyledIconSearchOutlined />
      {selectedMember != undefined ? (
        <StyledLabel>
          <p>{selectedMember.name}</p>
          <StyledIconClear onClick={handleClear} alt='검색된 멤버 제거 아이콘' />
        </StyledLabel>
      ) : (
        <StyledInput placeholder={!selectedMember ? placeholder : ''} value={name} onValueChange={onValueChange} />
      )}

      {searchedMemberList && searchedMemberList.length > 0 && (
        <StyledList>
          {searchedMemberList.map((member) => (
            <StyledItem
              key={member.id}
              value={String(member.id)}
              onSelect={() => {
                handleSelect(member);
              }}
            >
              <MemberInfo>
                <ProfileImage src={getProfileImage(member.profileImage)} alt={`${member.name}-profileImage`} />
                <Text color={colors.gray400}>{member.name}</Text>
              </MemberInfo>
              <Text>{`${member.generation}기`}</Text>
            </StyledItem>
          ))}
        </StyledList>
      )}
    </StyledSearch>
  );
};

export default MemberSearch;

const StyledSearch = styled(Command)<{ isError?: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  gap: ${spacing.s8};
  padding: ${spacing.s10};
  border-radius: ${radius.r10};
  width: 220px;
  height: 46px;

  ${typography.body1};
  background: ${colorBg.neutral.ghost};
  color: ${colorFg.neutral.ghost};

  ${({ isError }) =>
    isError &&
    css`
      border: 1px solid ${colorStroke.danger.default};
      &:focus {
        border-color: ${colorStroke.danger.default};
      }
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledInput = styled(Command.Input)`
  min-width: 0;
  width: 100%;
  transition: all 0.2s;

  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
  ${typography.body1};
  color: ${colorFg.neutral.default};
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const StyledIconSearchOutlined = styled(IconSearchOutlined)`
  width: 20px;
  height: 20px;
  color: ${colorFg.neutral.default};
  flex-shrink: 0;
`;

const StyledIconClear = styled(IconClear)`
  transition: opacity 0.1s linear;
  opacity: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const StyledList = styled(Command.List)`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: ${spacing.s8};
  border-radius: ${radius.r6};
  background: ${colorBg.neutral.ghost};
  padding: 8px 0;
  width: 100%;
  top: 66px;
  left: 0;
  z-index: ${zIndex.드롭다운};
  @media ${MOBILE_MEDIA_QUERY} {
    top: 49px;
  }
`;

const StyledItem = styled(Command.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colorBg.neutral.ghost};
  cursor: pointer;
  padding: 10px 16px;
  width: 100%;
  color: ${colors.gray600};
  &:hover {
    background-color: ${colors.gray600};
  }
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  display: flex;
  gap: ${spacing.s4};
  align-items: center;
`;
