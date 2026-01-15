import React from "react";
import { Map, Marker } from "@rousen/react-naver-maps";
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
