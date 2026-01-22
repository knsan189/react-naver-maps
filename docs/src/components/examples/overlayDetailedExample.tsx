import React from "react";
import { Map, Overlay } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const OverlayDetailedExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        initialOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 14 }}
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
            <p style={{ margin: "0 0 5px 0", color: "#666" }}>
              서울특별시 강남구 테헤란로
            </p>
            <p style={{ margin: 0, color: "#666" }}>지하철 2호선</p>
          </div>
        </Overlay>
      </Map>
    </div>
  );
};
