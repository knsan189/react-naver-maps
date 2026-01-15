---
sidebar_position: 6
---

# Circle

`Circle` 컴포넌트는 지도 위에 원형 영역을 표시하는 컴포넌트입니다.

## 기본 사용법

```tsx
import { Map, Circle } from "@rousen/react-naver-maps";

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Circle center={{ x: 126.978, y: 37.5665 }} radius={500} />
    </Map>
  );
}
```

## Props

`Circle` 컴포넌트는 `naver.maps.CircleOptions`의 모든 속성을 지원합니다.

### 주요 Props

| Prop            | Type                                          | Description                    |
| --------------- | --------------------------------------------- | ------------------------------ |
| `center`        | `naver.maps.Coord \| naver.maps.CoordLiteral` | 원의 중심 좌표 (필수)          |
| `radius`        | `number`                                      | 반경 (미터 단위, 필수)         |
| `fillColor`     | `string`                                      | 채우기 색상                    |
| `fillOpacity`   | `number`                                      | 채우기 투명도 (0-1)            |
| `strokeColor`   | `string`                                      | 테두리 색상                    |
| `strokeOpacity` | `number`                                      | 테두리 투명도 (0-1)            |
| `strokeWeight`  | `number`                                      | 테두리 두께                    |
| `strokeStyle`   | `string`                                      | 테두리 스타일 (solid, dash 등) |
| `zIndex`        | `number`                                      | z-index                        |
| `clickable`     | `boolean`                                     | 클릭 가능 여부                 |
| `visible`       | `boolean`                                     | 표시 여부                      |

### 이벤트 핸들러

| Prop           | Type                                       | Description    |
| -------------- | ------------------------------------------ | -------------- |
| `onClick`      | `(event: naver.maps.PointerEvent) => void` | 원 클릭 시     |
| `onMouseEnter` | `(event: naver.maps.PointerEvent) => void` | 마우스 진입 시 |

## 예제

### 스타일 커스터마이징

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Circle
    center={{ x: 126.978, y: 37.5665 }}
    radius={700}
    fillColor="#60a5fa"
    fillOpacity={0.3}
    strokeColor="#2563eb"
    strokeOpacity={0.9}
    strokeWeight={2}
  />
</Map>
```

### 동적 반경 변경

```tsx
import { useState } from "react";

function App() {
  const [radius, setRadius] = useState(500);

  return (
    <>
      <Map ncpKeyId="your-ncp-key-id">
        <Circle center={{ x: 126.978, y: 37.5665 }} radius={radius} />
      </Map>
      <button onClick={() => setRadius((r) => r + 100)}>반경 증가</button>
    </>
  );
}
```
