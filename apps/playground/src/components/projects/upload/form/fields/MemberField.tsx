import styled from '@emotion/styled';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { IconTrashOutlined } from '@sopt-mds/icons';
import { isEmpty } from 'lodash-es';
import { useMemo, useState } from 'react';

import { getMembersSearchByName } from '@/api/endpoint/members/getMembersSearchByName';
import { getMemberById } from '@/api/endpoint_LEGACY/members';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Select from '@/components/common/Select';
import { MemberRoleInfo } from '@/components/projects/constants';
import MemberSearch from '@/components/projects/upload/form/fields/member/MemberSearch';
import type { Member } from '@/components/projects/upload/form/fields/member/useMemberSearch';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type Value = {
  memberId: string;
  memberRole: string;
};

type ErrorMessage = {
  memberId?: string;
  memberRole?: string;
};

interface MemberFieldProps {
  value: Value;
  onChange: (value: Value) => void;
  onRemove: () => void;
  errorMessage?: ErrorMessage;
}

const MemberField = ({ value, errorMessage, onChange, onRemove }: MemberFieldProps) => {
  const [selectedMember, setSelcetedMember] = useState<Member | undefined>();
  const isError = useMemo(() => !isEmpty(errorMessage), [errorMessage]);

  const searchMember = async (name: string) => {
    const members = await getMembersSearchByName.request(name);
    return members.map((member) => ({
      id: String(member.id),
      name: member.name,
      generation: member.generation,
      profileImage: member.profileImage,
    }));
  };

  const fetchMemberById = async (id: string) => {
    const member = await getMemberById(Number(id));
    const defaultMember = {
      id: String(member.id),
      name: member.name,
      generation: member.generation,
      profileImage: member.profileImage,
    };
    setSelcetedMember(defaultMember);
    return defaultMember;
  };

  const onSelectMember = (member: Member) => {
    onChange({
      ...value,
      memberId: member.id,
    });
    setSelcetedMember(member);
  };

  const onClearMember = () => {
    onChange({
      ...value,
      memberId: '',
    });
    setSelcetedMember(undefined);
  };

  return (
    <StyledMemberEditView>
      <StyledFormContainer isError={isError}>
        <StyledFormWrapper>
          {/* @TODO: sopt-mds/ui의 SearchFieid 컴포넌트로 교체 예정*/}
          <MemberSearch
            isError={!!errorMessage?.memberId}
            selectedMember={selectedMember}
            placeholder='SOPT 회원 검색'
            memberId={value.memberId}
            searchMember={searchMember}
            getMemberById={fetchMemberById}
            onSelect={onSelectMember}
            onClear={onClearMember}
          />
          {errorMessage?.memberId && <ErrorMessage message={errorMessage?.memberId} />}
        </StyledFormWrapper>
        <StyledSelectWrapper>
          <StyledSelect
            width='100%'
            hasValue={!!value.memberRole}
            error={!!errorMessage?.memberRole}
            placeholder='역할'
            value={value.memberRole ?? ''}
            onChange={(e) => onChange({ ...value, memberRole: e.target.value })}
          >
            {Object.entries(MemberRoleInfo).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </StyledSelect>
          {errorMessage?.memberRole && <ErrorMessage message={errorMessage?.memberRole} />}
        </StyledSelectWrapper>
      </StyledFormContainer>

      <IconDeleteWrapper>
        <IconTrashOutlined width={24} height={24} color={colors.fg.neutral.ghost} onClick={onRemove} />
      </IconDeleteWrapper>
    </StyledMemberEditView>
  );
};

export default MemberField;

const StyledMemberEditView = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.s20};
  border-radius: ${radius.r8};
  background-color: ${colors.bg.layer.default};
  padding: ${spacing.s12};
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: ${spacing.s12};
    border-radius: ${radius.r10};
  }
`;

const StyledFormContainer = styled.div<{ isError: boolean }>`
  display: flex;
  gap: ${spacing.s8};
  width: 100%;
  align-items: ${({ isError }) => (isError ? 'flex-start' : 'center')};
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: ${spacing.s4};
  }
`;

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s10};
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledSelectWrapper = styled(StyledFormWrapper)`
  flex: 1;
`;

const IconDeleteWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: auto;
    height: auto;
  }
`;

const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'hasValue',
})<{ hasValue: boolean }>`
  flex: 1;
  color: ${({ hasValue }) => (hasValue ? colors.fg.neutral.default : colors.fg.neutral.ghost)};
  cursor: pointer;
`;
