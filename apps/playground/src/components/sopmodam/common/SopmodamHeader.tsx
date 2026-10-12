import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconChevronLeft } from '@sopt-mds/icons';

interface SopmodamHeaderProps {
  title?: string;
  onBack: () => void;
}

const SopmodamHeader = ({ title = '솝모담', onBack }: SopmodamHeaderProps) => {
  return (
    <Container>
      <BackButton type='button' aria-label='뒤로가기' onClick={onBack}>
        <IconChevronLeft width={28} height={28} aria-hidden='true' focusable='false' />
      </BackButton>
      <Title>{title}</Title>
    </Container>
  );
};

export default SopmodamHeader;

const Container = styled.header`
  display: flex;
  gap: ${spacing.s2};
  align-items: center;
  background-color: ${colors.bg.layer.basement};
  padding: ${spacing.s8} ${spacing.s16};
  height: 44px;
  color: ${colors.fg.neutral.bold};
`;

const BackButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  width: 28px;
  height: 28px;
  color: inherit;

  &:focus-visible {
    outline: 2px solid ${colors.stroke.neutral.defaultFocused};
    outline-offset: 2px;
  }
`;

const Title = styled.span`
  ${typography.label2};
`;
