import React from "react";
import {
  Map,
  Marker,
  Overlay,
  Polygon,
  Polyline,
} from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export function BasicMapExample({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 12 }}
      />
    </div>
  );
}

export function MarkerExample({ ncpKeyId = defaultNcpKeyId }: MapExampleProps) {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 14 }}
      >
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
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 126.976, y: 37.5303 }, zoom: 11 }}
      >
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
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 14 }}
      >
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
    [
      { y: 37.37544345085402, x: 127.11224555969238 },
      { y: 37.37230584065902, x: 127.10791110992432 },
      { y: 37.35975408751081, x: 127.10795402526855 },
      { y: 37.359924641705476, x: 127.11576461791992 },
      { y: 37.35931064479073, x: 127.12211608886719 },
      { y: 37.36043630196386, x: 127.12293148040771 },
      { y: 37.36354029942161, x: 127.12310314178465 },
      { y: 37.365211629488016, x: 127.12456226348876 },
      { y: 37.37544345085402, x: 127.11224555969238 },
    ],
  ];

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 127.1137238, y: 37.3664975 }, zoom: 13 }}
      >
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
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 127.0286, y: 37.4989 }, zoom: 15 }}
      >
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
          zoom: 13,
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
