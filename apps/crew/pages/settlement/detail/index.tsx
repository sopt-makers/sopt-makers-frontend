import { useSettlementDetailQueryOption } from '@api/settlement/query';
import Loader from '@common/loader/Loader';
import SettlementList from '@domain/settlement/detail/SettlementList';
import Info from '@domain/settlement/Info';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

const SettlementDetailPage = () => {
  const { query, isReady } = useRouter();
  const meetingId = Number(query.id);
  const isValidId = typeof query.id === 'string' && Number.isSafeInteger(meetingId) && meetingId > 0;

  // @TODO: 라우터 단 ErrorBoundary와 Suspense 적용하도록 리펙토링 하기 (장정훈)
  const {
    data: settlement,
    error,
    isPending,
  } = useQuery({
    ...useSettlementDetailQueryOption(meetingId),
    enabled: isReady && isValidId,
  });

  if (!isReady) return null;
  if (!isValidId) return <ErrorPage statusCode={404} />;
  if (isPending) return <Loader />;
  if (!settlement) return <ErrorPage statusCode={isAxiosError(error) && error.response?.status === 404 ? 404 : 500} />;

  return (
    <>
      <Info settlement={settlement} />
      <SettlementList
        meetingId={settlement.meetingId}
        rounds={settlement.rounds}
        isLeader={settlement.isLeader}
        isApprovedPayer={settlement.isApprovedPayer}
        isEnded={settlement.isEnded}
      />
    </>
  );
};

export default SettlementDetailPage;
