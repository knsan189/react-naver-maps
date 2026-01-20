---
sidebar_position: 1
---

# Map

`Map` 컴포넌트는 네이버 지도를 표시하는 기본 컴포넌트입니다.

> 이 문서는 [네이버 지도 API v3 공식 문서](https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html)를 기반으로 작성되었습니다.
> 기본 동작: GL(WebGL) 서브모듈을 자동으로 로드하여 고성능 렌더링을 사용합니다. 필요하면 `disableGL`로 비GL 렌더러를 강제할 수 있습니다.

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

| Prop       | Type     | Description                          |
| ---------- | -------- | ------------------------------------ |
| `ncpKeyId` | `string` | 네이버 클라우드 플랫폼 클라이언트 ID |

### 선택 Props

| Prop         | Type                                | Default    | Description                                                           |
| ------------ | ----------------------------------- | ---------- | --------------------------------------------------------------------- |
| `id`         | `string`                            | -          | 지도 컨테이너의 ID (`current`는 예약 값이라 사용할 수 없습니다)       |
| `mapTypeId`  | `naver.maps.MapTypeId`              | `"normal"` | 지도 타입 (normal, satellite, hybrid, terrain)                        |
| `mapOptions` | `Omit<naver.maps.MapOptions, "gl">` | -          | 네이버 지도 옵션 (`gl`은 내부에서 관리)                               |
| `children`   | `React.ReactNode`                   | -          | 지도 위에 렌더링할 오버레이 컴포넌트                                  |
| `submodules` | `NaverMapsSubmodule[]`              | `[]`       | 로드할 서브모듈 (`gl`은 기본 포함, 여기에 넣지 않아도 됩니다)         |
| `style`      | `React.CSSProperties`               | -          | 지도 컨테이너 스타일                                                  |
| `disableGL`  | `boolean`                           | `false`    | GL 렌더링/GL 서브모듈 비활성화 (필요 시에만 사용, 비GL 렌더러로 강제) |
| `reuseMap`   | `boolean`                           | `false`    | 동일 `id`의 지도 인스턴스를 재사용합니다 (`MapProvider` 필요)         |

### 이벤트 핸들러

`Map` 컴포넌트는 다양한 이벤트 핸들러를 지원합니다. 모든 이벤트 핸들러는 선택적(optional)입니다.

