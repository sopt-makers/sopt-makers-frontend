import { useSettlementDetailQueryOption } from '@api/settlement/query';
import { useUserProfileQueryOption } from '@api/user/query';
import Loader from '@common/loader/Loader';
import { SETTLEMENT_STATUS_LABELS } from '@domain/settlement/constant';
import SettlementList from '@domain/settlement/detail/SettlementList';
import Info from '@domain/settlement/Info';
import { getSettlementRole } from '@domain/settlement/util';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { ampli } from '@/ampli';

const SettlementDetailPage = () => {
  const { query, isReady } = useRouter();
  const meetingId = Number(query.id);
  const isValidId = typeof query.id === 'string' && Number.isSafeInteger(meetingId) && meetingId > 0;
  const { data: user } = useQuery(useUserProfileQueryOption());
  const trackedMeetingId = useRef<number>();

  // @TODO: 라우터 단 ErrorBoundary와 Suspense 적용하도록 리펙토링 하기 (장정훈)
  const {
    data: settlement,
    error,
    isPending,
  } = useQuery({
    ...useSettlementDetailQueryOption(meetingId),
    enabled: isReady && isValidId,
  });

  useEffect(
    function trackSettlementDetailView() {
      if (!settlement || user?.orgId === undefined) return;
      if (trackedMeetingId.current === settlement.meetingId) return;

      ampli.viewSettlementDetail({
        group_id: settlement.meetingId,
        settlement_role: getSettlementRole(settlement),
        settlement_status: settlement.isEnded ? SETTLEMENT_STATUS_LABELS.ended : SETTLEMENT_STATUS_LABELS.ongoing,
        user_id: user.orgId,
      });
      trackedMeetingId.current = settlement.meetingId;
    },
    [settlement, user?.orgId],
  );

  if (!isReady) return null;
  if (!isValidId) return <ErrorPage statusCode={404} />;
  if (isPending) return <Loader />;
  if (isAxiosError(error) && error.response?.status === 404) return <ErrorPage statusCode={404} />;
  if (!settlement) return <ErrorPage statusCode={500} />;

  return (
    <>
      <Info settlement={settlement} />
      <SettlementList
        meetingId={settlement.meetingId}
        rounds={settlement.rounds}
        isLeader={settlement.isLeader}
        isApprovedPayer={settlement.isApprovedPayer}
        isEnded={settlement.isEnded}
        isSettlementInfoModified={settlement.isDateModified || settlement.isJoinablePartsModified}
      />
    </>
  );
};

export default SettlementDetailPage;
