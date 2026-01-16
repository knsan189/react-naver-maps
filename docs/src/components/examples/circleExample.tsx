import React from "react";
import { Circle, Map } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const CircleExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 14 }}
      >
        <Circle
          center={{ lat: 37.5665, lng: 126.978 }}
          radius={500}
          fillColor="#60a5fa"
          fillOpacity={0.3}
          strokeColor="#2563eb"
          strokeOpacity={0.9}
          strokeWeight={2}
        />
      </Map>
    </div>
  );
};
