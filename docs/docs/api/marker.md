---
sidebar_position: 2
---

# Marker 컴포넌트

`Marker` 컴포넌트는 지도 위에 마커를 표시하는 컴포넌트입니다.

## 기본 사용법

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

## Props

`Marker` 컴포넌트는 `naver.maps.MarkerOptions`의 모든 속성을 지원합니다.

### 주요 Props

| Prop        | Type                                          | Default | Description         |
| ----------- | --------------------------------------------- | ------- | ------------------- |
| `position`  | `naver.maps.Coord \| naver.maps.CoordLiteral` | -       | 마커의 위치 (필수)  |
| `icon`      | `naver.maps.Icon \| string`                   | -       | 마커 아이콘         |
| `title`     | `string`                                      | -       | 마커 제목 (툴팁)    |
| `zIndex`    | `number`                                      | -       | 마커의 z-index      |
| `clickable` | `boolean`                                     | `false` | 클릭 가능 여부      |
| `visible`   | `boolean`                                     | `true`  | 표시 여부           |
| `cursor`    | `string`                                      | -       | 마커 위 커서 스타일 |
| `draggable` | `boolean`                                     | `false` | 드래그 가능 여부    |
| `animation` | `naver.maps.Animation`                        | -       | 마커 애니메이션     |
| `shape`     | `naver.maps.MarkerShape`                      | -       | 마커 클릭 영역      |

### 이벤트 핸들러

| Prop                 | Type                                        | Description              |
| -------------------- | ------------------------------------------- | ------------------------ |
| `onClick`            | `(event: naver.maps.PointerEvent) => void`  | 마커 클릭 시             |
| `onDblclick`         | `(event: naver.maps.PointerEvent) => void`  | 마커 더블 클릭 시        |
| `onRightclick`       | `(event: naver.maps.PointerEvent) => void`  | 마커 우클릭 시           |
| `onMousedown`        | `(event: naver.maps.PointerEvent) => void`  | 마우스 버튼 누를 때      |
| `onMouseup`          | `(event: naver.maps.PointerEvent) => void`  | 마우스 버튼 뗄 때        |
| `onTouchStart`       | `(event: naver.maps.PointerEvent) => void`  | 터치 시작 시 (모바일)    |
| `onTouchEnd`         | `(event: naver.maps.PointerEvent) => void`  | 터치 종료 시 (모바일)    |
| `onPositionChanged`  | `(position: naver.maps.Coord) => void`      | 위치 변경 시             |
| `onTitleChanged`     | `(title: string) => void`                   | 제목 변경 시             |
| `onVisibleChanged`   | `(visible: boolean) => void`                | 표시 여부 변경 시        |
| `onZIndexChanged`    | `(zIndex: number) => void`                  | z-index 변경 시          |
| `onClickableChanged` | `(clickable: boolean) => void`              | 클릭 가능 여부 변경 시   |
| `onDraggableChanged` | `(draggable: boolean) => void`              | 드래그 가능 여부 변경 시 |
| `onIconChanged`      | `(icon: naver.maps.Icon \| string) => void` | 아이콘 변경 시           |
| `onIconLoaded`       | `(marker: naver.maps.Marker) => void`       | 아이콘 로드 완료 시      |

## 예제

### 기본 마커

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Marker position={{ x: 127.0276, y: 37.4979 }} />
</Map>
```

### 커스텀 아이콘

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Marker
    position={{ x: 127.0276, y: 37.4979 }}
    icon={{
      url: "/path/to/icon.png",
      size: new naver.maps.Size(32, 32),
      anchor: new naver.maps.Point(16, 16),
    }}
  />
</Map>
```

### 마커 클릭 이벤트

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Marker
    position={{ x: 127.0276, y: 37.4979 }}
    onClick={(event) => {
      console.log("마커 클릭:", event);
      console.log("클릭 위치:", event.coord);
      alert("마커가 클릭되었습니다!");
    }}
  />
</Map>
```

### 드래그 가능한 마커

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Marker
    position={{ x: 127.0276, y: 37.4979 }}
    draggable={true}
    onPositionChanged={(position) => {
      console.log("마커 위치 변경:", position);
    }}
  />
</Map>
```

### 애니메이션 마커

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Marker
    position={{ x: 127.0276, y: 37.4979 }}
    animation={naver.maps.Animation.BOUNCE}
  />
</Map>
```

### 여러 이벤트 핸들러 사용

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Marker
    position={{ x: 127.0276, y: 37.4979 }}
    onClick={(event) => {
      console.log("클릭:", event.coord);
    }}
    onDblclick={(event) => {
      console.log("더블 클릭:", event.coord);
    }}
    onRightclick={(event) => {
      console.log("우클릭:", event.coord);
    }}
    onIconLoaded={(marker) => {
      console.log("아이콘 로드 완료:", marker);
    }}
  />
</Map>
```

### 여러 마커 표시

```tsx
const locations = [
  { x: 127.0276, y: 37.4979, title: "위치 1" },
  { x: 127.0286, y: 37.4989, title: "위치 2" },
  { x: 127.0296, y: 37.4999, title: "위치 3" },
];

<Map ncpKeyId="your-ncp-key-id">
  {locations.map((location, index) => (
    <Marker
      key={index}
      position={{ x: location.x, y: location.y }}
      title={location.title}
    />
  ))}
</Map>;
```

### 동적 위치 변경

```tsx
import { useState } from "react";

function App() {
  const [position, setPosition] = useState({ x: 127.0276, y: 37.4979 });

  return (
    <>
      <Map ncpKeyId="your-ncp-key-id">
        <Marker position={position} />
      </Map>
      <button onClick={() => setPosition({ x: 127.0376, y: 37.5079 })}>
        위치 변경
      </button>
    </>
  );
}
```
