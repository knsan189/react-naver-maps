---
sidebar_position: 1
---

# Map 컴포넌트

`Map` 컴포넌트는 네이버 지도를 표시하는 기본 컴포넌트입니다.

> 이 문서는 [네이버 지도 API v3 공식 문서](https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html)를 기반으로 작성되었습니다.

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

| Prop         | Type                    | Default    | Description                                    |
| ------------ | ----------------------- | ---------- | ---------------------------------------------- |
| `id`         | `string`                | -          | 지도 컨테이너의 ID                             |
| `mapTypeId`  | `naver.maps.MapTypeId`  | `"normal"` | 지도 타입 (normal, satellite, hybrid, terrain) |
| `mapOptions` | `naver.maps.MapOptions` | -          | 네이버 지도 옵션                               |
| `submodules` | `NaverMapsSubmodule[]`  | `[]`       | 로드할 서브모듈 (gl, traffic, transit 등)      |
| `style`      | `React.CSSProperties`   | -          | 지도 컨테이너 스타일                           |

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

<Map ncpKeyId="your-ncp-key-id" submodules={["gl", "traffic"]} />;
```

### GL 서브모듈 사용

GL 서브모듈은 WebGL 기반의 고성능 렌더링을 제공합니다. 많은 수의 오버레이(Polyline, Polygon 등)를 효율적으로 렌더링할 때 유용합니다.

#### GL 설정 방법

`submodules` prop에 `"gl"`을 추가하고, `mapOptions`에 `gl: true`를 설정합니다:

```tsx
import { Map } from "@rousen/react-naver-maps";

<Map
  ncpKeyId="your-ncp-key-id"
  submodules={["gl"]}
  mapOptions={{
    center: { x: 127.0276, y: 37.4979 },
    zoom: 13,
    gl: true,
  }}
/>;
```

#### GL 서브모듈의 장점

- **고성능 렌더링**: WebGL을 활용하여 많은 수의 오버레이를 효율적으로 렌더링
- **부드러운 애니메이션**: 대량의 데이터를 다룰 때도 부드러운 성능 유지
- **메모리 효율성**: GPU 가속을 통한 메모리 사용 최적화

#### 사용 사례

GL 서브모듈은 다음과 같은 경우에 특히 유용합니다:

- 수백 개 이상의 Polyline을 동시에 표시해야 할 때
- 실시간으로 업데이트되는 경로 데이터를 표시할 때
- 복잡한 경로 네트워크를 시각화할 때

#### 예제: GL과 함께 Polyline 사용

```tsx
import { Map, Polyline } from "@rousen/react-naver-maps";
import { useState, useEffect } from "react";

function GLPolylineExample() {
  const [paths, setPaths] = useState<Array<Array<{ x: number; y: number }>>>(
    []
  );

  useEffect(() => {
    // 많은 수의 경로 생성
    const generatedPaths: Array<Array<{ x: number; y: number }>> = [];
    for (let i = 0; i < 100; i++) {
      const path: Array<{ x: number; y: number }> = [];
      for (let j = 0; j < 10; j++) {
        path.push({
          x: 127.0276 + (Math.random() - 0.5) * 0.1,
          y: 37.4979 + (Math.random() - 0.5) * 0.1,
        });
      }
      generatedPaths.push(path);
    }
    setPaths(generatedPaths);
  }, []);

  return (
    <Map
      ncpKeyId="your-ncp-key-id"
      submodules={["gl"]}
      mapOptions={{
        center: { x: 127.0276, y: 37.4979 },
        zoom: 13,
        gl: true,
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

> **참고**: GL 서브모듈 사용 예제는 [GL 예제](/docs/examples/gl-example)에서 더 자세히 확인할 수 있습니다.

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
