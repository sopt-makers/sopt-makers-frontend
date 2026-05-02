import type { GetMeetingPartMembers } from '@api/meeting/type';
import { useUserProfileQueryOption } from '@api/user/query';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { APPROVAL_STATUS, EApprovalStatus } from '@constant/option';
import { useQuery } from '@tanstack/react-query';
import { styled } from 'stitches.config';

interface PartStatusModalContentProps {
  partMembersData: GetMeetingPartMembers['response'];
}

const PartStatusModalContent = ({ partMembersData }: PartStatusModalContentProps) => {
  const { data: me } = useQuery(useUserProfileQueryOption());
  const appliedInfo = partMembersData.appliedInfo ?? [];
  const total = partMembersData.participantCount ?? appliedInfo.length;

  return (
    <>
      {appliedInfo.length > 0 ? (
        <SListWrapper>
          <SScrollWrapper>
            <SList>
              {appliedInfo.map(({ status, applyNumber, user: { orgId, id, name, profileImage } }) => (
                <SItem key={id} isActive={me?.orgId === orgId}>
                  <div>
                    <AppliedNumberText>{applyNumber}</AppliedNumberText>
                    {profileImage ? <img src={profileImage} alt='' /> : <ProfileDefaultIcon />}
                    <span>{name}</span>
                  </div>
                  <SStatusText isApproved={status === EApprovalStatus.APPROVE}>{APPROVAL_STATUS[status]}</SStatusText>
                </SItem>
              ))}
            </SList>
          </SScrollWrapper>
        </SListWrapper>
      ) : (
        <SEmptyText>신청자가 아직 없어요.</SEmptyText>
      )}
      {appliedInfo.length > 0 && (
        <SModalBottom>
          <STotal>총 {total}명 신청</STotal>
        </SModalBottom>
      )}
    </>
  );
};

export default PartStatusModalContent;

const SListWrapper = styled('div', {
  'padding': '$24 $24 0 $24',

  '@tablet': {
    padding: '$0',
  },
});

const SScrollWrapper = styled('div', {
  'height': '$219',
  'overflowY': 'scroll',

  '@tablet': {
    height: '$160',
  },

  '&::-webkit-scrollbar': {
    width: '$6',
  },

  '&::-webkit-scrollbar-thumb': {
    height: '$125',
    background: '$gray200',
    borderRadius: '6px',
  },
});

const SList = styled('div', {
  'display': 'grid',
  'gridTemplateColumns': 'repeat(2, 1fr)',
  'gap': '$12',
  'padding': '0 $24',

  '@tablet': {
    gap: '$8',
    padding: '0 $20',
  },

  '@mobile': {
    gridTemplateColumns: '1fr',
  },
});

const SItem = styled('div', {
  'flexType': 'verticalCenter',
  'justifyContent': 'space-between',

  'width': '100%',
  'height': '$64',
  'padding': '$16 $20',

  'borderRadius': '12px',
  'backgroundColor': '$gray700',
  'color': '$gray10',

  'fontAg': '16_semibold_100',

  '@tablet': {
    height: '$48',
    padding: '$11 $12',
    fontAg: '14_medium_100',
  },

  'div': {
    flexType: 'verticalCenter',
  },

  'img': {
    'width': '$32',
    'height': '$32',
    'borderRadius': '$round',
    'objectFit': 'cover',
    'background': '$gray600',

    '@tablet': {
      width: '$26',
      height: '$26',
    },
  },

  'svg': {
    'width': '$32',
    'height': '$32',

    '@tablet': {
      width: '$26',
      height: '$26',
    },
  },

  'span': {
    'ml': '$10',
    'whiteSpace': 'nowrap',
    'overflow': 'hidden',
    'textOverflow': 'ellipsis',
    'maxWidth': '$154',

    '@tablet': {
      maxWidth: '$61',
    },
  },

  'variants': {
    isActive: {
      true: {
        border: '1px solid $gray10',
      },
      false: {
        border: 'none',
      },
    },
  },
});

const AppliedNumberText = styled('p', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '$30',
  mr: '$10',
});

const SStatusText = styled('div', {
  'ml': '$14',
  'color': '$gray500',
  'fontAg': '14_medium_100',

  'variants': {
    isApproved: {
      true: {
        color: '$success',
      },
      false: {
        color: '$gray500',
      },
    },
  },

  '@tablet': {
    ml: '$9',
    fontSize: '$10',
  },
});

const SEmptyText = styled('p', {
  'flexType': 'center',
  'width': '100%',
  'height': '$280',
  'color': '$gray400',
  'fontAg': '18_semibold_100',

  '@tablet': {
    height: '$184',
    fontAg: '14_medium_100',
  },
});

const SModalBottom = styled('div', {
  'margin': '$24 $42 $44 $30',
  'flexType': 'verticalCenter',

  '@tablet': {
    margin: '$16 $20 $24 $20',
  },
});

const STotal = styled('p', {
  'color': '$gray400',
  'fontAg': '16_medium_100',

  '@tablet': {
    fontAg: '12_medium_100',
  },
});
