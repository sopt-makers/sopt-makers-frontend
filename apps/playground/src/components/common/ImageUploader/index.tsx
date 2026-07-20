import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { IconPlus, IconWriteFilled, IconXClose } from '@sopt-mds/icons';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import { MAX_FEED_IMAGE_LENGTH } from '@/components/feed/upload/ImageUploadButton';
import useImageUploader from '@/hooks/useImageUploader';
import IconImage from '@/public/icons/icon-image.svg';

const DEFAULT_IMAGE_URL = '';

interface ImageUploaderProps {
  width?: number | string;
  height?: number | string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  emptyIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  errorMessage?: string;
  src?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  width = 104,
  height = 104,
  onChange,
  value,
  className,
  emptyIcon: EmptyIcon = IconImage,
  errorMessage,
  src,
}) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [isOpenSelector, setIsOpenSelector] = useState(false);

  const handleChangeImageInput = (s3Url: string[]) => {
    setPreviewImage(s3Url[0]);
    onChange?.(s3Url[0]);
  };
  const { imageInputRef, handleClickImageInput } = useImageUploader({
    onSuccess: handleChangeImageInput,
    maxImageLength: MAX_FEED_IMAGE_LENGTH,
  });

  const previewImageSrc = value || previewImage || src;

  const handleRemove = () => {
    setPreviewImage(undefined);
    onChange?.(DEFAULT_IMAGE_URL);
  };

  const handleClick = () => {
    if (previewImage?.length) {
      openSelector();
    } else {
      handleClickImageInput();
    }
  };

  const openSelector = () => setIsOpenSelector(true);
  const closeSelector = () => setIsOpenSelector(false);

  useEffect(() => {
    closeSelector();
  }, [previewImage]);

  useEffect(() => {
    const handleClickSelectorOutside = (e: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        closeSelector();
      }
    };
    if (isOpenSelector) {
      document.addEventListener('mousedown', handleClickSelectorOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickSelectorOutside);
    };
  }, [selectorRef, isOpenSelector]);

  return (
    <StyledWrapper>
      <Container
        className={className}
        width={width}
        height={height}
        onClick={handleClick}
        error={Boolean(errorMessage)}
      >
        <StyledInput type='file' accept='image/*' ref={imageInputRef} />
        {previewImageSrc ? <StyledPreview src={previewImageSrc} alt='preview-image' /> : <StyledIconPlus />}
        <StyledSelector ref={selectorRef} isOpen={isOpenSelector}>
          <StyledEditButton type='button' onClick={handleClickImageInput}>
            <IconWriteFilled width={14} height={14} />
            <div>수정</div>
          </StyledEditButton>
          <StyledRemoveButton type='button' onClick={handleRemove}>
            <IconXClose width={14} height={14} />
            <div>삭제</div>
          </StyledRemoveButton>
        </StyledSelector>
      </Container>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </StyledWrapper>
  );
};

export default ImageUploader;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Container = styled.div<Pick<ImageUploaderProps, 'width' | 'height'> & { error: boolean }>`
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.bg.layer.default};
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};
  height: ${({ height }) => (typeof height === 'string' ? height : `${height}px`)};

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${colors.fg.danger.default};
    `}
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledPreview = styled.img`
  border-radius: ${radius.r6};
  width: inherit;
  height: inherit;
  object-fit: cover;
`;

const StyledSelector = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  justify-content: center;
  align-items: center;
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
  line-height: 0;
  flex-shrink: 0;

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
  flex-shrink: 0;

  ${buttonStyle}
`;

const StyledIconPlus = styled(IconPlus)`
  width: 24px;
  height: 24px;
  color: ${colors.stroke.neutral.default};
`;
