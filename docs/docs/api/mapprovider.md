---
sidebar_position: 9
---

# MapProvider

`MapProvider`는 여러 개의 `Map` 인스턴스를 관리하고, `useMap` 훅으로 접근할 수 있게 해줍니다.

## 기본 사용법

```tsx
import { Map, MapProvider } from "@rousen/react-naver-maps";

function App() {
  return (
    <MapProvider>
      <Map id="left" ncpKeyId="your-ncp-key-id" />
      <Map id="right" ncpKeyId="your-ncp-key-id" />
    </MapProvider>
  );
}
```

## Props

| Prop       | Type              | Default | Description           |
| ---------- | ----------------- | ------- | --------------------- |
| `children` | `React.ReactNode` | -       | 하위에 `Map` 컴포넌트 |

## useMap

`useMap`은 `MapProvider` 내부에서 사용할 수 있는 훅입니다.

반환되는 객체는 다음을 포함합니다:

- `current`: 현재 렌더링된 `Map` 인스턴스
- `[id]`: `Map`의 `id`로 접근 가능한 인스턴스

## 예제

### id로 특정 Map 제어

```tsx
import { Map, MapProvider, useMap } from "@rousen/react-naver-maps";

function CenterControls() {
  const maps = useMap();

  const moveLeft = () => {
    maps.left?.setCenter({ x: 127.0276, y: 37.4979 });
  };

  return <button onClick={moveLeft}>왼쪽 지도 이동</button>;
}

function App() {
  return (
    <MapProvider>
      <Map id="left" ncpKeyId="your-ncp-key-id" />
      <Map id="right" ncpKeyId="your-ncp-key-id" />
      <CenterControls />
    </MapProvider>
  );
}
```

### 현재 Map 접근

```tsx
import { Map, MapProvider, useMap } from "@rousen/react-naver-maps";

function ZoomInButton() {
  const { current } = useMap();
  return (
    <button onClick={() => current?.setZoom((current.getZoom() ?? 10) + 1)}>
      줌 인
    </button>
  );
}

function App() {
  return (
    <MapProvider>
      <Map ncpKeyId="your-ncp-key-id" />
      <ZoomInButton />
    </MapProvider>
  );
}
```
