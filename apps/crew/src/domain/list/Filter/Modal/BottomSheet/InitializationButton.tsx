import ResetIcon from '@assets/svg/reset.svg?rect';
import { Flex } from '@shared/util/layout/Flex';
import { mergeCss } from '@util/styles';
import { useRouter } from 'next/router';
import type { CSSType } from 'stitches.config';
import { styled } from 'stitches.config';
interface InitializationButtonProp {
  css?: CSSType;
  withText?: boolean;
  size?: number;
}
function InitializationButton({ css, withText = true, size = 16 }: InitializationButtonProp) {
  const router = useRouter();
  const onClickInitialization = () => {
    router.push(
      {
        query: {
          page: 1,
        },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <Flex
      className='initialize-button'
      as='button'
      css={mergeCss(
        {
          '@mobile': {
            alignSelf: 'start',
            marginTop: '16px',
          },
        },
        css,
      )}
      onClick={onClickInitialization}
    >
      <ResetIcon width={size} height={size} />
      {withText && <InitializationText>초기화</InitializationText>}
    </Flex>
  );
}

export default InitializationButton;

const InitializationText = styled('span', {
  'fontAg': '18_medium_100',
  'color': '$gray10',
  'ml': '$6',
  'whiteSpace': 'nowrap',
  '@mobile': {
    display: 'none',
  },
});
