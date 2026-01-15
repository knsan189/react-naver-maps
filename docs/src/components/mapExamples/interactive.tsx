import React from "react";
import {
  Map,
  Marker,
  Polygon,
  Polyline,
  Circle,
  Rectangle,
} from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export function ClickToAddMarkerExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [markers, setMarkers] = React.useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const [idCounter, setIdCounter] = React.useState(0);

  const handleMapClick = (event: naver.maps.PointerEvent) => {
    const coord = event.coord;
    setMarkers((prev) => [...prev, { x: coord.x, y: coord.y, id: idCounter }]);
    setIdCounter((prev) => prev + 1);
  };

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 13 }}
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} position={{ x: marker.x, y: marker.y }} />
        ))}
      </Map>
    </div>
  );
}

export function DraggableMarkerExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [position, setPosition] = React.useState({
    x: 127.0276,
    y: 37.4979,
  });

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 14 }}
      >
        <Marker
          position={position}
          draggable
          onPositionChanged={(pos) => {
            setPosition({ x: pos.x, y: pos.y });
          }}
        />
      </Map>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        현재 위치: {position.x.toFixed(4)}, {position.y.toFixed(4)}
      </div>
    </div>
  );
}

export function MapEventsExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [events, setEvents] = React.useState<string[]>([]);

  const addEvent = (eventName: string) => {
    setEvents((prev) => [eventName, ...prev].slice(0, 10));
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 12 }}
          onClick={() => addEvent("지도 클릭")}
          onZoomStart={() => addEvent("줌 시작")}
          onZoomEnd={() => addEvent("줌 종료")}
          onDragStart={() => addEvent("드래그 시작")}
          onDragEnd={() => addEvent("드래그 종료")}
          onBoundsChanged={() => addEvent("범위 변경")}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <h3 style={{ marginBottom: "6px" }}>이벤트 로그</h3>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          {events.map((event, index) => (
            <li key={index} style={{ fontSize: "14px", lineHeight: "1.4" }}>
              {event}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MapControlsExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const mapRef = React.useRef<naver.maps.Map>(null);

  const zoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom + 1);
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom - 1);
    }
  };

  const setCenter = (x: number, y: number) => {
    if (mapRef.current) {
      mapRef.current.setCenter(new naver.maps.LatLng(y, x));
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={zoomIn}>확대</button>
        <button onClick={zoomOut} style={{ marginLeft: "6px" }}>
          축소
        </button>
        <button
          onClick={() => setCenter(127.0276, 37.4979)}
          style={{ marginLeft: "6px" }}
        >
          강남역으로 이동
        </button>
        <button
          onClick={() => setCenter(126.978, 37.5665)}
          style={{ marginLeft: "6px" }}
        >
          서울역으로 이동
        </button>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ref={mapRef}
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 12 }}
        />
      </div>
    </div>
  );
}

export function ShapeDrawingExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [points, setPoints] = React.useState<Array<{ x: number; y: number }>>(
    []
  );

  const handleMapClick = (event: naver.maps.PointerEvent) => {
    const { x, y } = event.coord;
    setPoints((prev) => [...prev, { x, y }]);
  };

  const handleUndo = () => {
    setPoints((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPoints([]);
  };

  const hasPolygon = points.length >= 3;

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleUndo} disabled={points.length === 0}>
          마지막 점 삭제
        </button>
        <button
          onClick={handleClear}
          disabled={points.length === 0}
          style={{ marginLeft: "6px" }}
        >
          초기화
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          점 {points.length}개
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 13 }}
          onClick={handleMapClick}
        >
          {points.map((point, index) => (
            <Marker key={index} position={point} />
          ))}
          {points.length >= 2 && (
            <Polyline
              path={points}
              strokeColor="#2563eb"
              strokeOpacity={0.9}
              strokeWeight={3}
            />
          )}
          {hasPolygon && (
            <Polygon
              paths={[points]}
              fillColor="#60a5fa"
              fillOpacity={0.3}
              strokeColor="#2563eb"
              strokeOpacity={0.9}
              strokeWeight={2}
            />
          )}
        </Map>
      </div>
    </div>
  );
}

