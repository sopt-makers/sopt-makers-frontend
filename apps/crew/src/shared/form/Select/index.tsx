import { useDisplay } from '@hook/useDisplay';

import BaseSelect from './BaseSelect/BaseSelect';
import BottomSheetSelect from './BottomSheetSelect/BottomSheetSelect';
import type { MultipleSelectProps, SelectProps } from './types/props';

function Select(props: SelectProps | MultipleSelectProps) {
  const { isMobile } = useDisplay();

  return <div>{isMobile ? <BottomSheetSelect {...props} /> : <BaseSelect {...props} />}</div>;
}

export default Select;
