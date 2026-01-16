---
sidebar_position: 9
---

# DataLayer

`DataLayer` 컴포넌트는 `geojson/gpx/kml` 데이터를 URL로 로딩해 지도에 표시합니다.

## 기본 사용법

```tsx
import { DataLayer, Map } from "@rousen/react-naver-maps";

function App() {
  return (
    <Map ncpKeyId="your-ncp-key-id">
      <DataLayer type="geojson" url="/data/sample-geojson.json" />
    </Map>
  );
}
```

## Props

### 주요 Props

| Prop        | Type                                                    | Default | Description           |
| ----------- | ------------------------------------------------------- | ------- | --------------------- |
| `type`      | `"geojson" \| "gpx" \| "kml"`                           | -       | 데이터 타입 (필수)    |
| `url`       | `string`                                                | -       | 데이터 URL (필수)     |
| `autoStyle` | `boolean`                                               | `true`  | 자동 스타일 적용 여부 |
| `style`     | `naver.maps.StyleOptions \| naver.maps.StylingFunction` | -       | 데이터 레이어 스타일  |
| `onLoad`    | `(layer: naver.maps.Data) => void`                      | -       | 로딩 완료 시          |
| `onError`   | `(error: Error) => void`                                | -       | 로딩 실패 시          |

### 이벤트 핸들러

| Prop               | Type                                        | Description         |
| ------------------ | ------------------------------------------- | ------------------- |
| `onAddFeature`     | `(event: naver.maps.FeatureEvent) => void`  | 피처 추가 시        |
| `onRemoveFeature`  | `(event: naver.maps.FeatureEvent) => void`  | 피처 제거 시        |
| `onSetFeature`     | `(event: naver.maps.FeatureEvent) => void`  | 피처 설정 시        |
| `onSetGeometry`    | `(event: naver.maps.FeatureEvent) => void`  | 지오메트리 변경 시  |
| `onSetProperty`    | `(event: naver.maps.PropertyEvent) => void` | 속성 변경 시        |
| `onRemoveProperty` | `(event: naver.maps.PropertyEvent) => void` | 속성 제거 시        |
| `onClick`          | `(event: naver.maps.PointerEvent) => void`  | 클릭 시             |
| `onDblclick`       | `(event: naver.maps.PointerEvent) => void`  | 더블 클릭 시        |
| `onRightclick`     | `(event: naver.maps.PointerEvent) => void`  | 우클릭 시           |
| `onMouseDown`      | `(event: naver.maps.PointerEvent) => void`  | 마우스 버튼 누를 때 |
| `onMouseUp`        | `(event: naver.maps.PointerEvent) => void`  | 마우스 버튼 뗄 때   |
| `onMouseOver`      | `(event: naver.maps.PointerEvent) => void`  | 마우스 진입 시      |
| `onMouseOut`       | `(event: naver.maps.PointerEvent) => void`  | 마우스 나갈 시      |
| `onMouseMove`      | `(event: naver.maps.PointerEvent) => void`  | 마우스 이동 시      |

## 예제

### GeoJSON 스타일 적용

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <DataLayer
    type="geojson"
    url="/data/sample-geojson.json"
    style={{
      fillColor: "#60a5fa",
      fillOpacity: 0.35,
      strokeColor: "#2563eb",
      strokeOpacity: 0.9,
      strokeWeight: 2,
    }}
    onClick={(event) => {
      const name = event.feature.getProperty("name");
      console.log("선택된 영역:", name);
    }}
  />
</Map>
```

### GPX 로딩 상태

```tsx
<Map ncpKeyId="your-ncp-key-id">
  <DataLayer
    type="gpx"
    url="/data/sample-gpx.gpx"
    onLoad={() => console.log("GPX 로딩 완료")}
    onError={(error) => console.error("GPX 로딩 실패", error)}
    style={{ strokeColor: "#22c55e", strokeWeight: 3 }}
  />
</Map>
```

## 참고

- `url`은 브라우저에서 접근 가능한 경로여야 하며, 외부 도메인일 경우 CORS 설정이 필요합니다.
- `style`은 `naver.maps.Data.setStyle`로 적용됩니다.
