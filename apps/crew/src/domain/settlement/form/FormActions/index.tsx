import { spacing } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface FormActionsProps {
  submitLabel: string;
  submitDisabled: boolean;
  deleteLabel?: string;
  deleteDisabled?: boolean;
  onDelete?: () => void;
}

const FormActions = ({ submitLabel, submitDisabled, deleteLabel, deleteDisabled, onDelete }: FormActionsProps) => (
  <SActions>
    {deleteLabel && (
      <ActionButton
        type='button'
        size='medium'
        variant='secondary'
        onClick={onDelete}
        disabled={deleteDisabled || !onDelete}
      >
        {deleteLabel}
      </ActionButton>
    )}
    <ActionButton type='submit' size='medium' variant='primary' disabled={submitDisabled}>
      {submitLabel}
    </ActionButton>
  </SActions>
);

export default FormActions;

const SActions = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'flex-end',
  'gap': spacing.s12,
  'paddingTop': spacing.s64,
  'paddingBottom': spacing.s48,
  '@mobile': { paddingRight: spacing.s20 },
});
