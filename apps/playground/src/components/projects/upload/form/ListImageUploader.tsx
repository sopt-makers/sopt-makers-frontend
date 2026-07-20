import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, spacing, typography } from '@sopt-mds/design-tokens';
import { IconPlus, IconWriteFilled, IconXClose } from '@sopt-mds/icons';
import { useEffect, useRef, useState } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import useImageUploader from '@/hooks/useImageUploader';
import type { CSSValueWithLength } from '@/utils';
import { buildCSSWithLength } from '@/utils';

interface ImageUploaderProps {
  src?: string;
  width?: CSSValueWithLength;
  height?: CSSValueWithLength;
  value?: string;
  className?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onDelete?: () => void;
}

const ListImageUploader = ({
  width = 192,
  height = 108,
  onChange,
  onDelete,
  value,
  className,
  errorMessage,
  src,
}: ImageUploaderProps) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [isSelectorOpened, setIsSelectorOpened] = useState<boolean>(false);

  const handleChangeImageInput = (s3Url: string[]) => {
    setPreviewImage(s3Url[0]);
    onChange?.(s3Url[0]);
  };
  const { imageInputRef, handleClickImageInput } = useImageUploader({
    onSuccess: handleChangeImageInput,
  });

  const previewImageSrc = value || previewImage || src;

  const openSelector = () => {
    setIsSelectorOpened(true);
  };
  const closeSelector = () => {
    setIsSelectorOpened(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setPreviewImage(undefined);
    closeSelector();
    onDelete?.();
  };

  const handleClick = () => {
    if (previewImageSrc) {
      openSelector();
    } else {
      handleClickImageInput();
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    handleClickImageInput();
    closeSelector();
  };

  useEffect(() => {
    const handleClickSelectorOutside = (e: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        closeSelector();
      }
    };
    if (isSelectorOpened) {
      document.addEventListener('mousedown', handleClickSelectorOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickSelectorOutside);
    };
  }, [selectorRef, isSelectorOpened]);

  return (
    <Container>
      <ImageUploader
        className={className}
        width={width}
        height={height}
        onClick={handleClick}
        error={Boolean(errorMessage)}
      >
        <StyledInput type='file' accept='image/*' ref={imageInputRef} />
        {isSelectorOpened && (
          <Background width={width} height={height}>
            <StyledSelector ref={selectorRef}>
              <StyledEditButton type='button' onClick={handleEdit}>
                <IconWriteFilled width={14} height={14} />
                <div>수정</div>
              </StyledEditButton>
              <StyledRemoveButton type='button' onClick={handleDelete}>
                <IconXClose width={14} height={14} />
                <div>삭제</div>
              </StyledRemoveButton>
            </StyledSelector>
          </Background>
        )}
        {previewImageSrc ? <StyledPreview src={previewImageSrc} alt='preview-image' /> : <StyledIconPlus />}
      </ImageUploader>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Container>
  );
};

export default ListImageUploader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageUploader = styled.div<Pick<ImageUploaderProps, 'width' | 'height'> & { error: boolean }>`
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.bg.layer.default};
  cursor: pointer;

  ${({ width }) => buildCSSWithLength('width', width)};
  ${({ height }) => buildCSSWithLength('height', height)};
  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${colors.fg.danger.default};
    `}
`;

const Background = styled.div<Pick<ImageUploaderProps, 'width' | 'height'>>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: rgb(0 0 0 / 50%);

  ${({ width }) => buildCSSWithLength('width', width)};
  ${({ height }) => buildCSSWithLength('height', height)};
`;

const StyledSelector = styled.div`
  display: flex;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: ${spacing.s4};
  background-color: ${colors.bg.neutral.default};
  padding: ${spacing.s10} ${spacing.s12};
  color: ${colors.fg.neutral.bold};
  ${typography.label4};
`;

const StyledEditButton = styled.button`
  position: relative;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  cursor: pointer;

  ${buttonStyle}

  &::after {
    position: absolute;
    top: 10px;
    right: 0;
    background-color: ${colors.bg.neutral.default};
    width: 1px;
    height: 14px;
    content: '';
  }
`;

const StyledRemoveButton = styled.button`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  cursor: pointer;

  ${buttonStyle}
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledPreview = styled.img`
  border-radius: 6px;
  width: inherit;
  height: inherit;
  object-fit: cover;
`;
const StyledIconPlus = styled(IconPlus)`
  width: 24px;
  height: 24px;
  color: ${colors.stroke.neutral.default};
`;
