import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconReply } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';

import SopmodamUploadNotice from '@/components/sopmodam/answer/upload/SopmodamUploadNotice';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SopmodamUploadContentProps {
  content: string;
  releaseDate: string;
  onEdit?: () => void;
}

const SopmodamUploadContent = ({ content, releaseDate, onEdit }: SopmodamUploadContentProps) => {
  const isEditable = onEdit !== undefined;

  return (
    <Container isEditable={isEditable}>
      <Answer>
        <ReplyIcon width={16} height={16} aria-hidden='true' focusable='false' />
        <Content>{content}</Content>
      </Answer>
      {isEditable && (
        <EditButton type='button' variant='secondary' size='large' onClick={onEdit}>
          수정하기
        </EditButton>
      )}
      <Notice>
        <SopmodamUploadNotice releaseDate={releaseDate} />
      </Notice>
    </Container>
  );
};

export default SopmodamUploadContent;

const Container = styled.section<{ isEditable: boolean }>`
  display: grid;
  grid-template-areas:
    'answer'
    'notice';
  gap: ${spacing.s16};

  ${({ isEditable }) =>
    isEditable &&
    css`
      grid-template-areas:
        'answer'
        'notice'
        'action';

      @media ${MOBILE_MEDIA_QUERY} {
        grid-template-areas:
          'answer'
          'action'
          'notice';
      }
    `}
`;

const Answer = styled.div`
  display: flex;
  grid-area: answer;
  gap: ${spacing.s8};
  align-items: flex-start;
  color: ${colors.fg.neutral.bold};
`;

const ReplyIcon = styled(IconReply)`
  flex-shrink: 0;
  margin-top: 4px;
`;

const Content = styled.p`
  ${typography.body1};

  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

const EditButton = styled(ActionButton)`
  ${typography.label1};

  grid-area: action;
  justify-self: end;
  border-radius: ${radius.r12};
  padding: 0 26px;
  height: 56px;

  &:focus-visible {
    outline: 2px solid ${colors.stroke.neutral.defaultFocused};
    outline-offset: 2px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.label2};

    border-radius: ${radius.r10};
    padding: 0 ${spacing.s16};
    width: 100%;
    height: 46px;
  }
`;

const Notice = styled.div`
  grid-area: notice;
  margin-top: ${spacing.s8};
`;
