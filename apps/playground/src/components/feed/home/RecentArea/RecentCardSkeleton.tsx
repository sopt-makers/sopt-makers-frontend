import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Skeleton from '@/components/common/Skeleton';

const RecentCardSkeleton = () => {
  return (
    <CardContainer>
      <CardContent>
        <CardTitle>
          <Skeleton width={32} height={22} borderRadius='4px' color={colors.gray700} />
          <Skeleton width={180} height={22} borderRadius='6px' color={colors.gray700} />
        </CardTitle>
        <Skeleton height={42} borderRadius='6px' color={colors.gray700} />
      </CardContent>

      <CardFooter>
        <Skeleton width={42} height={16} borderRadius='6px' color={colors.gray700} />
        <FeedIconBox>
          <Skeleton width={42} height={16} borderRadius='6px' color={colors.gray700} />
          <Skeleton width={42} height={16} borderRadius='6px' color={colors.gray700} />
        </FeedIconBox>
      </CardFooter>
    </CardContainer>
  );
};

export default RecentCardSkeleton;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colors.gray900};
  padding: 16px;
  height: 100%;
  overflow: hidden;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeedIconBox = styled.div`
  display: flex;
  gap: 8px;
`;
