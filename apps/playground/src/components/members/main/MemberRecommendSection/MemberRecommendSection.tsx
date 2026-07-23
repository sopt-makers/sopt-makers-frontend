import styled from '@emotion/styled';
import * as Tooltip from '@radix-ui/react-tooltip';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useState } from 'react';

import { useGetMemberRecommendOfMe } from '@/api/endpoint/members/getMemberRecommendOfMe';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import RefreshIcon from '@/public/icons/icon_refresh.svg';
import { DESKTOP_TWO_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import MemberRecommendCard from '../../common/MemberRecommendCard/MemberRecommendCard';
import MemberRecommendCardSkeleton from '../../common/MemberRecommendCard/MemberRecommendCardSkeleton';

const SKELETON_COUNT = 4;

const MemberRecommendSection = () => {
  const { logClickEvent } = useEventLogger();
  const { data, isLoading, refetch } = useGetMemberRecommendOfMe();
  const memberRecommendData = data?.members;
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const handleRefreshClick = () => {
    setIsTooltipOpen(false);
    refetch();
    logClickEvent('memberRecommendRefresh', { screen: 'profile' });
  };

  return (
    <StyledSection>
      <StyledSectionHeader>
        <StyledSectionTitle>나와 접점이 있는 멤버</StyledSectionTitle>
        {/* TODO: 추후 디자인 시스템 툴팁으로 변경 */}
        <Tooltip.Provider>
          <Tooltip.Root open={isTooltipOpen}>
            <Tooltip.Trigger asChild>
              <button onClick={handleRefreshClick}>
                <StyledRefreshIcon />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <TooltipContent side='top' avoidCollisions={false}>
                더 많은 멤버를 찾아보세요!
                <TooltipArrow />
              </TooltipContent>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </StyledSectionHeader>
      <StyledCardGrid>
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <MemberRecommendCardSkeleton key={index} usage='memberTab' />
            ))
          : memberRecommendData?.map((member) => (
              <MemberRecommendCard key={member.id} member={member} usage='memberTab' />
            ))}
      </StyledCardGrid>
    </StyledSection>
  );
};

export default MemberRecommendSection;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 52px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    padding: 16px 0;
    margin-bottom: 0;
  }
`;

const StyledSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 4px;
  }
`;

const StyledSectionTitle = styled.span`
  color: ${colors.gray10};
  ${fonts.HEADING_24_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_16_B}
  }
`;

const StyledRefreshIcon = styled(RefreshIcon)`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 24px;
    height: 24px;
  }
`;

const TooltipContent = styled(Tooltip.Content)`
  position: relative;

  /* 1200px 미만에서는 툴팁을 노출하지 않는다. JS로 분기하면 뷰포트 판단 전 첫 렌더에서 깜빡임이 생기므로 CSS로 처리 */
  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: none;
  }

  padding: 12px 14px;
  border-radius: 12px;
  background-color: ${colors.gray600};
  margin: 8px;
  ${fonts.BODY_13_M}
  box-shadow:
    0 1px 4px 0 rgba(12, 12, 13, 0.05),
    0 1px 4px 0 rgba(12, 12, 13, 0.1);
`;

const TooltipArrow = styled.div`
  position: absolute;
  bottom: -9px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 12px solid ${colors.gray600};
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  & > *:nth-of-type(n + 5) {
    display: none;
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;

    & > *:nth-of-type(n + 4) {
      display: none;
    }
  }
`;
