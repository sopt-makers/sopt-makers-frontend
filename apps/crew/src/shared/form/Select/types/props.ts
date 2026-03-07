import type { FocusEventHandler } from 'react';

import type { Option } from '../OptionItem';

interface CommonProps {
  label?: string;
  options: Option[];
  required?: boolean;
  error?: string;
  onBlur?: FocusEventHandler<HTMLDivElement>;
}

export interface SelectProps extends CommonProps {
  value: Option;
  multiple?: never;
  onChange: (value: Option) => void;
}

export interface MultipleSelectProps extends CommonProps {
  value: Option[];
  multiple: true;
  onChange: (value: Option[]) => void;
}
