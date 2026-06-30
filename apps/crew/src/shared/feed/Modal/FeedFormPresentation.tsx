import { getPresignedUrl, uploadImage } from '@api/image';
import CameraIcon from '@assets/svg/camera.svg';
import CancelIcon from '@assets/svg/x_big_gray.svg';
import { FORM_TITLE_MAX_LENGTH } from '@constant/feed';
import { imageS3Bucket } from '@constant/url';
import { useDisplay } from '@hook/useDisplay';
import FormController from '@shared/form/FormController';
import { Divider } from '@shared/util/Divider';
import { fontsObject } from '@sopt-makers/fonts';
import { useToast } from '@sopt-makers/ui';
import { colors, spacingBase, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@type/form';
import { getResizedImage } from '@util/image';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

import CommonMention from '../Mention';
import MumuLetter from '../MumuLetter';
import { ERROR_MESSAGE } from './feedSchema';
import ImagePreview from './ImagePreview';
import SelectMeeting from './SelectMeeting';

export interface GroupInfo {
  id?: number;
  title: string;
  imageUrl: string;
  category: string;
  contents?: string;
}

interface PresentationProps {
  userId?: number;
  groupInfo?: GroupInfo;
  attendGroupsInfo?: GroupInfo[];
  title: string;
  handleModalClose: () => void;
  handleDeleteImage: (index: number) => void;
  setMeetingInfo?: (meeting: GroupInfo) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled: boolean;
}
interface FileChangeHandler {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
}

function FeedFormPresentation({
  userId,
  groupInfo,
  attendGroupsInfo = [],
  title,
  handleModalClose,
  handleDeleteImage,
  setMeetingInfo,
  onSubmit,
  disabled = true,
}: PresentationProps) {
  const { open } = useToast();
  const { isMobile } = useDisplay();

  const textAreaRef = useRef(null);
  const [selectedMeeting, setSelectedMeeting] = useState<GroupInfo | undefined>(undefined);

  const onDeleteFile = (index: number) => () => handleDeleteImage(index);

  const handleAddFiles =
    ({ imageUrls, onChange }: FileChangeHandler) =>
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const newFiles = Array.from(e.target.files);
      if (newFiles.some((file) => file.size > MAX_FILE_SIZE)) {
        alert('5MB 이하의 사진만 업로드할 수 있습니다.');
        return;
      }
      const filesCount = imageUrls.length + newFiles.length;
      if (filesCount > 10) {
        alert('이미지는 최대 10개까지 업로드 가능합니다.');
        return;
      } else {
        const urls = await Promise.all(newFiles.map(async (file) => await uploadFile(file)));
        onChange([...imageUrls, ...urls]);
      }
      ampli.attachFeedPhoto({
        user_id: userId,
        platform_type: window.innerWidth > 768 ? 'PC' : 'MO',
      });
    };

  const uploadFile = async (file: File) => {
    const extension = file.type.split('/')[1];
    const { url, fields } = await getPresignedUrl({
      contentType: extension ?? '',
    });
    await uploadImage(file, url, fields);
    const imageUrls = imageS3Bucket + fields.key;
    return imageUrls;
  };

  const handleSelectMeeting = (meeting: GroupInfo) => {
    setSelectedMeeting(meeting);
    setMeetingInfo?.(meeting);
  };

  return (
    <SFormContainer>
      <SForm onSubmit={onSubmit}>
        <SFormHeader>
          <SCancelIcon onClick={handleModalClose} />
          <SFormName>{title}</SFormName>
          {isMobile ? (
            <SSubmitButton type='submit' disabled={disabled}>
              완료
            </SSubmitButton>
          ) : (
            <ActionButton type='submit' size='small' variant='primary' disabled={disabled}>
              완료
            </ActionButton>
          )}
        </SFormHeader>
        <div>
          {attendGroupsInfo?.length === 0 && groupInfo ? (
            <SGroupInfoSection>
              <SThumbnailImage
                css={{
                  backgroundImage: `url(${getResizedImage(groupInfo.imageUrl, 168)})`,
                }}
              />
              <SCategory>{groupInfo.category}</SCategory>
              <STitle>{groupInfo.title}</STitle>
            </SGroupInfoSection>
          ) : (
            <SelectMeeting
              selectMeetingInfo={selectedMeeting}
              meetingList={attendGroupsInfo}
              onClick={handleSelectMeeting}
            />
          )}
        </div>

        <MumuLetterWrapper>
          <MumuLetter content='요즘 가장 관심 있는 것은 무엇인가요?' />
        </MumuLetterWrapper>

        <SDivider />
        <FormController
          name='title'
          defaultValue=''
          render={({ field: { value: titleValue, onChange, onBlur } }) => (
            <STitleInput
              type='text'
              placeholder='제목을 입력해 주세요. (최대 100자)'
              value={titleValue}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.length <= FORM_TITLE_MAX_LENGTH) {
                  onChange(inputValue);
                } else {
                  onChange(inputValue.substring(0, FORM_TITLE_MAX_LENGTH));
                  open({
                    icon: 'error',
                    content: ERROR_MESSAGE.TITLE.MAX,
                  });
                }
              }}
              onBlur={onBlur}
            />
          )}
        />
        <SDivider />
        <FormController
          name='contents'
          defaultValue=''
          render={({ field: { value: contentsValue, onChange } }) => (
            <SFeedContentTextArea>
              <CommonMention
                inputRef={textAreaRef}
                value={contentsValue}
                setValue={onChange}
                placeholder={'질문에 자유롭게 답장해주세요.\n’@’로 멤버를 언급해 작성할 수 있어요!'}
                setIsFocused={() => {}}
                setUserIds={() => {}}
                isComment={false}
              ></CommonMention>
            </SFeedContentTextArea>
          )}
        />
        <SDivider />
        <FormController
          name='images'
          defaultValue={[]}
          render={({ field: { value: imageUrls, onChange, onBlur } }) => (
            <>
              {!!(imageUrls as string[]).length && (
                <>
                  <SImageListWrapper>
                    {(imageUrls as string[]).map((url, idx) => (
                      <SImagePreviewHolder key={`${url}-${idx}`}>
                        <ImagePreview url={url} onDelete={onDeleteFile(idx)} />
                      </SImagePreviewHolder>
                    ))}
                  </SImageListWrapper>
                  <SImageListDivider />
                </>
              )}

              <SImageInputWrapper>
                <SFileInputWrapper>
                  <SFileInput
                    type='file'
                    multiple
                    accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                    onChange={handleAddFiles({ imageUrls, onChange })}
                    onBlur={onBlur}
                  />
                  <CameraIcon />
                </SFileInputWrapper>
                <SImageCount>{(imageUrls as string[]).length} / 10</SImageCount>
              </SImageInputWrapper>
            </>
          )}
        />
      </SForm>
    </SFormContainer>
  );
}

