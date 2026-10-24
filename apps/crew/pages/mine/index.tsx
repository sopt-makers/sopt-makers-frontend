import MeetingListOfApplied from '@domain/list/Meeting/MeetingListOfApplied';
import MeetingListOfMine from '@domain/list/Meeting/MeetingListOfMine';
import { Tab } from '@headlessui/react';
import useSessionStorage from '@hook/useSessionStorage';
import CrewTab from '@shared/CrewTab';
import KakaoFloatingButton from '@shared/FloatingButton/kakaoFloatingButton/KakaoFloatingButton';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import type { NextPage } from 'next';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const enum MeetingType {
  APPLIED,
  MADE,
}

const MinePage: NextPage = () => {
  const [selectedMeetingType, setSelectedMeetingType] = useSessionStorage<MeetingType>(
    'meetingType',
    MeetingType.APPLIED,
  );

  return (
    <SMineLayout>
      <CrewTab />
      <Tab.Group selectedIndex={Number(selectedMeetingType)} onChange={setSelectedMeetingType}>
        <STabList>
          <Tab
            as={SViewButton}
            type='button'
            size='large'
            variant='secondary'
            onClick={() => ampli.clickRegisteredGroup()}
          >
            내가 신청한 모임
          </Tab>
          <Tab
            as={SViewButton}
            type='button'
            size='large'
            variant='secondary'
            onClick={() => ampli.clickMakebymeGroup()}
          >
            내가 만든 모임
          </Tab>
        </STabList>

        <Tab.Panels>
          <Tab.Panel>
            <MeetingListOfApplied />
          </Tab.Panel>

          <Tab.Panel>
            <MeetingListOfMine />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div style={{ position: 'fixed', bottom: '2%', right: '5%' }}>
        <KakaoFloatingButton />
      </div>
    </SMineLayout>
  );
};

export default MinePage;

const SMineLayout = styled('div', {
  'width': '100%',

  '@tablet': {
    width: '734px',
    mx: '$auto',
  },

  '@mobile': {
    width: '100%',
  },
});

const STabList = styled(Tab.List, {
  'flexType': 'center',
  'gap': spacing.s8,
  'marginTop': '126px',
  'paddingBottom': '64px',
  '@mobile': {
    marginTop: '48px',
    paddingBottom: '24px',
  },
});

const SViewButton = styled(ActionButton, {
  '&&': {
    paddingInline: spacing.s20,
    backgroundColor: colors.bg.layer.basement,
    color: colors.fg.neutral.subtle,
  },
  '&&[aria-selected=true]': {
    backgroundColor: colors.bg.neutral.subtle,
    color: colors.fg.neutral.bold,
  },
  '&&:disabled': {
    backgroundColor: colors.bg.layer.basement,
    color: colors.fg.neutral.subtle,
  },
  '@mobile': {
    '&&': { ...typography.label3, height: 38, padding: `${spacing.s10} ${spacing.s12}`, borderRadius: radius.r8 },
  },
});
