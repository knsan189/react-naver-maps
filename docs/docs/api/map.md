---
sidebar_position: 1
---

# Map 컴포넌트

`Map` 컴포넌트는 네이버 지도를 표시하는 기본 컴포넌트입니다.

## 기본 사용법

```tsx
import { Map } from "@rousen/react-naver-maps";

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">{/* 지도 위에 표시할 오버레이들 */}</Map>
  );
}
```

## Props

### 필수 Props

| Prop       | Type        | Description                          |
| ---------- | ----------- | ------------------------------------ |
| `ncpKeyId` | `string`    | 네이버 클라우드 플랫폼 클라이언트 ID |
| `children` | `ReactNode` | 지도 위에 표시할 자식 컴포넌트들     |

### 선택 Props

| Prop         | Type                    | Default    | Description                                    |
| ------------ | ----------------------- | ---------- | ---------------------------------------------- |
| `id`         | `string`                | -          | 지도 컨테이너의 ID                             |
| `mapTypeId`  | `naver.maps.MapTypeId`  | `"normal"` | 지도 타입 (normal, satellite, hybrid, terrain) |
| `mapOptions` | `naver.maps.MapOptions` | -          | 네이버 지도 옵션                               |
| `submodules` | `NaverMapsSubmodule[]`  | `[]`       | 로드할 서브모듈 (gl, traffic, transit 등)      |
| `style`      | `React.CSSProperties`   | -          | 지도 컨테이너 스타일                           |

### 이벤트 핸들러

`Map` 컴포넌트는 다양한 이벤트 핸들러를 지원합니다:

- `onInit` - 지도 초기화 완료 시
- `onClick` - 지도 클릭 시
- `onZoomStart`, `onZoomEnd` - 줌 시작/종료 시
- `onDragStart`, `onDragEnd` - 드래그 시작/종료 시
- `onBoundsChanged` - 지도 범위 변경 시
- `onCenterChanged` - 중심점 변경 시
- `onIdle` - 지도가 유휴 상태일 때
- 기타 네이버 지도 이벤트들...

## 예제

### 기본 지도

```tsx
<Map ncpKeyId="your-ncp-key-id" />
```

### 지도 타입 변경

```tsx
<Map ncpKeyId="your-ncp-key-id" mapTypeId="satellite" />
```

### 지도 옵션 설정

```tsx
<Map
  ncpKeyId="your-ncp-key-id"
  mapOptions={{
    center: new naver.maps.LatLng(37.4979, 127.0276),
    zoom: 15,
  }}
/>
```

### 이벤트 핸들러 사용

```tsx
<Map
  ncpKeyId="your-ncp-key-id"
  onClick={(event) => {
    console.log("지도 클릭:", event);
  }}
  onZoomEnd={() => {
    console.log("줌 완료");
  }}
/>
```

### 서브모듈 사용

```tsx
import { Map } from "@rousen/react-naver-maps";

<Map ncpKeyId="your-ncp-key-id" submodules={["gl", "traffic"]} />;
```

### ref 사용

`Map` 컴포넌트는 `forwardRef`를 사용하므로 ref를 통해 네이버 지도 인스턴스에 직접 접근할 수 있습니다:

```tsx
import { useRef } from "react";
import { Map } from "@rousen/react-naver-maps";

function App() {
  const mapRef = useRef<naver.maps.Map>(null);

  const handleButtonClick = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(18);
    }
  };

  return (
    <>
      <Map ref={mapRef} ncpKeyId="your-ncp-key-id" />
      <button onClick={handleButtonClick}>줌 변경</button>
    </>
  );
}
```
