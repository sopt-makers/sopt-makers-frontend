import { TURNSTILE_ACTION, TURNSTILE_SCRIPT_URL } from '@constant/turnstile';
import type { useTurnstile } from '@hook/useTurnstile';
import Script from 'next/script';
import { styled } from 'stitches.config';

type TurnstileProps = Pick<
  ReturnType<typeof useTurnstile>,
  'containerRef' | 'status' | 'handleScriptReady' | 'handleError' | 'retry'
>;

const Turnstile = ({ containerRef, status, handleScriptReady, handleError, retry }: TurnstileProps) => {
  return (
    <SContainer role='group' aria-label='신청 보안 확인'>
      <Script
        id='crew-turnstile'
        src={TURNSTILE_SCRIPT_URL}
        strategy='afterInteractive'
        onLoad={handleScriptReady}
        onReady={handleScriptReady}
        onError={handleError}
      />
      <SWidget ref={containerRef} data-action={TURNSTILE_ACTION} />
      <SMessage aria-live='polite'>
        {status === 'error' && (
          <>
            보안 확인을 완료하지 못했어요. 네트워크나 광고 차단 설정을 확인해주세요.
            <button type='button' onClick={retry}>
              다시 확인
            </button>
          </>
        )}
      </SMessage>
    </SContainer>
  );
};

export default Turnstile;

const SContainer = styled('div', {
  width: '300px',
  maxWidth: '100%',
  margin: '0 auto',
});

const SWidget = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});

const SMessage = styled('p', {
  'margin': 0,
  'color': '$gray400',
  'fontSize': '12px',
  'lineHeight': '18px',
  'textAlign': 'center',
  '&:not(:empty)': {
    marginBottom: '12px',
  },
  'button': {
    'display': 'block',
    'margin': '4px auto 0',
    'color': '$gray10',
    'textDecoration': 'underline',
    '&:focus-visible': {
      outline: '2px solid $gray200',
      outlineOffset: '3px',
      borderRadius: '2px',
    },
  },
});
