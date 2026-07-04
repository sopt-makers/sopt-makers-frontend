import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { Avatar, Tag } from '@sopt-mds/ui';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberBlockProps {
  name: string;
  position?: string;
  imageUrl?: string;
  clickable?: boolean;
  onClick?: () => void;
  badges?: string[];
  as?: keyof JSX.IntrinsicElements;
}

const MemberBlock = ({
  name,
  position,
  onClick,
  imageUrl,
  badges = [],
  as = 'div',
  clickable = false,
}: MemberBlockProps) => {
  return (
    <StyledContainer as={as} clickable={clickable} onClick={onClick}>
      <Avatar src={imageUrl || undefined} size={56} />
      <StyledContent>
        <StyledTitleRow>
          <StyledName>{name}</StyledName>
          {position && <StyledPosition>{` ∙ ${position}`}</StyledPosition>}
        </StyledTitleRow>
        <StyledBadgeList>
          {badges.map((badge, idx) => (
            <Tag key={idx} size='small'>
              {badge}
            </Tag>
          ))}
        </StyledBadgeList>
      </StyledContent>
    </StyledContainer>
  );
};

export default MemberBlock;

const StyledContainer = styled.a<{ clickable: boolean }>`
  display: flex;
  gap: ${spacing.s12};

  ${(props) =>
    props.clickable
      ? css`
          cursor: pointer;
        `
      : ''};
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.s6};
`;

const StyledTitleRow = styled.h3`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_M}
  }
`;

const StyledName = styled.span`
  color: ${colors.fg.neutral.bold};
  ${typography.label2}
`;

const StyledPosition = styled.span`
  color: ${colors.fg.neutral.default};
  ${typography.label3}
`;

const StyledBadgeList = styled.div`
  display: flex;
  gap: ${spacing.s4};
  flex-wrap: wrap;
`;
