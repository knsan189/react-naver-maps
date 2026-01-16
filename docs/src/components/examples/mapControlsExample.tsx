import React from "react";
import { Map } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const MapControlsExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
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
};
