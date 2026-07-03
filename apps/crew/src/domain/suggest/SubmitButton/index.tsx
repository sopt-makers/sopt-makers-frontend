import { useDisplay } from '@hook/useDisplay';
import { spacing } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { useFormContext } from 'react-hook-form';
import { styled } from 'stitches.config';

import type { SuggestFormValues } from '../schema';

const SubmitButton = () => {
  const { isMobile } = useDisplay();
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext<SuggestFormValues>();
  const isDisabled = isSubmitting || !isValid;

  return (
    <SButtonContainer>
      <ActionButton type='submit' size='large' variant='primary' disabled={isDisabled}>
        {isMobile ? '제안하기' : '모임 제안하기'}
      </ActionButton>
    </SButtonContainer>
  );
};

export default SubmitButton;

const SButtonContainer = styled('div', {
  'display': 'flex',
  'justifyContent': 'flex-end',

  'marginTop': spacing.s64,

  '@mobile': {
    'justifyContent': 'center',
    'marginTop': '61px',

    '& button': {
      width: '320px',
    },
  },
});
