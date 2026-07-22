import styled from '@emotion/styled';
import { useToast } from '@sopt-makers/ui';
import { ActionButton } from '@sopt-mds/ui';
import { useRouter } from 'next/router';

import { useGetResolution } from '@/api/endpoint/resolution/getResolution';
import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import { ModalBottomSheet } from '@/components/common/BottomSheet/ModalBottomSheet';
import type { ModalProps } from '@/components/common/Modal';
import Modal from '@/components/common/Modal';
import { ModalContent, ModalFooter } from '@/components/common/Modal/parts';
import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useImageDownload from '@/components/resolution/read/hooks/useImageDownload';
import ResolutionMessage from '@/components/resolution/read/ResolutionMessage';
import { MB_MID_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

const ResolutionReadModal = ({ isOpen, onClose }: ModalProps) => {
  const { ref: imageRef, onClick: onDownloadButtonClick } = useImageDownload('at-sopt-다짐메시지');
  const { open } = useToast();

  const { data: { isRegistration } = {} } = useGetResolutionValidation();
  const { data: resolutionData } = useGetResolution(isRegistration ?? false);
  const router = useRouter();

  const handleClickDownloadButton = () => {
    onDownloadButtonClick();
    onClose();
    open({
      icon: 'success',
      content: '이미지가 저장되었어요. 친구와 공유해보세요!',
      style: {
        content: {
          whiteSpace: 'pre-wrap',
        },
      },
    });
  };

  const handleClickLucky = () => {
    sessionStorage.setItem('LUCKY_ENTRY', '1');
    router.push('/lucky');
  };

  return (
    <>
      <Responsive only='desktop'>
        <StyledModal isOpen={isOpen} onClose={onClose} zIndex={zIndex.모달}>
          <StyledModalContent ref={imageRef}>
            <ResolutionMessage isMessageExist={isRegistration ?? false} />
          </StyledModalContent>
          <StyledModalFooter align='stretch'>
            <LoggingClick eventKey='saveResolutionImage'>
              <ActionButton size='medium' variant='secondary' onClick={handleClickDownloadButton}>
                이미지로 저장하기
              </ActionButton>
            </LoggingClick>
            <LoggingClick eventKey='luckyTimeCapsule'>
              <ActionButton
                size='medium'
                variant='primary'
                onClick={handleClickLucky}
                disabled={resolutionData?.hasDrawnLuckyPick}
              >
                행운의 타임캡솝 뽑기
              </ActionButton>
            </LoggingClick>
          </StyledModalFooter>
        </StyledModal>
      </Responsive>
      <Responsive only='mobile'>
        <ModalBottomSheet isOpen={isOpen ?? false} onClose={onClose}>
          <BottomSheetContent>
            <StyledModalContent ref={imageRef}>
              <ResolutionMessage isMessageExist={isRegistration ?? false} />
            </StyledModalContent>
            <StyledModalFooter align='stretch'>
              <LoggingClick eventKey='saveResolutionImage'>
                <ActionButton size='medium' variant='secondary' onClick={handleClickDownloadButton}>
                  이미지로 저장하기
                </ActionButton>
              </LoggingClick>
              <LoggingClick eventKey='luckyTimeCapsule'>
                <ActionButton
                  size='medium'
                  variant='primary'
                  onClick={handleClickLucky}
                  disabled={resolutionData?.hasDrawnLuckyPick}
                >
                  행운의 타임캡솝 뽑기
                </ActionButton>
              </LoggingClick>
            </StyledModalFooter>
          </BottomSheetContent>
        </ModalBottomSheet>
      </Responsive>
    </>
  );
};

export default ResolutionReadModal;

const StyledModal = styled(Modal)`
  padding: 48px 0 20px;
  width: 375px;
  max-height: 100vh;
  overflow-y: auto;

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }
`;

const BottomSheetContent = styled.div`
  padding: 42px 16px 20px;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledModalContent = styled(ModalContent)`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 0 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0;
    width: 100%;
  }
`;

const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 0 24px;
  width: 100%;

  button {
    flex: 1 1 0;
    height: 44px;
    font-size: 14px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0;
  }

  @media ${MB_MID_MEDIA_QUERY} {
    margin-left: 0;
  }
`;
