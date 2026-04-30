import { participationIntensityOptions, participationMethodOptions } from '@data/options';
import ErrorMessage from '@shared/form/ErrorMessage';
import FormController from '@shared/form/FormController';
import HelpMessage from '@shared/form/HelpMessage';
import Label from '@shared/form/Label';
import { fontsObject } from '@sopt-makers/fonts';
import { Chip } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

const ParticipationInfoField = () => {
  return (
    <div>
      <Label required>참여 정보</Label>
      <HelpMessage>모임 참여 방식과 강도를 선택해주세요.각 1가지</HelpMessage>
      <SFieldWrapper>
        <div>
          <SSubLabel>참여 방식</SSubLabel>
          <FormController
            name='participationMethod'
            defaultValue=''
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <SChipContainer>
                  {participationMethodOptions.map((option) => (
                    <Chip
                      key={option.value}
                      active={value === option.value}
                      onClick={() => onChange(value === option.value ? '' : option.value)}
                    >
                      {option.label}
                    </Chip>
                  ))}
                </SChipContainer>
                {error && <ErrorMessage style={{ marginTop: '12px' }}>{error.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
        <div>
          <SSubLabel>참여 강도</SSubLabel>
          <FormController
            name='participationIntensity'
            defaultValue=''
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <>
                <SChipContainer>
                  {participationIntensityOptions.map((option) => (
                    <Chip
                      key={option.value}
                      active={value === option.value}
                      onClick={() => onChange(value === option.value ? '' : option.value)}
                    >
                      {option.label}
                    </Chip>
                  ))}
                </SChipContainer>
                {error && <ErrorMessage style={{ marginTop: '12px' }}>{error.message}</ErrorMessage>}
              </>
            )}
          />
        </div>
      </SFieldWrapper>
    </div>
  );
};

export default ParticipationInfoField;

const SFieldWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$20',
});

const SSubLabel = styled('p', {
  ...fontsObject.LABEL_4_12_SB,
  'color': '$gray100',
  'marginBottom': '$8',

  '@media(max-width: 767px)': {
    marginBottom: '$3',
  },
});

const SChipContainer = styled('div', {
  'display': 'flex',
  'gap': '$10',
  'flexWrap': 'wrap',

  '@media(max-width: 430px)': {
    maxWidth: '320px',
  },
});
