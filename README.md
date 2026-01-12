# react-naver-maps

네이버 지도 API를 React에서 쉽게 사용할 수 있도록 만든 라이브러리입니다.

## 설치

```bash
npm install @rousen/react-naver-maps
# 또는
yarn add @rousen/react-naver-maps
# 또는
pnpm add @rousen/react-naver-maps
```

## 사용법

### 기본 사용법

```tsx
import { Map, MapProvider, Marker } from "react-naver-maps";

function App() {
  return (
    <MapProvider>
      <Map ncpKeyId="your-ncp-key-id">
        <Marker position={[127.0276, 37.4979]} />
      </Map>
    </MapProvider>
  );
}
```

### MapProvider로 감싸기

`MapProvider`는 여러 맵 인스턴스를 관리하고 `useMap` 훅을 통해 접근할 수 있게 해줍니다.

```tsx
import { Map, MapProvider, Marker, useMap } from "react-naver-maps";

function MyComponent() {
  const { current } = useMap(); // 현재 맵 인스턴스 접근

  const handleClick = () => {
    if (current) {
      current.setCenter(new naver.maps.LatLng(37.4979, 127.0276));
    }
  };

  return <button onClick={handleClick}>중심 이동</button>;
}
```

### 주요 컴포넌트

- **Map**: 네이버 지도 컨테이너 컴포넌트
- **Marker**: 지도에 마커를 표시하는 컴포넌트
- **Overlay**: 커스텀 오버레이 컴포넌트 (React 컴포넌트를 지도에 표시)
- **Polygon**: 다각형 영역을 표시하는 컴포넌트
- **Polyline**: 선을 표시하는 컴포넌트

### Map 컴포넌트 Props

```tsx
interface MapProps {
  ncpKeyId: string; // 필수: NCP 클라이언트 ID
  id?: string; // 맵 인스턴스 ID (여러 맵 관리 시 사용)
  mapTypeId?: naver.maps.MapTypeId; // 지도 타입 (기본값: "normal")
  mapOptions?: naver.maps.MapOptions; // 네이버 맵 옵션
  submodules?: NaverMapsSubmodule[]; // 서브모듈 (gl, traffic, transit 등)
  style?: React.CSSProperties; // 컨테이너 스타일
  onLoad?: (map: naver.maps.Map) => void;
  onZoomStart?: (map: naver.maps.Map) => void;
  onZoomEnd?: (map: naver.maps.Map) => void;
  onDragStart?: (map: naver.maps.Map) => void;
  onDragEnd?: (map: naver.maps.Map) => void;
}
```

### Marker 컴포넌트 예제

```tsx
<Marker
  position={[127.0276, 37.4979]}
  title="마커 제목"
  onClick={(event) => console.log("마커 클릭", event)}
  onMouseEnter={(marker) => console.log("마우스 진입", marker)}
/>
```

### Overlay 컴포넌트 예제

```tsx
<Overlay position={[127.0276, 37.4979]} zIndex={100} anchor="center">
  <div style={{ background: "white", padding: "10px" }}>
    커스텀 오버레이 내용
  </div>
</Overlay>
```

### Polygon 컴포넌트 예제

```tsx
<Polygon
  paths={[
    [127.0276, 37.4979],
    [127.0286, 37.4989],
    [127.0296, 37.4979],
  ]}
  fillColor="#ff0000"
  fillOpacity={0.3}
  strokeColor="#0000ff"
  strokeWeight={2}
/>
```

### Polyline 컴포넌트 예제

```tsx
<Polyline
  path={[
    [127.0276, 37.4979],
    [127.0286, 37.4989],
    [127.0296, 37.4979],
  ]}
  strokeColor="#ff0000"
  strokeWeight={3}
  onClick={(event) => console.log("선 클릭", event)}
/>
```

## API

### 컴포넌트

- `Map` - 네이버 지도 컨테이너 컴포넌트
- `MapProvider` - 맵 인스턴스 관리 프로바이더
- `Marker` - 마커 컴포넌트
- `Overlay` - 커스텀 오버레이 컴포넌트
- `Polygon` - 다각형 컴포넌트
- `Polyline` - 선 컴포넌트

### 훅

- `useMap()` - 현재 맵 인스턴스 및 모든 맵 인스턴스에 접근

### 타입

