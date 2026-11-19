const KAKAO_CHANNEL_PUBLIC_ID = '_sxaIWG';
const KAKAO_CHANNEL_CHAT_URL = `https://pf.kakao.com/${KAKAO_CHANNEL_PUBLIC_ID}/chat`;

export const openKakaoChat = (): void => {
  if (typeof window === 'undefined') return;

  try {
    const kakao = window.Kakao;
    if (kakao?.isInitialized?.() && typeof kakao.Channel?.chat === 'function') {
      kakao.Channel.chat({ channelPublicId: KAKAO_CHANNEL_PUBLIC_ID });
      return;
    }
  } catch {
    // SDK 호출 실패 시 아래의 문의 URL 이동으로 대체합니다.
  }

  window.location.assign(KAKAO_CHANNEL_CHAT_URL);
};
