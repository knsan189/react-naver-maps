import React from "react";
import { Map, Marker, Polygon, Polyline } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const ShapeDrawingExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [points, setPoints] = React.useState<Array<{ x: number; y: number }>>(
    []
  );

  const handleMapClick = (event: naver.maps.PointerEvent) => {
    const { x, y } = event.coord;
    setPoints((prev) => [...prev, { x, y }]);
  };

  const handleUndo = () => {
    setPoints((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPoints([]);
  };

  const hasPolygon = points.length >= 3;

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleUndo} disabled={points.length === 0}>
          마지막 점 삭제
        </button>
        <button
          onClick={handleClear}
          disabled={points.length === 0}
          style={{ marginLeft: "6px" }}
        >
          초기화
        </button>
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          점 {points.length}개
        </span>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 13 }}
          onClick={handleMapClick}
        >
          {points.map((point, index) => (
            <Marker key={index} position={point} />
          ))}
          {points.length >= 2 && (
            <Polyline
              path={points}
              strokeColor="#2563eb"
              strokeOpacity={0.9}
              strokeWeight={3}
            />
          )}
          {hasPolygon && (
            <Polygon
              paths={[points]}
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
