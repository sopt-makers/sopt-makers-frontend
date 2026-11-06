import { useEffect, useState } from 'react';

interface WebViewInfo {
  isWebView: boolean;
  isIOSWebView: boolean;
  isAndroidWebView: boolean;
}

const INITIAL_WEB_VIEW_INFO: WebViewInfo = {
  isWebView: false,
  isIOSWebView: false,
  isAndroidWebView: false,
};

/**
 * SOPT 앱 웹뷰 여부를 판별합니다.
 * iOS·Android 앱 모두 웹뷰 User-Agent에 고유 문자열(SOPT-iOS, SOPT-Android)을 추가합니다.
 */
const useWebView = () => {
  const [webViewInfo, setWebViewInfo] = useState<WebViewInfo>(INITIAL_WEB_VIEW_INFO);

  useEffect(function detectWebView() {
    const userAgent = navigator.userAgent;
    const isIOSWebView = /SOPT-iOS/.test(userAgent);
    const isAndroidWebView = /SOPT-Android/.test(userAgent);

    setWebViewInfo({
      isWebView: isIOSWebView || isAndroidWebView,
      isIOSWebView,
      isAndroidWebView,
    });
  }, []);

  return webViewInfo;
};

export default useWebView;
