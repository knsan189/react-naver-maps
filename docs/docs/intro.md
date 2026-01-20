---
sidebar_position: 1
---

# Intro

`@rousen/react-naver-maps`는 네이버 지도 API를 React에서 쉽게 사용할 수 있도록 만든 라이브러리입니다.
`react-map-gl`의 설계와 사용성에서 아이디어를 가져와 React 친화적인 API를 제공합니다.

## 설치

### NPM

```bash
npm install @rousen/react-naver-maps
```

TypeScript에서 `naver.maps.*` 전역 타입을 쓰려면 `@types/navermaps`를 개발 의존성으로 추가하세요.

```bash
npm install -D @types/navermaps
```

## 요구사항

- **React** >= 16.8.0 (Hooks 지원 필요)
- **React DOM** >= 16.8.0
- **네이버 클라우드 플랫폼(NCP) 클라이언트 ID**

### NCP 클라이언트 ID 발급

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/)에 가입합니다
2. 콘솔에서 **AI·NAVER API** > **Maps** 메뉴로 이동합니다
3. **Application 등록**을 통해 클라이언트 ID를 발급받습니다
4. 발급받은 클라이언트 ID를 `Map` 컴포넌트의 `ncpKeyId` prop으로 전달합니다

## 호환성

이 라이브러리는 다음 환경에서 테스트되었습니다:

- ✅ **Vite** - 완전 지원
- ✅ **Webpack 5** - 완전 지원
- ✅ **Next.js** - 완전 지원
- ✅ **Create React App** - 완전 지원
- ✅ **TypeScript** - 타입 정의 포함
- ✅ **ESM & CommonJS** - 양쪽 모두 지원
- ✅ **트리 쉐이킹** - 지원

## TypeScript

이 라이브러리는 TypeScript로 작성되어 있으며, 라이브러리 자체의 타입 정의가 포함되어 있습니다. `naver.maps.*` 전역 타입을 직접 쓰는 경우에만 `@types/navermaps`가 필요합니다.

## 빠른 시작

가장 기본적인 사용법은 다음과 같습니다:

```tsx
import { Map, Marker } from "@rousen/react-naver-maps";

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Marker position={{ x: 127.0276, y: 37.4979 }} />
    </Map>
  );
}
```

## 주요 기능

- 🗺️ 네이버 지도 API를 React 컴포넌트로 쉽게 사용
- 📍 Marker, Overlay, Polygon, Polyline 등 다양한 오버레이 지원
- 🎯 TypeScript로 작성되어 완전한 타입 정의 제공
- 🔄 네이버 맵스 SDK 자동 로드
- 🎨 React 컴포넌트를 지도 오버레이로 사용 가능
- 📦 트리 쉐이킹 지원
- 🔌 GL, Traffic, Transit 등 서브모듈 지원
- ⚡ 풍부한 이벤트 핸들러 지원

## 다음 단계

- [Developer Guide](/docs/developer-guide) - 환경 설정과 고급 사용법을 확인하세요
- [예제 보기](/examples/basic-map) - 다양한 사용 예제를 확인해보세요
- [API 참조](/docs/api/map) - 각 컴포넌트의 상세 API 문서를 확인하세요
