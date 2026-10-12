import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';

import type { SopmodamVoteQuestion } from '@/components/sopmodam/vote/types';
import CheckIcon from '@/public/icons/icon-sopmodam-check.svg';

interface SopmodamVoteOptionProps {
  question: SopmodamVoteQuestion;
  name: string;
  checked: boolean;
  disabled: boolean;
  onSelect: (questionId: number) => void;
}

const SopmodamVoteOption = ({ question, name, checked, disabled, onSelect }: SopmodamVoteOptionProps) => {
  return (
    <Container>
      <Radio
        type='radio'
        name={name}
        value={question.questionId}
        checked={checked}
        disabled={disabled}
        onChange={() => onSelect(question.questionId)}
      />
      <Content>
        {checked && <Check aria-hidden='true' focusable='false' />}
        <Question>{question.content}</Question>
      </Content>
    </Container>
  );
};

export default SopmodamVoteOption;

const Container = styled.label`
  display: block;
  position: relative;
`;

const Radio = styled.input`
  position: absolute;
  margin: -1px;
  border: 0;
  padding: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
`;

const Content = styled.span`
  display: flex;
  gap: ${spacing.s8};
  align-items: center;
  border-radius: ${radius.r8};
  background-color: ${colors.bg.neutral.ghost};
  cursor: pointer;
  padding: ${spacing.s8} ${spacing.s12};
  min-height: 60px;
  color: ${colors.fg.neutral.bold};

  input:checked + & {
    background-color: ${colors.bg.neutral.ghostPressed};
  }

  input:disabled + & {
    cursor: default;
  }

  input:focus-visible + & {
    outline: 2px solid ${colors.stroke.neutral.defaultFocused};
    outline-offset: 2px;
  }
`;

const Check = styled(CheckIcon)`
  flex-shrink: 0;
`;

const Question = styled.span`
  ${typography.body2};

  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
`;
