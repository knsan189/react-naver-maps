import React from "react";
import { Map, Overlay } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

const locations = [
  {
    position: { x: 127.0276, y: 37.4979 },
    title: "강남역",
    address: "서울특별시 강남구",
  },
  {
    position: { x: 126.978, y: 37.5665 },
    title: "서울역",
    address: "서울특별시 중구",
  },
];

export const OverlayMultipleExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        initialOptions={{ center: { x: 127.0028, y: 37.5322 }, zoom: 12 }}
      >
        {locations.map((location, index) => (
          <Overlay
            key={`${location.title}-${index}`}
            position={location.position}
            zIndex={100 + index}
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
              <strong>{location.title}</strong>
              <br />
              <small>{location.address}</small>
            </div>
          </Overlay>
        ))}
      </Map>
    </div>
  );
};
