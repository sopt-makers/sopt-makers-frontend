import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconInfoCircleOutlined } from '@sopt-mds/icons';

interface SopmodamAnswerNoticeProps {
  releaseDate: string;
}

const SopmodamAnswerNotice = ({ releaseDate }: SopmodamAnswerNoticeProps) => {
  return (
    <Container>
      <InfoIcon width={20} height={20} aria-hidden='true' focusable='false' />
      <Description>
        작성한 경험담은 답변 모집이 끝난 뒤, 다른 OB의 경험담과 함께 커뮤니티 ‘솝모담’에 공개돼요.
        <br />
        <Emphasis>{releaseDate}</Emphasis> 공개 예정이며, 답변자의 <Emphasis>이름·기수·파트</Emphasis>가 함께 표시돼요.
      </Description>
    </Container>
  );
};

export default SopmodamAnswerNotice;

const Container = styled.aside`
  display: flex;
  gap: ${spacing.s10};
  align-items: flex-start;
`;

const InfoIcon = styled(IconInfoCircleOutlined)`
  flex-shrink: 0;
  color: ${colors.fg.neutral.ghost};
`;

const Description = styled.p`
  ${typography.body2};

  flex: 1;
  min-width: 0;
  color: ${colors.fg.neutral.subtle};
  overflow-wrap: anywhere;
`;

const Emphasis = styled.strong`
  ${typography.label3};

  color: ${colors.fg.neutral.default};
`;
