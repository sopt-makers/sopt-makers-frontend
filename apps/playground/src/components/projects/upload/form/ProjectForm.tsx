import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@sopt-makers/colors';
import { colorFg, spacing, typography } from '@sopt-mds/design-tokens';
import { IconPlus } from '@sopt-mds/icons';
import { ActionButton } from '@sopt-mds/ui';
import type { ReactNode } from 'react';
import type { DefaultValues } from 'react-hook-form';
import { Controller, useFieldArray, useForm, useFormState, useWatch } from 'react-hook-form';

import Button from '@/components/common/Button';
import Divider from '@/components/common/Divider/Divider';
import ImageUploader from '@/components/common/ImageUploader';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import TextArea from '@/components/common/TextArea';
import { DEFAULT_IMAGE_URL, DEFAULT_LINK, DEFAULT_MEMBER } from '@/components/projects/upload/form/constants';
import CategoryField from '@/components/projects/upload/form/fields/CategoryField';
import GenerationField from '@/components/projects/upload/form/fields/GenerationField';
import LinkField from '@/components/projects/upload/form/fields/LinkField';
import MemberField from '@/components/projects/upload/form/fields/MemberField';
import PeriodField from '@/components/projects/upload/form/fields/PeriodField';
import ServiceTypeField from '@/components/projects/upload/form/fields/ServiceTypeField';
import StatusField from '@/components/projects/upload/form/fields/StatusField';
import ListImageUploader from '@/components/projects/upload/form/ListImageUploader';
import FormEntry from '@/components/projects/upload/form/presenter/FormEntry';
import type { ProjectFormType } from '@/components/projects/upload/form/schema';
import { defaultUploadValues, uploadSchema } from '@/components/projects/upload/form/schema';
import UploadProjectProgress from '@/components/projects/upload/form/UploadProjectProgress';
import { getMemberSummary } from '@/components/projects/utils';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const PROJECT_IMAGE_MAX_LENGTH = 10;

interface ProjectFormProps {
  onSubmit?: (formData: ProjectFormType) => void;
  submitButtonContent: ReactNode;
  defaultValues?: DefaultValues<ProjectFormType>;
  hideProgress?: boolean;
}

