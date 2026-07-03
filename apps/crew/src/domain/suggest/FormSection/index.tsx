import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import type { ReactNode } from 'react';
import { styled } from 'stitches.config';

interface FormSectionProps {
  order: number;
  title: string;
  optional?: boolean;
  children: ReactNode;
}

const FormSection = ({ order, title, optional = false, children }: FormSectionProps) => {
  return (
    <SSection>
      <SHeader>
        <STitle>
          {order}. {title}
          {optional && <SOptional>(선택)</SOptional>}
        </STitle>
      </SHeader>

      <SContent>{children}</SContent>
    </SSection>
  );
};

export default FormSection;

const SSection = styled('section', {
  'display': 'flex',
  'flexDirection': 'column',

  'paddingTop': spacing.s48,

  '@mobile': {
    paddingTop: spacing.s32,
    gap: spacing.s32,
  },
});

const SHeader = styled('header', {
  paddingBottom: spacing.s12,
  marginBottom: spacing.s20,
  borderBottom: `1px solid ${colors.stroke.neutral.ghost}`,
});

const STitle = styled('h2', {
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s4,
  'color': colors.fg.neutral.bold,
  ...typography.heading2,

  '@mobile': {
    ...typography.heading3,
  },
});

const SOptional = styled('span', {
  color: colors.fg.neutral.subtle,
});

const SContent = styled('div', {});
