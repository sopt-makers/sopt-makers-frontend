import KakaoMapIcon from '@assets/svg/kakao_map.svg?rect';
import NaverMapIcon from '@assets/svg/naver_map.svg?rect';
import { spacing, typography } from '@sopt-mds/design-tokens';
import { TextField } from '@sopt-mds/ui';
import { useController } from 'react-hook-form';
import { styled } from 'stitches.config';

import type { RoundFieldValues } from '../../schema';
import { SDescription, SFieldHeader, SLabel } from '../style';

const LocationFields = () => {
  const { field: place, fieldState: placeState } = useController<RoundFieldValues, 'place'>({ name: 'place' });
  const { field: naverMapLink, fieldState: naverState } = useController<RoundFieldValues, 'naverMapLink'>({
    name: 'naverMapLink',
  });
  const { field: kakaoMapLink, fieldState: kakaoState } = useController<RoundFieldValues, 'kakaoMapLink'>({
    name: 'kakaoMapLink',
  });

  return (
    <>
      <TextField
        {...place}
        label='회식 장소'
        description='체인점의 경우, 정확한 지점명을 입력해 주세요.'
        placeholder='회식 장소'
        maxLength={30}
        errorMessage={placeState.error?.message}
      />
      <SMapField role='group' aria-labelledby='settlement-map-links-label'>
        <SFieldHeader>
          <SLabel as='div' id='settlement-map-links-label'>
            장소 링크
          </SLabel>
          <SDescription>장소 안내를 위해 네이버지도 또는 카카오맵 링크를 하나 이상 입력해 주세요.</SDescription>
        </SFieldHeader>
        <SMapLinks>
          <SMapRow>
            <SMapLabel htmlFor='settlement-naver-map'>
              <NaverMapIcon width={24} height={24} aria-hidden focusable='false' />
              네이버지도
            </SMapLabel>
            <SMapInput
              {...naverMapLink}
              id='settlement-naver-map'
              placeholder='회식 장소'
              errorMessage={naverState.error?.message}
              inputMode='url'
              autoCapitalize='none'
              autoCorrect='off'
              spellCheck={false}
            />
          </SMapRow>
          <SMapRow>
            <SMapLabel htmlFor='settlement-kakao-map'>
              <KakaoMapIcon width={24} height={24} aria-hidden focusable='false' />
              카카오맵
            </SMapLabel>
            <SMapInput
              {...kakaoMapLink}
              id='settlement-kakao-map'
              placeholder='회식 장소'
              errorMessage={kakaoState.error?.message}
              inputMode='url'
              autoCapitalize='none'
              autoCorrect='off'
              spellCheck={false}
            />
          </SMapRow>
        </SMapLinks>
      </SMapField>
    </>
  );
};

export default LocationFields;

const SMapField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s10,
});

const SMapLinks = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.s8,
});

const SMapRow = styled('div', { display: 'flex', alignItems: 'flex-start', gap: spacing.s4 });

const SMapLabel = styled('label', {
  ...typography.title5,
  'display': 'flex',
  'alignItems': 'center',
  'gap': spacing.s8,
  'padding': spacing.s10,
  'flex': '0 0 121px',
  'whiteSpace': 'nowrap',
  '& svg': { flexShrink: 0 },
});

const SMapInput = styled(TextField, { flex: 1, minWidth: 0 });
