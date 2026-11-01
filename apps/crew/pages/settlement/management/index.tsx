import Attendees from '@domain/settlement/SettlementManagement/Attendees';
import Info from '@domain/settlement/SettlementManagement/Info';
import PayerRequests from '@domain/settlement/SettlementManagement/PayerRequests';
import CrewTab from '@shared/CrewTab';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

const SettlementManagementPage = () => {
  const { query, isReady } = useRouter();

  const isValidId = typeof query.id === 'string' && Number.isSafeInteger(Number(query.id)) && Number(query.id) > 0;

  if (!isReady) return null;

  if (!isValidId) return <ErrorPage statusCode={404} />;

  return (
    <>
      <CrewTab />
      <Info id={String(query.id)} />
      <PayerRequests />
      <Attendees />
    </>
  );
};

export default SettlementManagementPage;
