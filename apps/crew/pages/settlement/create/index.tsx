import { usePostSettlementMutation } from '@api/settlement/mutation';
import type { SettlementFormValues } from '@domain/settlement/form/schema';
import SettlementForm from '@domain/settlement/form/SettlementForm';
import { useRouter } from 'next/router';

const CreateSettlementPage = () => {
  const router = useRouter();
  const { mutateAsync: createSettlement } = usePostSettlementMutation();

  const handleSubmit = async (values: SettlementFormValues) => {
    try {
      const { meetingId } = await createSettlement(values);
      await router.push(`/settlement/detail?id=${meetingId}`);
    } catch {
      // TODO: 디자인 확인 후 실패 안내 방식 수정
      alert('회식을 등록하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return <SettlementForm mode='create' onSubmit={handleSubmit} />;
};

export default CreateSettlementPage;