| Prop                   | Type                                            | Description                                    |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------- |
| `onInit`               | `() => void`                                    | 지도 초기화가 완료되었을 때 호출됩니다         |
| `onClick`              | `(event: naver.maps.PointerEvent) => void`      | 지도를 클릭했을 때 호출됩니다                  |
| `onDbclick`            | `(event: naver.maps.PointerEvent) => void`      | 지도를 더블 클릭했을 때 호출됩니다             |
| `onDoubletap`          | `(event: naver.maps.PointerEvent) => void`      | 지도를 두 번 탭했을 때 호출됩니다 (모바일)     |
| `onZoomStart`          | `() => void`                                    | 줌이 시작될 때 호출됩니다                      |
| `onZoomEnd`            | `() => void`                                    | 줌이 종료될 때 호출됩니다                      |
| `onBoundsChanged`      | `(bounds: naver.maps.Bounds) => void`           | 지도의 범위(bounds)가 변경되었을 때 호출됩니다 |
| `onCenterChanged`      | `(center: naver.maps.Coord) => void`            | 지도의 중심 좌표가 변경되었을 때 호출됩니다    |
| `onCenterPointChanged` | `(centerPoint: naver.maps.LatLng) => void`      | 지도의 중심점이 변경되었을 때 호출됩니다       |
| `onDragStart`          | `(event: naver.maps.PointerEvent) => void`      | 지도를 드래그하기 시작할 때 호출됩니다         |
| `onDragEnd`            | `(event: naver.maps.PointerEvent) => void`      | 지도 드래그가 종료되었을 때 호출됩니다         |
| `onIdle`               | `() => void`                                    | 지도가 유휴 상태(idle)가 되었을 때 호출됩니다  |
| `onResize`             | `() => void`                                    | 지도 크기가 변경되었을 때 호출됩니다           |
| `onScroll`             | `() => void`                                    | 지도를 스크롤했을 때 호출됩니다                |
| `onAddLayer`           | `(layer: naver.maps.Layer) => void`             | 레이어가 추가되었을 때 호출됩니다              |
| `onRemoveLayer`        | `(layerName: naver.maps.Layer["name"]) => void` | 레이어가 제거되었을 때 호출됩니다              |
| `onMapTypeChanged`     | `(mapType: naver.maps.MapType) => void`         | 지도 타입이 변경되었을 때 호출됩니다           |
| `onMapTypeIdChanged`   | `(mapTypeId: naver.maps.MapTypeId) => void`     | 지도 타입 ID가 변경되었을 때 호출됩니다        |
| `onMousedown`          | `(event: naver.maps.PointerEvent) => void`      | 마우스 버튼을 눌렀을 때 호출됩니다             |
| `onMouseup`            | `(event: naver.maps.PointerEvent) => void`      | 마우스 버튼을 뗐을 때 호출됩니다               |
| `onMousemove`          | `(event: naver.maps.PointerEvent) => void`      | 마우스를 이동했을 때 호출됩니다                |
| `onMouseover`          | `(event: naver.maps.PointerEvent) => void`      | 마우스가 지도 위로 들어왔을 때 호출됩니다      |
| `onMouseout`           | `(event: naver.maps.PointerEvent) => void`      | 마우스가 지도 밖으로 나갔을 때 호출됩니다      |
| `onPanning`            | `() => void`                                    | 지도를 팬(pan)하고 있을 때 호출됩니다          |
| `onPinch`              | `(event: naver.maps.PointerEvent) => void`      | 핀치 제스처를 수행할 때 호출됩니다 (모바일)    |
| `onPinchStart`         | `(event: naver.maps.PointerEvent) => void`      | 핀치 제스처가 시작될 때 호출됩니다 (모바일)    |
| `onProjectionChanged`  | `(projection: naver.maps.Projection) => void`   | 지도 투영법이 변경되었을 때 호출됩니다         |
| `onSizeChanged`        | `(size: naver.maps.Size) => void`               | 지도 크기가 변경되었을 때 호출됩니다           |
| `onTap`                | `(event: naver.maps.PointerEvent) => void`      | 지도를 탭했을 때 호출됩니다 (모바일)           |
| `onTilesLoaded`        | `() => void`                                    | 타일이 모두 로드되었을 때 호출됩니다           |
| `onTouchEnd`           | `() => void`                                    | 터치가 끝났을 때 호출됩니다 (모바일)           |
| `onTouchMove`          | `(event: naver.maps.PointerEvent) => void`      | 터치 이동 시 호출됩니다 (모바일)               |
| `onTouchStart`         | `(event: naver.maps.PointerEvent) => void`      | 터치가 시작될 때 호출됩니다 (모바일)           |
| `onTwoFingerTap`       | `(event: naver.maps.PointerEvent) => void`      | 두 손가락 탭 시 호출됩니다 (모바일)            |
| `onZoomChanged`        | `(zoom: number) => void`                        | 줌 레벨이 변경될 때 호출됩니다                 |

## 동작 노트

- `mapOptions`는 내부에서 `setOptions`로 적용됩니다. 변경 시 전체 옵션이 갱신됩니다.
- `mapTypeId`는 생성 이후 별도로 `setMapTypeId`로 반영됩니다.
- `submodules`는 SDK 로딩 시 반영됩니다. 기본값으로 `gl`이 포함됩니다.
- `reuseMap`은 동일 `id` 기준으로만 동작하며, 언마운트 시 인스턴스를 유지합니다.

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
    console.log("클릭 위치:", event.coord);
  }}
  onZoomStart={() => {
    console.log("줌 시작");
  }}
  onZoomEnd={() => {
    console.log("줌 완료");
  }}
  onBoundsChanged={(bounds) => {
    console.log("지도 범위 변경:", bounds);
  }}
  onCenterChanged={(center) => {
    console.log("중심점 변경:", center);
  }}
  onIdle={() => {
    console.log("지도 유휴 상태");
  }}
