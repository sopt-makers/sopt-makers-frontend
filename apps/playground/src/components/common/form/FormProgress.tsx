import styled from '@emotion/styled';
import * as Progress from '@radix-ui/react-progress';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { Tag } from '@sopt-mds/ui';
import { useMemo } from 'react';

import IconDoneCheck from '@/public/icons/icon-done-check.svg';

interface FormProgressProps {
  className?: string;
  title: string;
  items: FormProgressItem[];
}

export type FormProgressItem = {
  title: string;
  required?: boolean;
  active?: boolean;
};

const FormProgress = ({ className, title, items }: FormProgressProps) => {
  const activeItems = useMemo(() => items.filter((item) => item.active), [items]);
  const progressPercentage = Math.round((activeItems.length / items.length) * 100);

  return (
    <StyledFormProgress className={className}>
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        <Tag size='small'>{`${activeItems.length}/${items.length}`}</Tag>
      </StyledHeader>
      <StyledProgressRoot value={progressPercentage}>
        <StyledProgressIndicator percentage={progressPercentage} />
      </StyledProgressRoot>
      <StatusList>
        {items.map(({ title, required, active }) => (
          <ListItem key={title}>
            <ListItemTitle isCompleted={active}>
              {title}
              {required && <RequiredMark> *</RequiredMark>}
            </ListItemTitle>
            {active && (
              <Checked>
                <IconDoneCheck />
              </Checked>
            )}
          </ListItem>
        ))}
      </StatusList>
    </StyledFormProgress>
  );
};

export default FormProgress;

const StyledFormProgress = styled.div`
  border-radius: ${radius.r12};
  background-color: ${colors.bg.layer.default};
  padding: ${spacing.s48} ${spacing.s40};
  width: 290px;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
`;

const StyledTitle = styled.span`
  color: ${colors.fg.neutral.bold};
  ${typography.heading3};
`;

const StyledProgressRoot = styled(Progress.Root)`
  position: relative;
  transform: translateZ(0);
  margin-top: ${spacing.s20};
  border-radius: 100px;
  background-color: ${colors.bg.neutral.subtle};
  width: 100%;
  height: 6px;
  overflow: hidden;
`;

const StyledProgressIndicator = styled(Progress.Indicator)<{ percentage: number }>`
  transition: transform 0.3s;
  transform: translateX(-${({ percentage }) => 100 - percentage}%);
  background-color: ${colors.bg.secondary.default};
  width: 100%;
  height: 100%;
`;

const StatusList = styled.ul`
  margin-top: ${spacing.s28};
  border-radius: ${radius.r6};
  background-color: ${colors.bg.neutral.defaultDisabled};
  padding: ${spacing.s12} ${spacing.s0};
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.s14} ${spacing.s20};
`;

const ListItemTitle = styled.span<{ isCompleted?: boolean }>`
  transition: color 0.2s;
  color: ${({ isCompleted }) => (isCompleted ? colors.fg.neutral.bold : colors.fg.neutral.subtle)};
  ${typography.title4};
`;

const RequiredMark = styled.span`
  ${typography.label4};
`;

const Checked = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.fg.secondary.default};
  width: 14px;
  height: 14px;
`;
