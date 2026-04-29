import styled from '@emotion/styled';
import * as Tooltip from '@radix-ui/react-tooltip';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useGetMemberRecommendOfMe } from '@/api/endpoint/members/getMemberRecommendOfMe';
import RefreshIcon from '@/public/icons/icon_refresh.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import MemberRecommendCard from '../../common/MemberRecommendCard/MemberRecommendCard';
import { DESKTOP_TWO_MEDIA_QUERY } from '../contants';

const PC_MEDIA_WIDTH = 1200;
const PC_MEDIA_QUERY = `screen and (min-width: ${PC_MEDIA_WIDTH}px)`;

const MemberRecommendSection = () => {
  const { data: memberRecommendData, refetch } = useGetMemberRecommendOfMe();
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const [isWideViewport, setIsWideViewport] = useState(false);

  // TODO: viewpoint 판단은 추후 상위 컴포넌트로 이동
  useEffect(() => {
    const media = window.matchMedia(PC_MEDIA_QUERY);
    setIsWideViewport(media.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsWideViewport(e.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const handleRefreshClick = () => {
    setIsTooltipOpen(false);
    refetch();
  };

  return (
    <StyledSection>
      <StyledSectionHeader>
        <StyledSectionTitle>나와 접점이 있는 멤버</StyledSectionTitle>
        {isWideViewport ? (
          //TODO: 추후 디자인 시스템 툴팁으로 변경
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
        ) : (
          <button onClick={handleRefreshClick}>
            <StyledRefreshIcon />
          </button>
        )}
      </StyledSectionHeader>
      <StyledCardGrid>
        {memberRecommendData?.members.map((member) => (
          <Link key={member.id} href={playgroundLink.memberDetail(member.id)}>
            <MemberRecommendCard
              key={member.id}
              name={member.name}
              profileImage={member.profileImage}
              generation={member.generation}
              part={member.part}
              recommendType={member.recommendType}
            />
          </Link>
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
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(3, 1fr);

    // TODO: random 로직으로 변경
    & > *:nth-child(n + 4) {
      display: none;
    }
  }
`;