export function DynamicPolylineExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [path, setPath] = React.useState([
    { x: 126.978, y: 37.5665 },
    { x: 126.9895, y: 37.5651 },
  ]);

  const addPoint = () => {
    const newPoint = {
      x: 126.978 + (Math.random() - 0.5) * 0.02,
      y: 37.5665 + (Math.random() - 0.5) * 0.02,
    };
    setPath((prev) => [...prev, newPoint]);
  };

  const resetPath = () => {
    setPath([
      { x: 126.978, y: 37.5665 },
      { x: 126.9895, y: 37.5651 },
    ]);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={addPoint}>점 추가</button>
        <button onClick={resetPath} style={{ marginLeft: "6px" }}>
          초기화
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          점 개수: {path.length}
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 15 }}
        >
          <Polyline
            path={path}
            strokeColor="#007bff"
            strokeOpacity={0.8}
            strokeWeight={4}
          />
        </Map>
      </div>
    </div>
  );
}

export function DynamicPolygonExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [paths, setPaths] = React.useState([
    [
      { x: 126.978, y: 37.5665 },
      { x: 126.9895, y: 37.5651 },
      { x: 126.992, y: 37.57 },
    ],
  ]);

  const addPoint = () => {
    const currentPath = paths[0];
    const newPoint = {
      x: 126.978 + (Math.random() - 0.5) * 0.02,
      y: 37.5665 + (Math.random() - 0.5) * 0.02,
    };
    setPaths([[...currentPath, newPoint]]);
  };

  const resetPolygon = () => {
    setPaths([
      [
        { x: 126.978, y: 37.5665 },
        { x: 126.9895, y: 37.5651 },
        { x: 126.992, y: 37.57 },
      ],
    ]);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={addPoint}>점 추가</button>
        <button onClick={resetPolygon} style={{ marginLeft: "6px" }}>
          초기화
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          점 개수: {paths[0].length}
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 15 }}
        >
          {paths[0].length >= 3 && (
            <Polygon
              paths={paths}
              fillColor="#60a5fa"
              fillOpacity={0.3}
              strokeColor="#2563eb"
              strokeOpacity={0.9}
              strokeWeight={2}
            />
          )}
        </Map>
      </div>
    </div>
  );
}

export function DynamicCircleExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [radius, setRadius] = React.useState(500);

  const increase = () => setRadius((prev) => Math.min(prev + 100, 2000));
  const decrease = () => setRadius((prev) => Math.max(prev - 100, 100));

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={decrease}>반경 줄이기</button>
        <button onClick={increase} style={{ marginLeft: "6px" }}>
          반경 늘리기
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          반경: {radius}m
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 14 }}
        >
          <Circle
            center={{ lat: 37.5665, lng: 126.978 }}
            radius={radius}
            fillColor="#60a5fa"
            fillOpacity={0.3}
            strokeColor="#2563eb"
            strokeOpacity={0.9}
            strokeWeight={2}
          />
        </Map>
      </div>
    </div>
  );
}

export function DynamicRectangleExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [delta, setDelta] = React.useState(0.006);

  const increase = () => setDelta((prev) => Math.min(prev + 0.002, 0.02));
  const decrease = () => setDelta((prev) => Math.max(prev - 0.002, 0.002));

  const center = { x: 126.978, y: 37.5665 };
  const bounds = {
    minX: center.x - delta,
    minY: center.y - delta,
    maxX: center.x + delta,
    maxY: center.y + delta,
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={decrease}>크기 줄이기</button>
        <button onClick={increase} style={{ marginLeft: "6px" }}>
          크기 늘리기
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          크기: {(delta * 2).toFixed(3)}
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map ncpKeyId={ncpKeyId} mapOptions={{ center, zoom: 14 }}>
          <Rectangle
            bounds={bounds}
            fillColor="#34d399"
            fillOpacity={0.3}
            strokeColor="#059669"
            strokeOpacity={0.9}
            strokeWeight={2}
          />
        </Map>
      </div>
    </div>
  );
}
