---
sidebar_position: 5
---

# Polyline 컴포넌트

`Polyline` 컴포넌트는 지도 위에 선을 그리는 컴포넌트입니다.

## 기본 사용법

```tsx
import { Map, Polyline } from "@rousen/react-naver-maps";

function App() {
  const path = [
    { x: 127.0276, y: 37.4979 },
    { x: 127.0286, y: 37.4989 },
    { x: 127.0296, y: 37.4999 },
  ];

  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Polyline path={path} />
    </Map>
  );
}
```

## Props

`Polyline` 컴포넌트는 `naver.maps.PolylineOptions`의 모든 속성을 지원합니다.

### 주요 Props

| Prop | Type | Description |
|------|------|-------------|
| `path` | `naver.maps.ArrayOfCoords` | 선의 경로 좌표 배열 (필수) |
| `strokeColor` | `string` | 선 색상 |
| `strokeOpacity` | `number` | 선 투명도 (0-1) |
| `strokeWeight` | `number` | 선 두께 |
| `strokeStyle` | `string` | 선 스타일 (solid, shortdash, dash 등) |
| `zIndex` | `number` | 선의 z-index |
| `clickable` | `boolean` | 클릭 가능 여부 |
| `visible` | `boolean` | 표시 여부 |

### 이벤트 핸들러

| Prop | Type | Description |
|------|------|-------------|
| `onClick` | `(event: unknown) => void` | 선 클릭 시 |
| `onMouseEnter` | `(event: unknown) => void` | 마우스 진입 시 |

## 예제

### 기본 선

```tsx
const path = [
  { x: 127.0276, y: 37.4979 },
  { x: 127.0286, y: 37.4989 },
  { x: 127.0296, y: 37.4999 },
];

<Map ncpKeyId="your-ncp-key-id">
  <Polyline path={path} />
</Map>
```

### 스타일 커스터마이징

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Polyline 
    path={path}
    strokeColor="#ff0000"
    strokeOpacity={0.8}
    strokeWeight={5}
    strokeStyle="solid"
  />
</Map>
```

### 점선 스타일

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Polyline 
    path={path}
    strokeColor="#0000ff"
    strokeWeight={3}
    strokeStyle="dash"
  />
</Map>
```

### 클릭 이벤트

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Polyline 
    path={path}
    onClick={(event) => {
      console.log('선 클릭:', event);
      alert('선이 클릭되었습니다!');
    }}
  />
</Map>
```

### 여러 선 표시

```tsx
const polylines = [
  {
    path: [
      { x: 127.0276, y: 37.4979 },
      { x: 127.0286, y: 37.4989 },
    ],
    strokeColor: '#ff0000',
  },
  {
    path: [
      { x: 127.0296, y: 37.4999 },
      { x: 127.0306, y: 37.5009 },
    ],
    strokeColor: '#0000ff',
  },
];

<Map ncpKeyId="your-ncp-key-id">
  {polylines.map((polyline, index) => (
    <Polyline 
      key={index}
      path={polyline.path}
      strokeColor={polyline.strokeColor}
      strokeWeight={3}
    />
  ))}
</Map>
```

### 동적 경로 변경

```tsx
import { useState } from 'react';

function App() {
  const [path, setPath] = useState([
    { x: 127.0276, y: 37.4979 },
    { x: 127.0286, y: 37.4989 },
  ]);

  return (
    <>
      <Map ncpKeyId="your-ncp-key-id">
        <Polyline path={path} />
      </Map>
      <button onClick={() => {
        setPath([
          { x: 127.0376, y: 37.5079 },
          { x: 127.0386, y: 37.5089 },
        ]);
      }}>
        경로 변경
      </button>
    </>
  );
}
```

### 경로 추적 예제

```tsx
import { useState, useEffect } from 'react';

function App() {
  const [path, setPath] = useState([]);

  useEffect(() => {
    // GPS 위치 추적 시뮬레이션
    const interval = setInterval(() => {
      setPath(prev => [
        ...prev,
        {
          x: 127.0276 + Math.random() * 0.01,
          y: 37.4979 + Math.random() * 0.01,
        }
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Polyline 
        path={path}
        strokeColor="#00ff00"
        strokeWeight={3}
      />
    </Map>
  );
}
```
