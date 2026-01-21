import React from "react";
import { Circle, Map } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const DynamicCircleExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [radius, setRadius] = React.useState(500);

  const increase = () => setRadius((prev) => Math.min(prev + 100, 2000));
  const decrease = () => setRadius((prev) => Math.max(prev - 100, 100));

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={decrease}>반경 줄이기</button>
        <button onClick={increase} style={{ marginLeft: "6px" }}>
          반경 늘리기
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          반경: {radius}m
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          initialOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 14 }}
        >
          <Circle
            center={{ lat: 37.5665, lng: 126.978 }}
            radius={radius}
            fillColor="#60a5fa"
            fillOpacity={0.3}
            strokeColor="#2563eb"
            strokeOpacity={0.9}
            strokeWeight={2}
          />
        </Map>
      </div>
    </div>
  );
};
