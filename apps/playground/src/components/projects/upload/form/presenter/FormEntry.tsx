import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import type { ReactNode } from 'react';

import Text from '@/components/common/Text';

export interface FormEntryProps {
  className?: string;
  title: string;
  children: ReactNode;
  required?: boolean;
  comment?: string;
  description?: ReactNode;
}

const FormEntry = ({ className, title, required, comment, children, description }: FormEntryProps) => {
  return (
    <StyledFormEntry className={className}>
      <div>
        <TitleSlot>
          <Text typography='SUIT_18_SB' color={colors.fg.neutral.bold}>
            {title}
          </Text>
          {required && <Essential>*</Essential>}
          {comment && <Comment>{comment}</Comment>}
        </TitleSlot>
        {description && <Description>{description}</Description>}
      </div>

      {children}
    </StyledFormEntry>
  );
};

export default FormEntry;

const StyledFormEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s10};
`;

const TitleSlot = styled.div`
  display: flex;
`;

const Description = styled.div`
  margin-top: ${spacing.s2};
  color: ${colors.fg.neutral.default};
  ${typography.body2}
`;

const Essential = styled(Text)`
  margin-left: ${spacing.s4};
  color: ${colors.fg.brand.default};
  ${typography.title4}
`;

const Comment = styled(Text)`
  align-self: center;
  margin-left: ${spacing.s6};
  color: ${colors.fg.brand.default};
`;
