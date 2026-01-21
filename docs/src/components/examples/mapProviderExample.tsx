import React from "react";
import { Map, MapProvider, useMap } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

const MapProviderControls: React.FC = () => {
  const maps = useMap();

  const moveLeft = () => {
    maps.left?.setCenter({ x: 127.0276, y: 37.4979 });
    maps.left?.setZoom(14);
  };

  const moveRight = () => {
    maps.right?.setCenter({ x: 126.978, y: 37.5665 });
    maps.right?.setZoom(12);
  };

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
      <button onClick={moveLeft}>왼쪽 지도 이동</button>
      <button onClick={moveRight}>오른쪽 지도 이동</button>
    </div>
  );
};

export const MapProviderExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  return (
    <MapProvider>
      <MapProviderControls />
      <div style={{ display: "flex", gap: "12px", width: "100%" }}>
        <div style={{ width: "50%", height: "300px" }}>
          <Map
            id="left"
            ncpKeyId={ncpKeyId}
            initialOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 11 }}
          />
        </div>
        <div style={{ width: "50%", height: "300px" }}>
          <Map
            id="right"
            ncpKeyId={ncpKeyId}
            initialOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 13 }}
          />
        </div>
      </div>
    </MapProvider>
  );
};
