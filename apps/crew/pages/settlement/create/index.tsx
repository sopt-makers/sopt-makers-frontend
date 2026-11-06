import { usePostSettlementMutation } from '@api/settlement/mutation';
import { useUserProfileQueryOption } from '@api/user/query';
import { PART_NAME, PART_VALUES } from '@constant/option';
import type { SettlementFormValues } from '@domain/settlement/form/schema';
import SettlementForm from '@domain/settlement/form/SettlementForm';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { ampli } from '@/ampli';

const CreateSettlementPage = () => {
  const router = useRouter();
  const { mutateAsync: createSettlement } = usePostSettlementMutation();
  const { data: user } = useQuery(useUserProfileQueryOption());

  const handleSubmit = async (values: SettlementFormValues) => {
    try {
      const { meetingId } = await createSettlement(values);
      ampli.completeMakeSettlement({
        group_id: meetingId,
        settlement_date: values.diningDate.replaceAll('.', '-'),
        settlement_part: PART_VALUES.every((part) => values.joinableParts.includes(part))
          ? '전체'
          : values.joinableParts.map((part) => PART_NAME[part]).join(', '),
        user_id: user?.orgId,
      });
      await router.push(`/settlement/detail?id=${meetingId}`);
    } catch {
      // TODO: 디자인 확인 후 실패 안내 방식 수정
      alert('회식을 등록하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return <SettlementForm mode='create' onSubmit={handleSubmit} />;
};

export default CreateSettlementPage;
