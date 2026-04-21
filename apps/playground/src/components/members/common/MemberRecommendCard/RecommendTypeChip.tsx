import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import type { RecommendMemberById } from '@/api/endpoint/members/getMemberRecommendById';
import type { RecommendMemberOfMe } from '@/api/endpoint/members/getMemberRecommendOfMe';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

// 두 API의 recommendType enum 값을 모두 수용
type RecommendType = RecommendMemberOfMe['recommendType'] | RecommendMemberById['recommendType'];

const RECOMMEND_TYPE_LABEL: Record<RecommendType, string> = {
  SAME_PART: '같은 파트 🛠️',
  SAME_CREW: '같은 모임 👥',
  SAME_MBTI: '같은 MBTI 🧬',
  SAME_UNIVERSITY: '같은 학교 🏫',
  SAME_GENERATION: '같은 기수 🔢',
  SAME_PROJECT: '같은 프로젝트 💡',
};

interface RecommendTypeChipProps {
  recommendType: RecommendType;
}

const RecommendTypeChip = ({ recommendType }: RecommendTypeChipProps) => {
  return <StyledContainer>{RECOMMEND_TYPE_LABEL[recommendType]}</StyledContainer>;
};

export default RecommendTypeChip;

const StyledContainer = styled.div`
  padding: 5px 5px 5px 8px;
  background-color: #fdbbf9;
  border-radius: 20px;
  color: ${colors.black};
  white-space: nowrap;
  ${fonts.LABEL_12_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 10px;
    line-height: 12px;
  }
`;
