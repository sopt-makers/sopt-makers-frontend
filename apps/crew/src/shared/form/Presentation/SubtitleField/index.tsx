import FormController from '@shared/form/FormController';
import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import TextInput from '@shared/form/TextInput';
import { styled } from 'stitches.config';

const SubtitleField = () => {
  return (
    <SSubtitleField>
      <Label required>모임 한줄 소개</Label>
      <HelpMessage>모임을 한마디로 소개해주세요. 모임 이름 아래 한 줄로 보여지는 내용이에요.</HelpMessage>
      <FormController
        name='subTitle'
        render={({ field, fieldState: { error } }) => (
          <TextInput
            placeholder='ex. 온라인으로 가볍게 시작하는 피그마 스터디'
            maxLength={30}
            error={error?.message}
            {...field}
          />
        )}
      />
    </SSubtitleField>
  );
};

export default SubtitleField;

const SSubtitleField = styled('div', {
  width: '100%',
});
