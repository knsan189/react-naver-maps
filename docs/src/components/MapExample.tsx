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
          center: new naver.maps.LatLng(37.4979, 127.0276),
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
