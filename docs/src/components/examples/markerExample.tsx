import React from "react";
import { Map, Marker } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const MarkerExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        initialOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 14 }}
      >
        <Marker position={{ x: 127.0276, y: 37.4979 }} />
      </Map>
    </div>
  );
};
