import React from "react";
import { Map, Polyline } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const RasterMapMultiplePolylineExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [paths, setPaths] = React.useState<
    Array<Array<{ x: number; y: number }>>
  >([]);

  React.useEffect(() => {
    // 많은 수의 경로 생성
    const generatedPaths: Array<Array<{ x: number; y: number }>> = [];
    for (let i = 0; i < 100; i++) {
      const path: Array<{ x: number; y: number }> = [];
      for (let j = 0; j < 10; j++) {
        path.push({
          x: 127.0276 + (Math.random() - 0.5) * 0.1,
          y: 37.4979 + (Math.random() - 0.5) * 0.1,
        });
      }
      generatedPaths.push(path);
    }
    setPaths(generatedPaths);
  }, []);

  return (
    <div style={{ width: "100%", height: "500px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        disableGL
        initialOptions={{
          center: { x: 127.0276, y: 37.4979 },
          zoom: 12,
        }}
      >
        {paths.map((path, index) => (
          <Polyline
            key={index}
            path={path}
            strokeColor={`hsl(${(index * 10) % 360}, 70%, 50%)`}
            strokeWeight={2}
            strokeOpacity={0.7}
          />
        ))}
      </Map>
    </div>
  );
};
