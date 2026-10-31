import SettlementList from '@domain/settlement/detail/SettlementList';
import Info from '@domain/settlement/Info';
import { settlementDetailMock } from '@domain/settlement/Info/settlementDetailMock';
import { useRouter } from 'next/router';

const SettlementDetailPage = () => {
  const { query, isReady } = useRouter();
  const settlement = settlementDetailMock.find((item) => item.meetingId === Number(query.id));

  //@TODO: 임시, API연동시 변경예정 (장정훈)
  if (!isReady) return null;
  if (!settlement) return <p>회식을 찾을 수 없습니다.</p>;

  return (
    <>
      <Info settlement={settlement} />
      <SettlementList rounds={settlement.rounds} isLeader={settlement.isLeader} isEnded={settlement.isEnded} />
    </>
  );
};

export default SettlementDetailPage;
