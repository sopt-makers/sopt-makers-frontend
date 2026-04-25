import { styled } from 'stitches.config';

import type { paths } from '@/__generated__/schema2';

import RecruitmentStatusList from '../RecruitmentStatusModalContent/RecruitmentStatusList';

// TODO: API 연결 시 파트 신청 멤버 API 응답 타입으로 교체
type AppliedInfo =
  paths['/meeting/v2/{meetingId}']['get']['responses']['200']['content']['application/json;charset=UTF-8']['appliedInfo'];

interface PartStatusModalContentProps {
  appliedInfo: AppliedInfo;
}

const PartStatusModalContent = ({ appliedInfo }: PartStatusModalContentProps) => {
  const total = appliedInfo.length;

  return (
    <>
      {total > 0 ? (
        <SRecruitmentStatusListWrapper>
          <RecruitmentStatusList recruitmentStatusList={appliedInfo} />
        </SRecruitmentStatusListWrapper>
      ) : (
        <SEmptyText>신청자가 없습니다.</SEmptyText>
      )}
      {total > 0 && (
        <SModalBottom>
          <STotal>총 {total}명 신청</STotal>
        </SModalBottom>
      )}
    </>
  );
};

export default PartStatusModalContent;

const SRecruitmentStatusListWrapper = styled('div', {
  'padding': '$24 $24 0 $24',

  '@tablet': {
    padding: '$0',
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
