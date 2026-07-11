import styled from '@emotion/styled';
import { colorBg, colorFg, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconTrashOutlined } from '@sopt-mds/icons';
import React from 'react';

import Select from '@/components/common/Select';
import type { LinkType } from '@/components/projects/upload/form/constants';
import { linkTitles } from '@/components/projects/upload/form/constants';
import { MOBILE_MEDIA_QUERY, PCTA_S_MEDIA_QUERY } from '@/styles/mediaQuery';

const HTTPS_PREFIX = 'https://';

interface LinkFieldProps {
  className?: string;
  value: LinkType;
  onChange: (value: LinkType) => void;
  onRemove: () => void;
}

const LinkField = ({ className, value, onChange, onRemove }: LinkFieldProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const linkUrl = e.target.value;
    if (linkUrl && !/^https?:\/\//i.test(linkUrl)) {
      onChange({
        ...value,
        linkUrl: `${HTTPS_PREFIX}${linkUrl}`,
      });
    }
  };

  const handleSelectLinkTitle = (linkTitle: string) => {
    onChange({
      ...value,
      linkTitle,
    });
  };

  const handleChangeLinkUrl = (linkUrl: string) => {
    onChange({
      ...value,
      linkUrl,
    });
  };

  return (
    <StyledLinkField className={className}>
      <StyledFormContainer>
        <StyledSelectWrapper>
          <StyledSelect
            width='100%'
            value={value.linkTitle}
            onChange={(e) => handleSelectLinkTitle(e.target.value)}
            hasValue={!!value.linkTitle}
          >
            {linkTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </StyledSelect>
        </StyledSelectWrapper>
        {/* @TODO: 추후 mds-ui2 SearchField 컴포넌트로 변경 */}
        <StyledInputWrapper>
          <StyledInput
            placeholder={HTTPS_PREFIX}
            value={value.linkUrl}
            onChange={(e) => handleChangeLinkUrl(e.target.value)}
            onBlur={handleBlur}
          />
        </StyledInputWrapper>
      </StyledFormContainer>
      <IconDeleteWrapper>
        <IconTrashOutlined onClick={onRemove} />
      </IconDeleteWrapper>
    </StyledLinkField>
  );
};

export default LinkField;

const StyledLinkField = styled.div`
  display: flex;
  gap: ${spacing.s20};
  width: 100%;
  padding: ${spacing.s12};
  background-color: ${colorBg.layer.default};
  border-radius: ${radius.r8};
`;

const StyledFormContainer = styled.div`
  display: flex;
  gap: ${spacing.s8};
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
  }
`;

const StyledFormWrapper = styled.div`
  display: flex;
`;

const StyledInputWrapper = styled(StyledFormWrapper)`
  flex: 1;
  height: 46px;
`;

const StyledSelectWrapper = styled(StyledFormWrapper)`
  width: 200px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'hasValue',
})<{ hasValue: boolean }>`
  border: none;
  color: ${({ hasValue }) => (hasValue ? colorFg.neutral.default : colorFg.neutral.ghost)};
  cursor: pointer;
`;

const StyledInput = styled.input`
  flex: 1;
  border-radius: ${radius.r10};
  ${typography.body1};
  color: ${colorFg.neutral.default};
  background-color: ${colorBg.neutral.ghost};
  padding: ${spacing.s10} ${spacing.s16};

  &::placeholder {
    color: ${colorFg.neutral.ghost};
  }
`;

const IconDeleteWrapper = styled.div`
  cursor: pointer;
  margin-top: ${spacing.s10};

  color: ${colorFg.neutral.ghost};
  @media ${PCTA_S_MEDIA_QUERY} {
    min-width: 40px;
    min-height: 40px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
