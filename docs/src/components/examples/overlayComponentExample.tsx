import React from "react";
import { Map, Overlay } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

interface InfoWindowProps {
  title: string;
  address: string;
  subway: string;
}

const InfoWindow = ({ title, address, subway }: InfoWindowProps) => {
  return (
    <div
      style={{
        background: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        minWidth: "200px",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>{title}</h3>
      <p style={{ margin: "0 0 5px 0", color: "#666" }}>{address}</p>
      <p style={{ margin: 0, color: "#666" }}>{subway}</p>
    </div>
  );
};

export const OverlayComponentExample: React.FC<MapExampleProps> = ({
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
          <InfoWindow
            title="강남역"
            address="서울특별시 강남구 테헤란로"
            subway="지하철 2호선"
          />
        </Overlay>
      </Map>
    </div>
  );
};
