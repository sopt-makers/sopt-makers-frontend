# Playground HTTP 클라이언트

저장소 루트에서 `nvm use`로 Node 22를 선택합니다. 서비스 주소, API key, 토큰 저장소와 로그인 이동 정책은 `index.ts`에서 연결합니다. `httpClient.ts`와 `tokenRefresh.ts`는 환경변수나 라우터를 직접 참조하지 않습니다.

## 요청

`httpClient`, `crewHttpClient`, `authHttpClient`, `adminHttpClient`, `operationHttpClient`를 서비스에 맞게 사용합니다. `crewHttpClient`는 Playground에서 Crew API를 호출할 때 사용하는 클라이언트입니다.

```ts
import { httpClient } from '@/api';

const questions = await httpClient.request<QuestionsResponse>(`api/v1/sopmodam/rounds/${roundId}/questions`, {
  signal,
});

await httpClient.request<void>(`api/v1/sopmodam/rounds/${roundId}/vote`, {
  method: 'POST',
  json: { questionId },
});
```

- `method` 생략 시 GET입니다. `searchParams`로 쿼리 파라미터를 전달합니다.
- base URL에 `/v2` 같은 경로가 있으면 `reviews`와 `/reviews` 모두 해당 경로 뒤에 이어 붙입니다. 같은 origin의 절대 URL은 지정된 주소 그대로 사용합니다.
- JSON 요청은 `json`, FormData 등의 요청은 `body`를 사용합니다. FormData의 Content-Type은 브라우저가 설정하도록 둡니다.
- 기본 `Accept`는 기존 Axios와 같은 `*/*`입니다. 필요하면 클라이언트나 요청의 `headers`에서 변경합니다.
- JSON 응답은 파싱한 본문을, JSON이 아닌 응답은 문자열을 반환합니다. 빈 본문과 204 응답은 `undefined`이므로 해당 호출의 반환 타입에 반영합니다.
- 제네릭은 타입 선언입니다. 실제 응답의 Zod 검증과 도메인별 변환은 엔드포인트에서 담당합니다.
- 기본 타임아웃은 기존 Axios와 동일하게 제한하지 않습니다. 필요한 요청에 `timeout`을 밀리초로 지정할 수 있습니다.
- 클라이언트에 설정된 origin에만 요청할 수 있습니다.

## 인증과 재시도

Playground·Crew API에는 저장된 Bearer 토큰을 넣습니다. 인증 API는 `credentials: 'include'`, 나머지는 `'same-origin'`을 사용합니다. Admin·Operation API에는 API key를 넣습니다.

Playground·Crew API 클라이언트는 동일한 토큰 갱신 인스턴스를 공유합니다. 동시 401은 갱신 요청 하나를 기다리고, 갱신 이후 늦게 도착한 이전 토큰의 401도 발급된 토큰을 재사용합니다. 토큰 없이 보낸 요청의 늦은 401도 같은 규칙을 적용합니다. 각 원본 요청은 갱신 후 한 번만 재전송합니다.

Ky의 일반 자동 재시도는 끕니다. 조회 재시도는 기존 TanStack Query의 `shouldRetryQuery`가 담당하며, 갱신 후에도 401인 요청과 취소된 요청은 재시도하지 않습니다. 기존 Query key는 엔드포인트에 유지합니다.

## 오류

```ts
import { ApiError } from '@/api/apiError';

try {
  await httpClient.request<void>(path, { method: 'POST', json: input });
} catch (error) {
  if (error instanceof ApiError && error.kind === 'http') {
    // error.status: HTTP 상태, error.code: 서버의 code 또는 errorCode
  }
  throw error;
}
```

`kind`는 `http`, `network`, `timeout`, `cancelled`, `unknown`으로 구분합니다. 오류에 요청 객체나 인증 헤더는 담지 않습니다. 화면과 엔드포인트는 `ApiError.status`, `code`, `data`로 오류를 처리합니다.

## 엔드포인트와 캐시

`createEndpoint.ts`는 `url`과 공통 클라이언트의 요청 옵션을 받아 응답을 Zod로 검사합니다. 요청 본문은 `json`, 쿼리 파라미터는 `searchParams`, 서비스 선택은 `client`로 전달합니다.

캐시 키는 기존과 동일하게 `[method, url, ...params]`를 유지합니다. 검증 실패 시의 기존 `DEBUG` 정책도 유지합니다.

Presigned URL 업로드는 토큰과 API key를 넣지 않는 클라이언트를 사용하며, `credentials: 'omit'`과 원본 File 본문으로 전송합니다.