/>
```

### 이벤트 타입 상세

#### PointerEvent

마우스 및 터치 이벤트에서 사용되는 이벤트 객체입니다:

```tsx
interface PointerEvent {
  coord: naver.maps.Coord; // 이벤트가 발생한 좌표
  point: naver.maps.Point; // 화면 좌표
  offset: naver.maps.Point; // 오프셋 좌표
  originalEvent: MouseEvent | TouchEvent; // 원본 DOM 이벤트
}
```

#### Bounds

지도의 범위를 나타내는 객체입니다:

```tsx
interface Bounds {
  minX: number; // 최소 X 좌표
  minY: number; // 최소 Y 좌표
  maxX: number; // 최대 X 좌표
  maxY: number; // 최대 Y 좌표
}
```

#### Size

크기를 나타내는 객체입니다:

```tsx
interface Size {
  width: number; // 너비
  height: number; // 높이
}
```

### 서브모듈 사용

```tsx
import { Map } from "@rousen/react-naver-maps";

// GL은 자동 포함됩니다. 다른 서브모듈만 추가하세요.
<Map ncpKeyId="your-ncp-key-id" submodules={["traffic", "transit"]} />;
```

### GL 사용과 옵트아웃

- 기본값: GL 서브모듈 + WebGL 렌더링이 자동 활성화됩니다.
- 실패 시: GL 로드가 실패하면 자동으로 non-GL로 한 번 더 시도합니다.
- 옵트아웃: WebGL을 쓰지 않으려면 `disableGL`을 `true`로 주면 됩니다.

```tsx
// GL 기본 활성 (별도 설정 불필요)
<Map ncpKeyId="your-ncp-key-id" />

// GL 비활성화 (레거시 렌더링 사용)
<Map ncpKeyId="your-ncp-key-id" disableGL />;
```

#### GL 서브모듈의 장점

- **고성능 렌더링**: WebGL로 대량 오버레이를 효율적으로 처리
- **부드러운 애니메이션**: 많은 데이터에서도 매끄러운 인터랙션
- **메모리 효율성**: GPU 가속을 통한 리소스 절약

#### 예제: GL로 대량 Polyline 렌더링

```tsx
import { Map, Polyline } from "@rousen/react-naver-maps";
import { useState, useEffect } from "react";

function GLPolylineExample() {
  const [paths, setPaths] = useState<Array<Array<{ x: number; y: number }>>>(
    []
  );

  useEffect(() => {
    const generated: Array<Array<{ x: number; y: number }>> = [];
    for (let i = 0; i < 100; i++) {
      const path: Array<{ x: number; y: number }> = [];
      for (let j = 0; j < 10; j++) {
        path.push({
          x: 127.0276 + (Math.random() - 0.5) * 0.1,
          y: 37.4979 + (Math.random() - 0.5) * 0.1,
        });
      }
      generated.push(path);
    }
    setPaths(generated);
  }, []);

  return (
    <Map
      ncpKeyId="your-ncp-key-id"
      mapOptions={{
        center: { x: 127.0276, y: 37.4979 },
        zoom: 13,
      }}
    >
      {paths.map((path, index) => (
        <Polyline
          key={index}
          path={path}
          strokeColor={`hsl(${(index * 10) % 360}, 70%, 50%)`}
          strokeWeight={2}
          strokeOpacity={0.7}
        />
      ))}
    </Map>
  );
}
```

> **참고**: non-GL 렌더링 예제는 [Raster 예제](/examples/raster-map-example)에서 확인할 수 있습니다.

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
