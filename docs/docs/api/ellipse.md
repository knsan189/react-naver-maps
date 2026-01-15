---
sidebar_position: 8
---

# Ellipse

`Ellipse` 컴포넌트는 지도 위에 타원 영역을 표시하는 컴포넌트입니다.

## 기본 사용법

```tsx
import { Map, Ellipse } from "@rousen/react-naver-maps";

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Ellipse
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

`Ellipse` 컴포넌트는 `naver.maps.EllipseOptions`의 모든 속성을 지원합니다.

### 주요 Props

| Prop            | Type                                 | Description                    |
| --------------- | ------------------------------------ | ------------------------------ |
| `bounds`        | `naver.maps.Bounds \| BoundsLiteral` | 타원 범위 (필수)               |
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

| Prop           | Type                                       | Description    |
| -------------- | ------------------------------------------ | -------------- |
| `onClick`      | `(event: naver.maps.PointerEvent) => void` | 타원 클릭 시   |
| `onMouseEnter` | `(event: naver.maps.PointerEvent) => void` | 마우스 진입 시 |

## 예제

### 스타일 커스터마이징

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Ellipse
    bounds={{
      minX: 126.972,
      minY: 37.562,
      maxX: 126.984,
      maxY: 37.571,
    }}
    fillColor="#f97316"
    fillOpacity={0.25}
    strokeColor="#ea580c"
    strokeOpacity={0.9}
    strokeWeight={2}
  />
</Map>
```

### 동적 bounds 변경

```tsx
import { useState } from "react";

function App() {
  const [deltaX, setDeltaX] = useState(0.008);
  const [deltaY, setDeltaY] = useState(0.004);
  const center = { x: 126.978, y: 37.5665 };
  const bounds = {
    minX: center.x - deltaX,
    minY: center.y - deltaY,
    maxX: center.x + deltaX,
    maxY: center.y + deltaY,
  };

  return (
    <>
      <Map ncpKeyId="your-ncp-key-id">
        <Ellipse bounds={bounds} />
      </Map>
      <button onClick={() => setDeltaX((d) => d + 0.002)}>가로 증가</button>
      <button onClick={() => setDeltaY((d) => d + 0.002)}>세로 증가</button>
    </>
  );
}
```
