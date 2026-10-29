import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { styled } from 'stitches.config';

export const SFieldHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s2,
});

export const SLabel = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.s4,
  color: colors.fg.neutral.bold,
  ...typography.title5,
});

export const SRequired = styled('span', { ...typography.title4, color: colors.fg.brand.default });

export const SDescription = styled('p', {
  color: colors.fg.neutral.default,
  ...typography.body2,
});

export const SError = styled('span', {
  display: 'inline-block',
  marginTop: spacing.s6,
  color: colors.fg.danger.default,
  ...typography.body3,
});
