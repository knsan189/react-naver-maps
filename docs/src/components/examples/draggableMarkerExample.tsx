import React from "react";
import { Map, Marker } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const DraggableMarkerExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [position, setPosition] = React.useState({
    x: 127.0276,
    y: 37.4979,
  });

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        initialOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 14 }}
      >
        <Marker
          position={position}
          draggable
          onPositionChanged={(pos) => {
            setPosition({ x: pos.x, y: pos.y });
          }}
        />
      </Map>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        현재 위치: {position.x.toFixed(4)}, {position.y.toFixed(4)}
      </div>
    </div>
  );
};