export default FeedFormPresentation;

const SFormContainer = styled('div', {
  'width': '100%',
  'height': '100%',
  'padding': 0,
  'background': colors.bg.layer.default,
  'borderRadius': '15px',
  '@mobile': {
    padding: '30px 0 0 0',
    background: '$gray950',
    height: '100vh',
    borderRadius: '0',
  },
});

const SForm = styled('form', {
  'display': 'flex',
  'flexDirection': 'column',
  'height': '100%',
  'minHeight': 0,

  '& > *': {
    flexShrink: 0,
  },
});

const SFormName = styled('h1', {
  'fontStyle': 'H1',
  'color': '$gray10',

  '@mobile': {
    margin: 0,
    fontStyle: 'T3',
  },
});

const SFormHeader = styled('div', {
  'display': 'flex',
  'justifyContent': 'space-between',
  'alignItems': 'center',
  'padding': `${spacingBase.s40} ${spacingBase.s40} ${spacingBase.s32} ${spacingBase.s40}`,

  '@mobile': {
    padding: `0 ${spacingBase.s20} ${spacingBase.s32}`,
  },
});

const SCancelIcon = styled(CancelIcon, {
  cursor: 'pointer',
});

const SSubmitButton = styled('button', {
  ...fontsObject.TITLE_6_16_SB,
  'color': colors.fg.neutral.bold,
  'variants': {
    disabled: {
      true: {
        color: '$gray500',
        cursor: 'not-allowed',
      },
    },
  },
  '@mobile': {
    fontStyle: 'T4',
  },
});

const SGroupInfoSection = styled('div', {
  'mt': '$40',
  'flexType': 'verticalCenter',
  'width': `calc(100% - ${spacingBase.s80})`,
  'padding': `${spacingBase.s24} ${spacingBase.s8}`,
  'marginInline': spacingBase.s40,
  'boxSizing': 'border-box',

  '@mobile': {
    width: `calc(100% - ${spacingBase.s40})`,
    padding: `${spacingBase.s16} ${spacingBase.s8}`,
    marginInline: spacingBase.s20,
  },
});

