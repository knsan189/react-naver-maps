import React from "react";
import { Map } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const StateManagementControlledExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [zoom, setZoom] = React.useState(13);
  const [center, setCenter] = React.useState<naver.maps.LatLngLiteral>({
    lng: 126.9786566,
    lat: 37.566826,
  });

  const handleCenterChanged = (nextCenter: naver.maps.LatLngLiteral) => {
    setCenter(nextCenter);
  };

  const handleZoomChanged = (nextZoom: number) => {
    setZoom(nextZoom);
  };

  return (
    <div style={{ width: "100%", height: "420px", margin: "16px 0" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <button type="button" onClick={() => setZoom((prev) => prev + 1)}>
          줌 인
        </button>
        <button type="button" onClick={() => setZoom((prev) => prev - 1)}>
          줌 아웃
        </button>
        <button
          type="button"
          onClick={() => setCenter({ lat: 126.9786566, lng: 37.566826 })}
        >
          센터 리셋
        </button>
      </div>
      <Map
        ncpKeyId={ncpKeyId}
        center={center}
        zoom={zoom}
        initialOptions={{ center, zoom }}
        onCenterChanged={handleCenterChanged}
        onZoomChanged={handleZoomChanged}
      />
    </div>
  );
};
