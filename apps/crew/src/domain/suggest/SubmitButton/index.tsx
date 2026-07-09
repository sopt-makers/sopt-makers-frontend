import { useDisplay } from '@hook/useDisplay';
import { spacing } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface SubmitButtonProps {
  disabled: boolean;
}

const SubmitButton = ({ disabled }: SubmitButtonProps) => {
  const { isMobile } = useDisplay();

  return (
    <SButtonContainer>
      <ActionButton type='submit' size='large' variant='primary' disabled={disabled}>
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