const SThumbnailImage = styled('div', {
  'width': '56px',
  'height': '56px',
  'borderRadius': '$6',
  'overflow': 'hidden',
  'backgroundColor': '$gray800',
  'backgroundSize': 'cover',
  'backgroundPosition': 'center center',
  'backgroundRepeat': 'no-repeat',
  '@mobile': {
    width: '40px',
    height: '40px',
  },
});

const SCategory = styled('p', {
  'color': '$gray400',
  'fontStyle': 'T3',
  'ml': '$20',
  '@mobile': {
    fontStyle: 'T4',
    ml: '$12',
  },
});

const STitle = styled('p', {
  'maxWidth': '70%',
  'color': '$white',
  'fontStyle': 'T3',
  'ml': '$8',
  'overflow': 'hidden',
  'whiteSpace': 'nowrap',
  'textOverflow': 'ellipsis',
  'wordBreak': 'break-all',

  '@mobile': {
    fontStyle: 'T4',
  },
});

const SDivider = styled(Divider, {
  width: `calc(100% - ${spacingBase.s40})`,
  marginInline: spacingBase.s20,
  backgroundColor: colors.stroke.neutral.default,
});

const STitleInput = styled('input', {
  'display': 'block',
  'width': `calc(100% - ${spacingBase.s80})`,
  'color': colors.fg.neutral.bold,
  'padding': `${spacingBase.s24} ${spacingBase.s8}`,
  'marginInline': spacingBase.s40,
  'boxSizing': 'border-box',
  ...typography.title3,

  '&::placeholder': {
    color: colors.fg.neutral.subtle,
    opacity: 1,
  },

  '@mobile': {
    'width': `calc(100% - ${spacingBase.s40})`,
    'padding': `${spacingBase.s16} ${spacingBase.s8}`,
    'marginInline': spacingBase.s20,
    ...typography.title4,

    '&::placeholder': {
      color: colors.fg.neutral.ghost,
    },
  },
});

const SFeedContentTextArea = styled('div', {
  'width': `calc(100% - ${spacingBase.s80})`,
  'height': 'auto',
  'padding': `${spacingBase.s24} ${spacingBase.s8}`,
  'marginInline': spacingBase.s40,
  'boxSizing': 'border-box',
  'border': 'none',
  'resize': 'none',
  'color': colors.fg.neutral.bold,
  'backgroundColor': 'inherit',
  'flex': '1 1 auto',
  'minHeight': 0,
  'overflow': 'hidden',
  ...typography.body1,

  '& textarea::placeholder': {
    color: colors.fg.neutral.subtle,
    opacity: 1,
  },

  '@mobile': {
    'width': `calc(100% - ${spacingBase.s40})`,
    'padding': `${spacingBase.s16} ${spacingBase.s8}`,
    'marginInline': spacingBase.s20,
    ...typography.body2,

    '& textarea::placeholder': {
      color: colors.fg.neutral.ghost,
    },
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const MumuLetterWrapper = styled('div', {
  'paddingInline': spacingBase.s40,
  'marginBottom': spacingBase.s20,

  '@mobile': {
    paddingInline: spacingBase.s20,
    marginTop: spacingBase.s4,
  },
});

const SImagePreviewHolder = styled('div', {
  'width': '108px',
  'height': '108px',
  'mb': '$24',
  'mr': '$12',
  '@mobile': {
    width: '84px',
    height: '84px',
  },
});

const SFileInputWrapper = styled('label', {
  position: 'relative',
  cursor: 'pointer',
});

const SFileInput = styled('input', {
  position: 'absolute',
  margin: '-1px',
  width: '1px',
  height: '1px',
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
});

const SImageCount = styled('p', {
  color: colors.fg.neutral.default,
  ...typography.label1,
});

const SImageInputWrapper = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'width': `calc(100% - ${spacingBase.s80})`,
  'padding': `${spacingBase.s24} ${spacingBase.s8}`,
  'marginInline': spacingBase.s40,
  'boxSizing': 'border-box',

  '@mobile': {
    width: `calc(100% - ${spacingBase.s40})`,
    padding: `${spacingBase.s16} ${spacingBase.s8}`,
    marginInline: spacingBase.s20,
  },
});

const SImageListWrapper = styled('div', {
  'display': 'flex',
  'overflowX': 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '& > div:first-child': {
    ml: '$16',
  },
  '& > div:last-child': {
    mr: '$16',
  },
});

const SImageListDivider = styled(Divider, {
  mt: '$0',
  mb: '$24',
  backgroundColor: '$gray600',
});
