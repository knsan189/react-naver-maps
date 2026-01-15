---
sidebar_position: 7
---

# Rectangle

`Rectangle` 컴포넌트는 지도 위에 직사각형 영역을 표시하는 컴포넌트입니다.

## 기본 사용법

```tsx
import { Map, Rectangle } from "@rousen/react-naver-maps";

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Rectangle
        bounds={{
          minX: 126.972,
          minY: 37.562,
          maxX: 126.984,
          maxY: 37.571,
        }}
      />
    </Map>
  );
}
```

## Props

`Rectangle` 컴포넌트는 `naver.maps.RectangleOptions`의 모든 속성을 지원합니다.

### 주요 Props

| Prop            | Type                                 | Description                    |
| --------------- | ------------------------------------ | ------------------------------ |
| `bounds`        | `naver.maps.Bounds \| BoundsLiteral` | 직사각형 범위 (필수)           |
| `fillColor`     | `string`                             | 채우기 색상                    |
| `fillOpacity`   | `number`                             | 채우기 투명도 (0-1)            |
| `strokeColor`   | `string`                             | 테두리 색상                    |
| `strokeOpacity` | `number`                             | 테두리 투명도 (0-1)            |
| `strokeWeight`  | `number`                             | 테두리 두께                    |
| `strokeStyle`   | `string`                             | 테두리 스타일 (solid, dash 등) |
| `zIndex`        | `number`                             | z-index                        |
| `clickable`     | `boolean`                            | 클릭 가능 여부                 |
| `visible`       | `boolean`                            | 표시 여부                      |

### 이벤트 핸들러

| Prop           | Type                                       | Description      |
| -------------- | ------------------------------------------ | ---------------- |
| `onClick`      | `(event: naver.maps.PointerEvent) => void` | 직사각형 클릭 시 |
| `onMouseEnter` | `(event: naver.maps.PointerEvent) => void` | 마우스 진입 시   |

## 예제

### 스타일 커스터마이징

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Rectangle
    bounds={{
      minX: 126.972,
      minY: 37.562,
      maxX: 126.984,
      maxY: 37.571,
    }}
    fillColor="#34d399"
    fillOpacity={0.3}
    strokeColor="#059669"
    strokeOpacity={0.9}
    strokeWeight={2}
  />
</Map>
```

### 동적 bounds 변경

```tsx
import { useState } from "react";

function App() {
  const [delta, setDelta] = useState(0.006);
  const center = { x: 126.978, y: 37.5665 };
  const bounds = {
    minX: center.x - delta,
    minY: center.y - delta,
    maxX: center.x + delta,
    maxY: center.y + delta,
  };

  return (
    <>
      <Map ncpKeyId="your-ncp-key-id">
        <Rectangle bounds={bounds} />
      </Map>
      <button onClick={() => setDelta((d) => d + 0.002)}>크기 증가</button>
    </>
  );
}
```
