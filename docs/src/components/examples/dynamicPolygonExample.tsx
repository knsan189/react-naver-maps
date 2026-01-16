import React from "react";
import { Map, Polygon } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const DynamicPolygonExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [paths, setPaths] = React.useState([
    [
      { x: 126.978, y: 37.5665 },
      { x: 126.9895, y: 37.5651 },
      { x: 126.992, y: 37.57 },
    ],
  ]);

  const addPoint = () => {
    const currentPath = paths[0];
    const newPoint = {
      x: 126.978 + (Math.random() - 0.5) * 0.02,
      y: 37.5665 + (Math.random() - 0.5) * 0.02,
    };
    setPaths([[...currentPath, newPoint]]);
  };

  const resetPolygon = () => {
    setPaths([
      [
        { x: 126.978, y: 37.5665 },
        { x: 126.9895, y: 37.5651 },
        { x: 126.992, y: 37.57 },
      ],
    ]);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={addPoint}>점 추가</button>
        <button onClick={resetPolygon} style={{ marginLeft: "6px" }}>
          초기화
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          점 개수: {paths[0].length}
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 15 }}
        >
          {paths[0].length >= 3 && (
            <Polygon
              paths={paths}
              fillColor="#60a5fa"
              fillOpacity={0.3}
              strokeColor="#2563eb"
              strokeOpacity={0.9}
              strokeWeight={2}
            />
          )}
        </Map>
      </div>
    </div>
  );
};
