import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as Select from '@radix-ui/react-select';
import { colors, radius, spacing } from '@sopt-mds/design-tokens';
import { IconChevronUp } from '@sopt-mds/icons';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Overlay } from '@/components/members/common/select/Overlay';
import IconClear from '@/public/icons/icon-search-clear.svg';

const SelectPortal = dynamic<Select.SelectPortalProps>(
  () => import('@radix-ui/react-select').then((r) => r.SelectPortal),
  {
    ssr: false,
  },
);

type Option = {
  label: string;
  value: string;
};

interface ProjectCategorySelectProps extends Select.SelectProps {
  placeholder: string;
  allowClear?: boolean;
  onClear?: () => void;
  option: Option[];
}

const ProjectCategorySelect = ({
  placeholder,
  allowClear = false,
  onClear,
  option,
  ...props
}: ProjectCategorySelectProps) => {
  const hasValue = props.value != undefined;
  const [open, setOpen] = useState<boolean>(false);
  const selectedLabel = option.find(({ value }) => value === props.value)?.label;

  return (
    <Select.Root {...props} open={open} onOpenChange={setOpen}>
      <StyledWrapper allowClear={allowClear && hasValue}>
        <StyledTrigger open={open}>
          <span>{hasValue ? selectedLabel : placeholder}</span>
          <StyledIconChevronUp open={open} />
        </StyledTrigger>
        {allowClear && hasValue && (
          <StyledIconClear
            className='icon-clear'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear?.();
            }}
          >
            <IconClear width={18} height={18} alt='clear-icon' />
          </StyledIconClear>
        )}
      </StyledWrapper>
      <SelectPortal>
        <>
          <Overlay open={open} />
          <StyledContent position='popper' align='center'>
            {option.map(({ value, label }) => (
              <StyledItem key={value} value={value}>
                <Select.ItemText>{label}</Select.ItemText>
              </StyledItem>
            ))}
          </StyledContent>
        </>
      </SelectPortal>
    </Select.Root>
  );
};

export default ProjectCategorySelect;

const StyledWrapper = styled.div<{ allowClear: boolean }>`
  display: inline-block;
  position: relative;
  flex-shrink: 0;

  &:hover {
    ${({ allowClear }) =>
      allowClear &&
      css`
        & .icon-arrow {
          opacity: 0;
        }

        & .icon-clear {
          opacity: 1;
        }
      `}
  }
`;

const StyledIconClear = styled(Select.Icon)`
  display: flex;
  position: absolute;
  right: 12px;
  bottom: 50%;
  align-items: center;
  justify-content: center;
  transform: translateY(50%);
  transition: opacity 0.2s;
  opacity: 0;
  cursor: pointer;
`;

const StyledTrigger = styled(Select.Trigger)<{ open: boolean }>`
  display: flex;
  padding: ${spacing.s10} ${spacing.s16} ${spacing.s10} ${spacing.s20};
  gap: ${spacing.s8};
  transition: background 0.3s;
  border-radius: ${radius.r10};
  background-color: ${colors.bg.layer.default};
  color: ${colors.fg.neutral.subtle};

  &:hover {
    background: ${colors.bg.layer.defaultHover};
  }
`;

const StyledIconChevronUp = styled(IconChevronUp)<{ open: boolean }>`
  width: 18px;
  height: 18px;
  color: ${colors.bg.neutral.bold};
  transition: transform 0.3s;
  transform: ${({ open }) => (open ? undefined : 'rotate(-180deg)')};
`;

const StyledContent = styled(Select.Content)`
  gap: 10px;
  border-radius: 8px;
  background-color: ${colors.bg.layer.default};
  padding: 8px;
  margin-top: 8px;
  width: 100%;
`;

const StyledItem = styled(Select.Item)`
  text-align: start;
  transition: color 0.3s background-color 0.3s;
  outline: none;
  border-radius: 8px;
  background-color: ${colors.bg.layer.default};
  cursor: pointer;
  width: 100%;
  padding: ${spacing.s10};

  &[data-highlighted] {
    outline: none;
    background-color: ${colors.bg.layer.defaultHover};
  }

  /* &[data-disabled] {
      disabled style을 추가해주세요
    } */
`;
