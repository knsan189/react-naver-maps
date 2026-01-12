---
sidebar_position: 3
---

# Overlay 컴포넌트

`Overlay` 컴포넌트는 React 컴포넌트를 지도 위의 커스텀 오버레이로 표시할 수 있게 해주는 컴포넌트입니다.

## 기본 사용법

```tsx
import { Map, Overlay } from "@rousen/react-naver-maps";

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Overlay 
        position={{ x: 127.0276, y: 37.4979 }}
        zIndex={100}
        anchor="BOTTOM_CENTER"
      >
        <div style={{ 
          background: 'white', 
          padding: '10px', 
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
        }}>
          커스텀 오버레이
        </div>
      </Overlay>
    </Map>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `position` | `naver.maps.Coord \| naver.maps.CoordLiteral` | 오버레이의 위치 (필수) |
| `zIndex` | `number` | 오버레이의 z-index (필수) |
| `anchor` | `OverlayAnchorType` | 앵커 위치 (필수) |
| `children` | `ReactNode` | 오버레이로 표시할 React 컴포넌트 (필수) |

### anchor 타입

`anchor`는 다음 값 중 하나를 사용할 수 있습니다:

- `"TOP_LEFT"`
- `"TOP_CENTER"`
- `"TOP_RIGHT"`
- `"MIDDLE_LEFT"`
- `"MIDDLE_CENTER"`
- `"MIDDLE_RIGHT"`
- `"BOTTOM_LEFT"`
- `"BOTTOM_CENTER"`
- `"BOTTOM_RIGHT"`

## 예제

### 기본 오버레이

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Overlay 
    position={{ x: 127.0276, y: 37.4979 }}
    zIndex={100}
    anchor="BOTTOM_CENTER"
  >
    <div>내용</div>
  </Overlay>
</Map>
```

### 정보창 스타일 오버레이

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <Overlay 
    position={{ x: 127.0276, y: 37.4979 }}
    zIndex={100}
    anchor="BOTTOM_CENTER"
  >
    <div style={{
      background: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      minWidth: '200px',
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>위치 정보</h3>
      <p style={{ margin: 0 }}>서울시 강남구</p>
    </div>
  </Overlay>
</Map>
```

### React 컴포넌트를 오버레이로 사용

```tsx
function InfoWindow({ title, description }) {
  return (
    <div style={{
      background: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">
      <Overlay 
        position={{ x: 127.0276, y: 37.4979 }}
        zIndex={100}
        anchor="BOTTOM_CENTER"
      >
        <InfoWindow 
          title="제목" 
          description="설명입니다" 
        />
      </Overlay>
    </Map>
  );
}
```

### 동적 위치 변경

```tsx
import { useState } from 'react';

function App() {
  const [position, setPosition] = useState({ x: 127.0276, y: 37.4979 });

  return (
    <>
      <Map ncpKeyId="your-ncp-key-id">
        <Overlay 
          position={position}
          zIndex={100}
          anchor="BOTTOM_CENTER"
        >
          <div>오버레이 내용</div>
        </Overlay>
      </Map>
      <button onClick={() => setPosition({ x: 127.0376, y: 37.5079 })}>
        위치 변경
      </button>
    </>
  );
}
```

### 여러 오버레이 표시

```tsx
const overlays = [
  { position: { x: 127.0276, y: 37.4979 }, content: '위치 1' },
  { position: { x: 127.0286, y: 37.4989 }, content: '위치 2' },
  { position: { x: 127.0296, y: 37.4999 }, content: '위치 3' },
];

<Map ncpKeyId="your-ncp-key-id">
  {overlays.map((overlay, index) => (
    <Overlay 
      key={index}
      position={overlay.position}
      zIndex={100 + index}
      anchor="BOTTOM_CENTER"
    >
      <div>{overlay.content}</div>
    </Overlay>
  ))}
</Map>
```