- `MapProps` - Map 컴포넌트 props 타입
- `MarkerProps` - Marker 컴포넌트 props 타입
- `PolylineProps` - Polyline 컴포넌트 props 타입

## 개발

### 의존성 설치

```bash
npm install
```

### 개발 모드 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### Storybook 실행

```bash
npm run storybook
```

### Storybook 빌드

```bash
npm run build-storybook
```

### 타입 체크

```bash
npm run type-check
```

### 린트

```bash
npm run lint
```

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트들
│   ├── Map.tsx          # 지도 컴포넌트
│   ├── Map.stories.tsx  # Map Storybook 스토리
│   ├── MapProvider.tsx  # 맵 컨텍스트 프로바이더 및 useMap 훅
│   ├── Marker.tsx       # 마커 컴포넌트
│   ├── Marker.stories.tsx
│   ├── Overlay.tsx      # 커스텀 오버레이 컴포넌트
│   ├── Overlay.stories.tsx
│   ├── Polygon.tsx      # 다각형 컴포넌트
│   └── Polyline.tsx     # 선 컴포넌트
├── hooks/              # 커스텀 훅들
│   └── useScriptLoader.ts  # 네이버 맵스 SDK 스크립트 로더 훅
├── utils/              # 유틸리티 함수들
│   ├── scriptLoader.ts     # 네이버 맵스 SDK 동적 로딩
│   └── customOverlay.ts    # 커스텀 오버레이 클래스 생성
├── const.ts            # 상수 정의
└── index.ts           # 라이브러리 진입점 (공개 API)
```

### 폴더 구조 설명

- **`components/`**: 모든 React 컴포넌트와 Storybook 스토리 파일
  - `Map.tsx`: 네이버 지도 컨테이너 컴포넌트 및 MapContext 제공
  - `MapProvider.tsx`: 여러 맵 인스턴스를 관리하는 Provider와 `useMap` 훅
  - `Marker.tsx`, `Overlay.tsx`, `Polygon.tsx`, `Polyline.tsx`: 각종 오버레이 컴포넌트
- **`hooks/`**: 재사용 가능한 커스텀 훅들
  - `useScriptLoader.ts`: 네이버 맵스 SDK 스크립트를 동적으로 로드하는 훅
- **`utils/`**: 순수 함수 유틸리티들
  - `scriptLoader.ts`: 네이버 맵스 SDK 스크립트 동적 로딩 로직
  - `customOverlay.ts`: React 컴포넌트를 네이버 맵스 오버레이로 변환하는 유틸리티
- **`index.ts`**: 라이브러리의 공개 API 진입점

## 주요 기능

- 🗺️ **네이버 지도 통합**: 네이버 지도 API를 React 컴포넌트로 쉽게 사용
- 📍 **다양한 오버레이 지원**: Marker, Overlay, Polygon, Polyline 컴포넌트 제공
- 🎯 **타입 안정성**: TypeScript로 작성되어 완전한 타입 정의 제공
- 🔄 **동적 스크립트 로딩**: 네이버 맵스 SDK를 자동으로 로드
- 🎨 **커스텀 오버레이**: React 컴포넌트를 지도 오버레이로 사용 가능
- 📦 **트리 쉐이킹 지원**: 사용하지 않는 코드는 번들에서 제외
- 🔌 **서브모듈 지원**: GL, Traffic, Transit 등 네이버 맵스 서브모듈 지원
- 🎭 **Storybook**: 컴포넌트 예제 및 문서화

## 호환성

이 라이브러리는 다음 환경에서 테스트되었습니다:

- ✅ **Vite** - 완전 지원
- ✅ **Webpack 5** - 완전 지원
- ✅ **Next.js** - 완전 지원
- ✅ **Create React App** - 완전 지원
- ✅ **TypeScript** - 타입 정의 포함
- ✅ **ESM & CommonJS** - 양쪽 모두 지원
- ✅ **트리 쉐이킹** - 지원

## 요구사항

- React >= 16.8.0 (Hooks 지원 필요)
- React DOM >= 16.8.0
- 네이버 클라우드 플랫폼(NCP) 클라이언트 ID

## 기술 스택

- **React** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Rollup** - 번들러
- **Storybook** - 컴포넌트 문서화 및 개발 환경
- **ESLint** - 코드 품질 관리

## 라이선스

MIT
