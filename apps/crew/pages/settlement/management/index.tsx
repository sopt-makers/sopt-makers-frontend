import { useSettlementDetailQueryOption } from '@api/settlement/query';
import { useUserProfileQueryOption } from '@api/user/query';
import Attendees from '@domain/settlement/SettlementManagement/Attendees';
import Info from '@domain/settlement/SettlementManagement/Info';
import PayerRequests from '@domain/settlement/SettlementManagement/PayerRequests';
import { getSettlementRole } from '@domain/settlement/util';
import CrewTab from '@shared/CrewTab';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { ampli } from '@/ampli';

const SettlementManagementPage = () => {
  const { query, isReady } = useRouter();

  const meetingId = Number(query.id);
  const isValidId = typeof query.id === 'string' && Number.isSafeInteger(meetingId) && meetingId > 0;
  const { data: user } = useQuery(useUserProfileQueryOption());
  const { data: settlement } = useQuery({
    ...useSettlementDetailQueryOption(meetingId),
    enabled: isReady && isValidId,
  });
  const trackedMeetingId = useRef<number>();

  useEffect(
    function trackSettlementManagementView() {
      if (!settlement || user?.orgId === undefined) return;
      if (trackedMeetingId.current === settlement.meetingId) return;

      ampli.viewSettlementManagement({
        group_id: settlement.meetingId,
        settlement_role: getSettlementRole(settlement),
        user_id: user.orgId,
      });
      trackedMeetingId.current = settlement.meetingId;
    },
    [settlement, user?.orgId],
  );

  if (!isReady) return null;

  if (!isValidId) return <ErrorPage statusCode={404} />;

  return (
    <>
      <CrewTab />
      <Info meetingId={meetingId} />
      <PayerRequests meetingId={meetingId} />
      <Attendees meetingId={meetingId} />
    </>
  );
};

export default SettlementManagementPage;
