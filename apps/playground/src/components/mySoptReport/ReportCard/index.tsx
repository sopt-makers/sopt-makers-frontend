import styled from '@emotion/styled';

import type { Value } from '@/components/mySoptReport/constants';
import MyDataCard from '@/components/mySoptReport/ReportCard/MyDataCard';
import MyTypeCard from '@/components/mySoptReport/ReportCard/MyTypeCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ReportCardProps {
  type: string;
  value: Value;
}

type MyType =
  | '새로 오솝군요!'
  | '솝플루언서'
  | '인간 솝크드인'
  | '서비스 익솝플로러'
  | '우리말 솝고수'
  | '얼죽솝'
  | '솝만추';

const ReportCardIndex = ({ type, value }: ReportCardProps) => {
  return (
    <Wrapper>
      {type === 'myType' ? <MyTypeCard myType={value as MyType} /> : <MyDataCard type={type} value={value} />}
    </Wrapper>
  );
};

export default ReportCardIndex;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 294px;
  height: 403.2px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 245px;
    height: 336px;
  }
`;
