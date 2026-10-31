import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { Callout } from '@sopt-mds/ui';
import type { FormEventHandler, ReactNode } from 'react';
import { styled } from 'stitches.config';

interface FormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  actions: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const FormLayout = ({ title, description, children, actions, onSubmit }: FormLayoutProps) => (
  <SPage>
    <SHeader>
      <STitle>{title}</STitle>
      <Callout variant='information'>{description}</Callout>
    </SHeader>
    <form onSubmit={onSubmit} noValidate>
      <SFields>{children}</SFields>
      {actions}
    </form>
  </SPage>
);

export default FormLayout;

const SPage = styled('main', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s64,
  'width': '100%',
  'paddingInline': spacing.s40,
  'paddingBottom': spacing.s120,
  'color': colors.fg.neutral.bold,
  '@mobile': { gap: spacing.s40, paddingInline: 0, paddingBottom: 0 },
});

const SHeader = styled('header', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': spacing.s20,
  '@mobile': { gap: spacing.s4 },
});

const STitle = styled('h1', {
  ...typography.heading1,
  'minHeight': 48,
  'display': 'flex',
  'alignItems': 'center',
  '@mobile': { ...typography.heading3 },
});

const SFields = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'gap': 60,
  '@mobile': { gap: spacing.s40 },
});
