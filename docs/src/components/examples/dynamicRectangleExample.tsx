import React from "react";
import { Map, Rectangle } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const DynamicRectangleExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [delta, setDelta] = React.useState(0.006);

  const increase = () => setDelta((prev) => Math.min(prev + 0.002, 0.02));
  const decrease = () => setDelta((prev) => Math.max(prev - 0.002, 0.002));

  const center = { x: 126.978, y: 37.5665 };
  const bounds = {
    minX: center.x - delta,
    minY: center.y - delta,
    maxX: center.x + delta,
    maxY: center.y + delta,
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={decrease}>크기 줄이기</button>
        <button onClick={increase} style={{ marginLeft: "6px" }}>
          크기 늘리기
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          크기: {(delta * 2).toFixed(3)}
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map ncpKeyId={ncpKeyId} mapOptions={{ center, zoom: 14 }}>
          <Rectangle
            bounds={bounds}
            fillColor="#34d399"
            fillOpacity={0.3}
            strokeColor="#059669"
            strokeOpacity={0.9}
            strokeWeight={2}
          />
        </Map>
      </div>
    </div>
  );
};
