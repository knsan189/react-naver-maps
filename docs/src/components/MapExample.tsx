import React from "react";
import {
  Map,
  Marker,
  Overlay,
  Polygon,
  Polyline,
} from "@rousen/react-naver-maps";

interface MapExampleProps {
  ncpKeyId?: string;
  children?: React.ReactNode;
}

const defaultNcpKeyId = "qeycp2mj4a";

export function BasicMapExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map ncpKeyId={ncpKeyId} />
    </div>
  );
}

export function MarkerExample({ ncpKeyId = defaultNcpKeyId }: MapExampleProps) {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map ncpKeyId={ncpKeyId}>
        <Marker position={{ x: 127.0276, y: 37.4979 }} />
      </Map>
    </div>
  );
}

export function MultipleMarkersExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const locations = [
    { x: 127.0276, y: 37.4979, title: "강남역" },
    { x: 126.978, y: 37.5665, title: "서울역" },
    { x: 126.9223, y: 37.5264, title: "홍대입구" },
  ];

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map ncpKeyId={ncpKeyId}>
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ x: location.x, y: location.y }}
            title={location.title}
          />
        ))}
      </Map>
    </div>
  );
}

export function OverlayExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map ncpKeyId={ncpKeyId}>
        <Overlay
          position={{ x: 127.0276, y: 37.4979 }}
          zIndex={100}
          anchor="bottom-center"
        >
          <div
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              minWidth: "200px",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>강남역</h3>
            <p style={{ margin: 0, color: "#666" }}>
              서울특별시 강남구 테헤란로
            </p>
          </div>
        </Overlay>
      </Map>
    </div>
  );
}

export function PolygonExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const paths: naver.maps.ArrayOfCoordsLiteral[] = [
    [{ x: 127.0276, y: 37.4979 }],
    [{ x: 127.0286, y: 37.4979 }],
    [{ x: 127.0286, y: 37.4989 }],
    [{ x: 127.0276, y: 37.4989 }],
  ];

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map ncpKeyId={ncpKeyId}>
        <Polygon
          paths={paths}
          fillColor="#ff0000"
          fillOpacity={0.3}
          strokeColor="#ff0000"
          strokeOpacity={0.8}
          strokeWeight={3}
        />
      </Map>
    </div>
  );
}

export function PolylineExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const path: naver.maps.PointLiteral[] = [
    [127.0276, 37.4979],
    [127.0286, 37.4989],
    [127.0296, 37.4999],
  ];

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map ncpKeyId={ncpKeyId}>
        <Polyline
          path={path}
          strokeColor="#0000ff"
          strokeOpacity={0.8}
          strokeWeight={5}
        />
      </Map>
    </div>
  );
}

export function CompleteExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  return (
    <div style={{ width: "100%", height: "500px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{
          center: { x: 127.0276, y: 37.4979 },
          zoom: 14,
        }}
      >
        <Marker position={{ x: 127.0276, y: 37.4979 }} />
        <Overlay
          position={{ x: 127.0276, y: 37.4979 }}
          zIndex={100}
          anchor="bottom-center"
        >
          <div
            style={{
              background: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            }}
          >
            강남역
          </div>
        </Overlay>
        <Polyline
          path={[
            { x: 127.0276, y: 37.4979 },
            { x: 127.0286, y: 37.4989 },
          ]}
          strokeColor="#007bff"
          strokeWeight={3}
        />
      </Map>
    </div>
  );
}

export function GLPolylineExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  const [paths, setPaths] = React.useState<
    Array<Array<{ x: number; y: number }>>
  >([]);

  React.useEffect(() => {
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
    <div style={{ width: "100%", height: "500px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        // disableGL
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
    </div>
  );
}

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
      <Map ncpKeyId={ncpKeyId} onClick={handleMapClick}>
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
      <Map ncpKeyId={ncpKeyId}>
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
        <Map ref={mapRef} ncpKeyId={ncpKeyId} />
      </div>
    </div>
  );
}
