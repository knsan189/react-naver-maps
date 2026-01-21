import React from "react";
import { Map, Marker, Overlay, Polyline } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const CompleteExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  return (
    <div style={{ width: "100%", height: "500px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        initialOptions={{
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
};
