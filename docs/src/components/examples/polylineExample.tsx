import React from "react";
import { Map, Polyline } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const PolylineExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const path: naver.maps.PointLiteral[] = [
    [127.0276, 37.4979],
    [127.0286, 37.4989],
    [127.0296, 37.4999],
  ];

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 127.0286, y: 37.4989 }, zoom: 15 }}
      >
        <Polyline
          path={path}
          strokeColor="#0000ff"
          strokeOpacity={0.8}
          strokeWeight={5}
        />
      </Map>
    </div>
  );
};
