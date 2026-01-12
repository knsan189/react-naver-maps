---
sidebar_position: 1
---

# 시작하기

`@rousen/react-naver-maps`는 네이버 지도 API를 React에서 쉽게 사용할 수 있도록 만든 라이브러리입니다.

## 설치

```bash
npm install @rousen/react-naver-maps
# 또는
yarn add @rousen/react-naver-maps
# 또는
pnpm add @rousen/react-naver-maps
```

## 요구사항

- React >= 16.8.0 (Hooks 지원 필요)
- React DOM >= 16.8.0
- 네이버 클라우드 플랫폼(NCP) 클라이언트 ID

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

- [설치 가이드](/docs/installation) - 프로젝트에 라이브러리를 설치하는 방법을 알아봅니다
- [Map 컴포넌트 사용법](/docs/api/map) - 지도 컴포넌트의 기본 사용법을 알아봅니다
- [Marker 컴포넌트](/docs/api/marker) - 마커를 지도에 추가하는 방법을 알아봅니다
- [Overlay 컴포넌트](/docs/api/overlay) - 커스텀 오버레이를 만드는 방법을 알아봅니다
