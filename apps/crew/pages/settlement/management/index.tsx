import Attendees from '@domain/settlement/SettlementManagement/Attendees';
import Info from '@domain/settlement/SettlementManagement/Info';
import PayerRequests from '@domain/settlement/SettlementManagement/PayerRequests';
import type { SettlementPart } from '@domain/settlement/types';
import CrewTab from '@shared/CrewTab';
import { useRouter } from 'next/router';

const SettlementManagementPage = () => {
  const { query, isReady } = useRouter();
  const id = typeof query.id === 'string' ? query.id : '';

  // @TODO API 연동 시 페이지 진입 전에 leader 존재 여부 확인 및 예외 처리
  const settlement = {
    title: '회식명',
    diningDate: '2026-05-12',
    imageUrl: '',
    joinableParts: ['PM', 'DESIGN'] as SettlementPart[],
  };

  // @TODO: API 연동 시 회식 ID 검증 및 예외 처리 (장정훈)
  if (!isReady) return null;
  if (!/^[1-9]\d*$/.test(id)) return <p>올바른 회식 정보를 찾을 수 없습니다.</p>;

  return (
    <>
      <CrewTab />
      <Info id={id} settlement={settlement} />
      <PayerRequests />
      <Attendees />
    </>
  );
};

export default SettlementManagementPage;