const ProjectForm = ({
  onSubmit,
  submitButtonContent,
  defaultValues = defaultUploadValues,
  hideProgress = false,
}: ProjectFormProps) => {
  const { control, handleSubmit, register, formState } = useForm<ProjectFormType>({
    resolver: zodResolver(uploadSchema),
    defaultValues,
    mode: 'all',
  });
  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: 'members',
  });
  const {
    fields: releaseMemberFields,
    append: appendReleaseMember,
    remove: removeReleaseMember,
  } = useFieldArray({
    control,
    name: 'releaseMembers',
  });
  const {
    fields: projectImageFields,
    append: appendProjectImage,
    remove: removeProjectImage,
  } = useFieldArray({
    control,
    name: 'projectImages',
  });
  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: 'links',
  });

  const {
    projectImages,
    members: watchedMembers,
    releaseMembers: watchedReleaseMembers,
  } = useWatch({
    control,
  });

  const memberSummary = getMemberSummary(watchedMembers);
  const releaseMemberSummary = getMemberSummary(watchedReleaseMembers);

  const { errors } = useFormState({
    control,
  });

  const submit = (data: ProjectFormType) => {
    onSubmit?.(data);
  };

  return (
    <StyledFormContainer>
      <Responsive only='desktop'>{!hideProgress && <StyledFormProgress formState={formState} />}</Responsive>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <StyledTitle>
          <Text typography='SUIT_24_B'>프로젝트</Text>
          <Responsive only='desktop'>
            <Text typography='SUIT_16_M' color={colors.gray400}>
              프로젝트가 등록되면 SOPT 공식홈페이지에도 업로드 되기 때문에 꼼꼼하게 작성해주세요!
            </Text>
          </Responsive>
          <Responsive only='mobile'>
            <Text typography='SUIT_14_M' color={colors.gray400}>
              프로젝트가 등록되면 SOPT 공식홈페이지에도 <br />
              업로드 되기 때문에 꼼꼼하게 작성해주세요!
            </Text>
          </Responsive>
          <StyledDivider />
        </StyledTitle>
        <FormEntry title='프로젝트 이름' required>
          <StyledInput {...register('name')} placeholder='프로젝트' errorMessage={errors.name?.message ?? ''} />
        </FormEntry>
        <FormEntry title='기수' description='참여한 팀원들의 기수에 맞춰 작성해주세요' required>
          <Controller
            control={control}
            name='generation'
            render={({ field }) => (
              <GenerationField {...field} defaultValue='' errorMessage={errors.generation?.message} />
            )}
          />
        </FormEntry>
        <FormEntry title='어디서 진행했나요?' description='기수는 SOPT 공식 활동을 기준으로 선택해주세요' required>
          <Controller
            control={control}
            name='category'
            render={({ field }) => (
              <CategoryField {...field} errorMessage={errors.category?.message} isError={!!errors.category} />
            )}
          />
        </FormEntry>
        <FormEntry title='프로젝트 현재 상태'>
          <Controller control={control} name='status' render={({ field }) => <StatusField {...field} />} />
        </FormEntry>
        <FormEntry
          title={`프로젝트 팀원`}
          required
          description='회원가입을 한 사람만 팀원 등록이 가능해요. 등록 시 입력한 순서대로 표시되니, 자유롭게 순서를 조정하세요.'
        >
          <StyledFieldsWrapper>
            {memberFields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`members.${index}`}
                render={({ field }) => (
                  <MemberField
                    errorMessage={{
                      ...(errors.members && {
                        memberId: errors.members[index]?.memberId?.message,
                        memberRole: errors.members[index]?.memberRole?.message,
                      }),
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => removeMember(index)}
                  />
                )}
              />
            ))}
          </StyledFieldsWrapper>
          <StyledBottomContainer>
            <StyledInfo>
              <InfoTitle>현재 {memberSummary.count}명 입력</InfoTitle>
              {memberSummary.count > 0 && <InfoDetail>{memberSummary.detail}</InfoDetail>}
            </StyledInfo>
            <ActionButton
              variant='secondary'
              size='medium'
              leftAddon={<IconPlus />}
              type='button'
              onClick={() => appendMember(DEFAULT_MEMBER)}
            >
              팀원 추가하기
            </ActionButton>
          </StyledBottomContainer>
        </FormEntry>
        <FormEntry
          title='추가 합류한 팀원'
          description='릴리즈에 합류한 팀원들의 이름을 적어주세요. 회원가입을 한 사람만 팀원 등록이 가능해요'
        >
          <StyledFieldsWrapper>
            {releaseMemberFields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`releaseMembers.${index}`}
                render={({ field }) => (
                  <MemberField
                    errorMessage={{
                      ...(errors.releaseMembers && {
                        memberId: errors.releaseMembers[index]?.memberId?.message,
                        memberRole: errors.releaseMembers[index]?.memberRole?.message,
                      }),
                    }}
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => removeReleaseMember(index)}
                  />
                )}
              />
            ))}
          </StyledFieldsWrapper>
          <StyledBottomContainer>
            <StyledInfo>
              <StyledInfo>
                <InfoTitle>현재 {releaseMemberSummary.count}명 입력</InfoTitle>
                {releaseMemberSummary.count > 0 && <InfoDetail>{releaseMemberSummary.detail}</InfoDetail>}
              </StyledInfo>
            </StyledInfo>
            <ActionButton
              variant='secondary'
              size='medium'
              leftAddon={<IconPlus />}
              type='button'
              onClick={() => appendReleaseMember(DEFAULT_MEMBER)}
            >
              팀원 추가하기
            </ActionButton>
          </StyledBottomContainer>
        </FormEntry>
        <FormEntry title='서비스 형태' required comment='복수 선택 가능'>
          <Controller
            control={control}
            name='serviceType'
            render={({ field }) => <ServiceTypeField {...field} errorMessage={errors.serviceType?.message} />}
          />
        </FormEntry>
        <FormEntry title='프로젝트 기간' required>
          <Controller
            control={control}
            name='period'
            render={({ field }) => (
              <PeriodField
                {...field}
                errorMessage={errors.period?.startAt?.message ?? errors.period?.endAt?.message}
                isStartError={!!errors.period?.startAt}
                isEndError={!!errors.period?.endAt}
              />
            )}
          />
        </FormEntry>
        <FormEntry title='프로젝트 한줄 소개' required>
          <StyledInput
            {...register('summary')}
            placeholder='프로젝트 한줄 소개'
            error={!!errors.summary}
            count
            maxCount={30}
          />
          <ErrorMessage message={errors.summary?.message} />
        </FormEntry>
        <FormEntry title='프로젝트 설명' required>
          <StyledTextArea
            {...register('detail')}
            placeholder='프로젝트에 대해 설명해주세요'
            error={!!errors.detail}
            count
            maxCount={500}
          />
          <ErrorMessage message={errors.detail?.message} />
        </FormEntry>
        <FormEntry
          title='로고 이미지'
          required
          description='가로 300px 세로 300px을 권장해요. 예외 규격은 잘릴 수 있어요.'
        >
          <Controller
            control={control}
            name='logoImage'
            render={({ field }) => (
              <ImageUploader width={104} height={104} errorMessage={errors.logoImage?.message} {...field} />
            )}
          />
        </FormEntry>
        <FormEntry
          title='썸네일 이미지'
          required
          description={
            <>
              16:9 비율로 가로 368px 세로208px을 권장해요.
              <Responsive only='mobile'>웹페이지에서 등록을 권장해요.</Responsive>
            </>
          }
        >
          <Controller
            control={control}
            name='thumbnailImage'
            render={({ field }) => (
              <>
                <Responsive only='desktop'>
                  <ImageUploader width={368} height={208} errorMessage={errors.thumbnailImage?.message} {...field} />
                </Responsive>
                <Responsive only='mobile'>
                  <ImageUploader width='100%' height={185} errorMessage={errors.thumbnailImage?.message} {...field} />
                </Responsive>
              </>
            )}
          />
        </FormEntry>
        <FormEntry
          title='프로젝트 이미지 (최대 10장까지 업로드 가능)'
          description='10MB 이내로 가로 1200px, 세로는 675px 사이즈를 권장해요.'
          required
        >
          <ProjectImageWrapper>
            {projectImageFields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`projectImages.${index}`}
                render={({ field }) => {
                  const commonProps = {
                    ...field,
                    value: field.value.imageUrl,
                    onChange: (value: string) => {
                      field.onChange({ imageUrl: value });
                      const isEdit = field.value.imageUrl !== DEFAULT_IMAGE_URL;
                      if (!isEdit && value && projectImageFields.length < PROJECT_IMAGE_MAX_LENGTH) {
                        appendProjectImage({ imageUrl: DEFAULT_IMAGE_URL });
                      }
                    },
                    onDelete: () => {
                      const isFilled =
                        projectImages?.filter((image) => image.imageUrl !== DEFAULT_IMAGE_URL).length ===
                        PROJECT_IMAGE_MAX_LENGTH;
                      if (projectImageFields.length > 1 && !isFilled) {
                        removeProjectImage(index);
                      } else {
                        field.onChange({ imageUrl: DEFAULT_IMAGE_URL });
                      }
                    },
                    errorMessage: errors.projectImages?.message,
                  };
                  return (
                    <>
                      <Responsive only='desktop'>
                        <ListImageUploader width={192} height={108} {...commonProps} />
                      </Responsive>
                      <Responsive only='mobile'>
                        <ListImageUploader width={158} height={89} {...commonProps} />
                      </Responsive>
                    </>
                  );
                }}
              />
            ))}
          </ProjectImageWrapper>
        </FormEntry>
        <FormEntry
          title='링크'
          description={
            <>
              <Responsive only='desktop'>
                웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상, 관련자료, instagram 등을 자유롭게
                업로드해주세요
              </Responsive>
              <Responsive only='mobile'>관련 자료를 자유롭게 업로드해주세요</Responsive>
            </>
          }
        >
          <StyledFieldsWrapper>
            {linkFields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`links.${index}`}
                render={({ field }) => <LinkField {...field} onRemove={() => removeLink(index)} />}
              />
            ))}
          </StyledFieldsWrapper>
          <StyledLinkBtnContainer>
            <ActionButton
              variant='secondary'
              size='medium'
              leftAddon={<IconPlus />}
              type='button'
              onClick={() => appendLink(DEFAULT_LINK)}
            >
              링크 추가하기
            </ActionButton>
          </StyledLinkBtnContainer>
        </FormEntry>
        <SubmitContainer>
          <StyledSubmitButton type='submit' variant='primary'>
            {submitButtonContent}
          </StyledSubmitButton>
        </SubmitContainer>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default ProjectForm;

const StyledFormContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const StyledFormProgress = styled(UploadProjectProgress)`
  flex-shrink: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 60px;
  border-radius: 12px;
  background-color: ${colors.gray800};
  padding: 47px 40px;
  width: 892px;

  @media screen and (max-width: 1055px) {
    border-radius: 0%;
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    background-color: ${colors.gray950};
    padding: 38px 24px 107px;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledDivider = styled(Divider)`
  margin-top: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 22px;
  }
`;

const StyledFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const StyledInput = styled(Input)`
  width: 340px;

  input::placeholder {
    color: ${colors.gray400};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    ${textStyles.SUIT_14_M};
  }
`;

const StyledTextArea = styled(TextArea)`
  min-height: 170px;

  ::placeholder {
    color: ${colors.gray400};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};
  }
`;

const ProjectImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 192px);
  gap: 15px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(2, 158px);
    gap: 10px;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
  }
`;

const StyledSubmitButton = styled(Button)`
  ${textStyles.SUIT_14_M};
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    width: 100%;
  }
`;

const StyledBottomContainer = styled.div`
  width: 100%;
  margin-top: ${spacing.s20};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s4};
  ${typography.label3}
`;

const InfoTitle = styled.p`
  color: ${colorFg.neutral.bold};
`;

const InfoDetail = styled.p`
  color: ${colorFg.neutral.subtle};
`;

const StyledLinkBtnContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: ${spacing.s20};
`;
