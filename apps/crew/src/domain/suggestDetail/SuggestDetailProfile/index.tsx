import { playgroundURL } from '@constant/url';
import ReportMenu from '@domain/suggestDetail/ReportMenu';
import type { MeetingDemandAuthor } from '@domain/suggestDetail/types';
import { playgroundLink } from '@sopt/constant';
import { useToast } from '@sopt-makers/ui';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconShare } from '@sopt-mds/icons';
import { Avatar } from '@sopt-mds/ui';
import { styled } from 'stitches.config';

interface SuggestDetailProfileProps {
  author: MeetingDemandAuthor;
  createdAt: string;
  onReport: () => void;
}

const SuggestDetailProfile = ({ author, createdAt, onReport }: SuggestDetailProfileProps) => {
  const { open } = useToast();

  const handleClickShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      open({ icon: 'success', content: '링크를 복사했어요.' });
    } catch {
      open({ icon: 'error', content: '링크 복사에 실패했어요. 다시 시도해 주세요.' });
    }
  };

  return (
    <SHeader>
      <SProfileLink
        href={`${playgroundURL}${playgroundLink.memberDetail(author.orgId)}`}
        target='_blank'
        rel='noreferrer'
      >
        <Avatar src={author.profileImageUrl} alt={author.name} size={48} />
        <SProfileText>
          <SAuthorName>{author.name}</SAuthorName>
          <SCreatedAt>{createdAt}</SCreatedAt>
        </SProfileText>
      </SProfileLink>

      <SIconGroup>
        <SIconButton type='button' aria-label='링크 공유' onClick={handleClickShare}>
          <IconShare width={24} height={24} />
        </SIconButton>
        <ReportMenu reportMessage='모임 제안을 신고하시겠습니까?' onConfirmReport={onReport} />
      </SIconGroup>
    </SHeader>
  );
};

export default SuggestDetailProfile;

const SHeader = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const SProfileLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.s12,
});

const SProfileText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s4,
});

const SAuthorName = styled('p', {
  'color': colors.fg.neutral.bold,
  ...typography.label2,

  '@mobile': {
    ...typography.label3,
  },
});

const SCreatedAt = styled('p', {
  'color': colors.fg.neutral.subtle,
  ...typography.label3,

  '@mobile': {
    ...typography.label4,
  },
});

const SIconGroup = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: spacing.s12,
});

const SIconButton = styled('button', {
  display: 'flex',
  padding: 0,
  color: colors.fg.neutral.default,
});
