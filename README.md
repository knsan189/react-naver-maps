# react-naver-maps

React 라이브러리 프로젝트입니다.

## 설치

```bash
npm install react-naver-maps
# 또는
yarn add react-naver-maps
# 또는
pnpm add react-naver-maps
```

## 사용법

```tsx
import { Map, MapProvider, Marker } from "react-naver-maps";

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Marker position={[127.0276, 37.4979]} />
    </Map>
  );
}
```

더 자세한 사용법은 [USAGE.md](./USAGE.md)를 참고하세요.

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
│   ├── Map.tsx
│   ├── Map.stories.tsx
│   ├── MapProvider.tsx
│   ├── Marker.tsx
│   ├── Overlay.tsx
│   ├── Polygon.tsx
│   └── Polyline.tsx
├── hooks/              # 커스텀 훅들
│   ├── useMap.ts
│   └── useScript.ts
├── context/            # React Context
│   └── MapContext.ts
├── utils/             # 유틸리티 함수들
│   ├── scriptLoader.ts
│   ├── mapUtils.ts
│   └── customOverlay.ts
└── index.ts           # 라이브러리 진입점
```

### 폴더 구조 설명

- **`components/`**: 모든 React 컴포넌트와 Storybook 스토리 파일
- **`hooks/`**: 재사용 가능한 커스텀 훅들
- **`context/`**: React Context 관련 파일들
- **`utils/`**: 순수 함수 유틸리티들 (네이버 맵스 SDK 로딩, 맵 유틸리티 등)
- **`index.ts`**: 라이브러리의 공개 API 진입점

## 호환성

이 라이브러리는 다음 환경에서 테스트되었습니다:

- ✅ **Vite** - 완전 지원
- ✅ **Webpack 5** - 완전 지원
- ✅ **Next.js** - 완전 지원
- ✅ **Create React App** - 완전 지원
- ✅ **TypeScript** - 타입 정의 포함
- ✅ **ESM & CommonJS** - 양쪽 모두 지원
- ✅ **트리 쉐이킹** - 지원

## 기술 스택

- React
- TypeScript
- Rollup
- Storybook
- ESLint

## 라이선스

MIT
