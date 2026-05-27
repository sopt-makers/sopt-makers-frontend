import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import type { ReactNode } from 'react';

interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: string;
  margin?: string;
  color?: string;
  children?: ReactNode;
}

const Skeleton = ({ width, height, borderRadius, color, margin, children, ...props }: SkeletonProps) => {
  return (
    <StyledSkeleton width={width} height={height} borderRadius={borderRadius} margin={margin} color={color} {...props}>
      {children}
    </StyledSkeleton>
  );
};

export default Skeleton;

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const shimmerEffect = css`
  background: linear-gradient(110deg, ${colors.gray900} 0%, ${colors.gray800} 50%, ${colors.gray900} 100%);
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 2s ease-in-out infinite;
`;

const StyledSkeleton = styled.div<{
  width?: number;
  height?: number;
  borderRadius?: string;
  margin?: string;
  color?: string;
}>`
  margin: ${({ margin }) => margin && margin};
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  background-color: ${({ color }) => color ?? colors.gray900};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  ${shimmerEffect}
`;
