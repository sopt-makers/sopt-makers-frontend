# SOPT Crew Product <img src="https://github.com/sopt-makers/sopt-crew-frontend/assets/58380158/485fa458-b78f-4fba-aa83-5f230d3e4beb" align="left" width="100" />

> SOPT 구성원들이 하나로 모일 수 있는 모임 서비스

<img src="https://user-images.githubusercontent.com/58380158/228786812-912b193e-11d2-4b95-8e1f-38a04177c9f4.png" />

## Getting Started

### 1. node_modules 설치

```sh
yarn
```

### 2. 환경변수 등록

`.env.sample` 파일 이름을 `.env.local`로 변경하고, 내용을 채워주세요. `.env.local` 에 필요한 내용은 동료 개발자로부터 얻을 수 있어요.

### 3. API 코드 제너레이션

```sh
yarn workspace crew api:generate-types
```

OpenAPI 스키마는 Crew API v2 문서에서 생성하며, 생성된 파일은 직접 수정하지 않습니다.

| 명령어 | 설명 | 생성 파일 |
| --- | --- | --- |
| `yarn workspace crew api:generate-types` | Crew API v2 스키마 생성 | `src/__generated__/schema.d.ts` |
| `yarn workspace crew api:check` | 스키마를 다시 생성하고 커밋된 파일과 차이가 없는지 확인 | - |

### 4. 개발 서버 실행

```sh
yarn dev
```

## 🔍 프로젝트 배경

모임 서비스는 SOPT 구성원들이 하나로 모일 수 있는 순간을 제공하고, SOPT 내 존재하는 다양한 모임들을 보다 활성화하기 위해 탄생했어요.

## 📢 기능 소개

모임 서비스는 데스크탑과 모바일 환경에서 모두 사용 가능하며, **모임 개설, 신청, 관리**를 지원하고 있어요.<br />
모임 개설자는 모집 상태, 모집 대상을 설정해 목적에 맞게 모임을 개설하고 내 모임에서 신청 현황을 손쉽게 관리할 수 있어요.<br />
모임 신청자도 관심 있는 모임을 필터 및 검색 기능을 통해 찾아본 뒤, 모임 정보를 자세히 확인하고 신청할 수 있어요.<br />
내가 신청한 모임들은 내 모임에서 한눈에 확인할 수 있어요.

## 🛠️ 기술 스택

- TypeScript, React, Next.js
- React Context, TanStack Query, React Hook Form
- Stitches
- GitHub Actions
