import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconSendOutlined } from '@sopt-mds/icons';
import { forwardRef, useState } from 'react';
import { styled } from 'stitches.config';

interface CommentInputProps {
  onSubmit: (content: string) => void;
}

const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(({ onSubmit }, ref) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setContent('');
  };

  return (
    <SInputWrapper>
      <STextarea
        ref={ref}
        value={content}
        placeholder='모임이 기대된다면 댓글을 남겨보세요!'
        rows={1}
        onChange={(event) => setContent(event.target.value)}
      />
      <SSendButton type='button' aria-label='댓글 등록' onClick={handleSubmit}>
        <IconSendOutlined width={20} height={20} />
      </SSendButton>
    </SInputWrapper>
  );
});

CommentInput.displayName = 'CommentInput';

export default CommentInput;

const SInputWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: spacing.s14,
  backgroundColor: colors.bg.layer.default,
  borderRadius: radius.r10,
  paddingLeft: spacing.s16,
  paddingRight: spacing.s14,
});

const STextarea = styled('textarea', {
  'flex': '1 0 0',
  'minWidth': 0,
  'resize': 'none',
  'overflow': 'hidden',
  'border': 'none',
  'outline': 0,
  'backgroundColor': 'transparent',
  'color': colors.fg.neutral.bold,
  'paddingTop': spacing.s10,
  'paddingBottom': spacing.s10,
  ...typography.body1,

  '&::placeholder': {
    color: colors.fg.neutral.ghost,
  },
});

const SSendButton = styled('button', {
  display: 'flex',
  flexShrink: 0,
  padding: 0,
  color: colors.fg.neutral.subtle,
});
