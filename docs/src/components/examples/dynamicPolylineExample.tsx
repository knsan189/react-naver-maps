import React from "react";
import { Map, Polyline } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const DynamicPolylineExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [path, setPath] = React.useState([
    { x: 126.978, y: 37.5665 },
    { x: 126.9895, y: 37.5651 },
  ]);

  const addPoint = () => {
    const newPoint = {
      x: 126.978 + (Math.random() - 0.5) * 0.02,
      y: 37.5665 + (Math.random() - 0.5) * 0.02,
    };
    setPath((prev) => [...prev, newPoint]);
  };

  const resetPath = () => {
    setPath([
      { x: 126.978, y: 37.5665 },
      { x: 126.9895, y: 37.5651 },
    ]);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={addPoint}>점 추가</button>
        <button onClick={resetPath} style={{ marginLeft: "6px" }}>
          초기화
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          점 개수: {path.length}
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 126.978, y: 37.5665 }, zoom: 15 }}
        >
          <Polyline
            path={path}
            strokeColor="#007bff"
            strokeOpacity={0.8}
            strokeWeight={4}
          />
        </Map>
      </div>
    </div>
  );
};
