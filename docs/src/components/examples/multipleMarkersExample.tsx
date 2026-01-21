import React from "react";
import { Map, Marker } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const MultipleMarkersExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const locations = [
    { x: 127.0276, y: 37.4979, title: "강남역" },
    { x: 126.978, y: 37.5665, title: "서울역" },
    { x: 126.9223, y: 37.5264, title: "홍대입구" },
  ];

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        initialOptions={{ center: { x: 126.976, y: 37.5303 }, zoom: 11 }}
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
};
