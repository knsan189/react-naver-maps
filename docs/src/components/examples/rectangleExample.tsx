import React from "react";
import { Map, Rectangle } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const RectangleExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        initialOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 14 }}
      >
        <Rectangle
          bounds={{
            minX: 126.972,
            minY: 37.562,
            maxX: 126.984,
            maxY: 37.571,
          }}
          fillColor="#34d399"
          fillOpacity={0.3}
          strokeColor="#059669"
          strokeOpacity={0.9}
          strokeWeight={2}
        />
      </Map>
    </div>
  );
};
