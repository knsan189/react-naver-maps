---
sidebar_position: 4
---

# Polygon

`Polygon` 컴포넌트는 지도 위에 다각형 영역을 표시하는 컴포넌트입니다.

## 기본 사용법

```tsx
import { Map, Polygon } from "@rousen/react-naver-maps";

function App() {
  const paths = [
    { x: 127.0276, y: 37.4979 },
    { x: 127.0286, y: 37.4979 },
    { x: 127.0286, y: 37.4989 },
    { x: 127.0276, y: 37.4989 },
  ];

  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Polygon paths={paths} />
    </Map>
  );
}
```

## Props

`Polygon` 컴포넌트는 `naver.maps.PolygonOptions`의 모든 속성을 지원합니다.

### 주요 Props

| Prop            | Type                       | Description                               |
| --------------- | -------------------------- | ----------------------------------------- |
| `paths`         | `naver.maps.ArrayOfCoords` | 다각형의 경로 좌표 배열 (필수)            |
| `fillColor`     | `string`                   | 채우기 색상                               |
| `fillOpacity`   | `number`                   | 채우기 투명도 (0-1)                       |
| `strokeColor`   | `string`                   | 테두리 색상                               |
| `strokeOpacity` | `number`                   | 테두리 투명도 (0-1)                       |
| `strokeWeight`  | `number`                   | 테두리 두께                               |
| `strokeStyle`   | `string`                   | 테두리 스타일 (solid, shortdash, dash 등) |
| `zIndex`        | `number`                   | 다각형의 z-index                          |
| `clickable`     | `boolean`                  | 클릭 가능 여부                            |
| `visible`       | `boolean`                  | 표시 여부                                 |

### 이벤트 핸들러

| Prop           | Type                       | Description    |
| -------------- | -------------------------- | -------------- |
| `onClick`      | `(event: unknown) => void` | 다각형 클릭 시 |
| `onMouseEnter` | `(event: unknown) => void` | 마우스 진입 시 |

## 예제

### 기본 다각형

```tsx
const paths = [
  { x: 127.0276, y: 37.4979 },
  { x: 127.0286, y: 37.4979 },
  { x: 127.0286, y: 37.4989 },
  { x: 127.0276, y: 37.4989 },
];

<Map ncpKeyId="your-ncp-key-id">
  <Polygon paths={paths} />
</Map>;
```

### 스타일 커스터마이징

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Polygon
    paths={paths}
    fillColor="#ff0000"
    fillOpacity={0.3}
    strokeColor="#ff0000"
    strokeOpacity={0.8}
    strokeWeight={3}
  />
</Map>
```

### 클릭 이벤트

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Polygon
    paths={paths}
    onClick={(event) => {
      console.log("다각형 클릭:", event);
      alert("다각형이 클릭되었습니다!");
    }}
  />
</Map>
```

### 여러 다각형 표시

```tsx
const polygons = [
  {
    paths: [
      { x: 127.0276, y: 37.4979 },
      { x: 127.0286, y: 37.4979 },
      { x: 127.0286, y: 37.4989 },
    ],
    fillColor: "#ff0000",
  },
  {
    paths: [
      { x: 127.0296, y: 37.4999 },
      { x: 127.0306, y: 37.4999 },
      { x: 127.0306, y: 37.5009 },
    ],
    fillColor: "#0000ff",
  },
];

<Map ncpKeyId="your-ncp-key-id">
  {polygons.map((polygon, index) => (
    <Polygon
      key={index}
      paths={polygon.paths}
      fillColor={polygon.fillColor}
      fillOpacity={0.3}
    />
  ))}
</Map>;
```

### 동적 경로 변경

```tsx
import { useState } from "react";

function App() {
  const [paths, setPaths] = useState([
    { x: 127.0276, y: 37.4979 },
    { x: 127.0286, y: 37.4979 },
    { x: 127.0286, y: 37.4989 },
  ]);

  return (
    <>
      <Map ncpKeyId="your-ncp-key-id">
        <Polygon paths={paths} />
      </Map>
      <button
        onClick={() => {
          setPaths([
            { x: 127.0376, y: 37.5079 },
            { x: 127.0386, y: 37.5079 },
            { x: 127.0386, y: 37.5089 },
          ]);
        }}
      >
        경로 변경
      </button>
    </>
  );
}
```
