import React from "react";
import { DataLayer, Map } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const DataLayerGpxExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [gpxStatus, setGpxStatus] = React.useState<string>("로딩 중");
  const [useAltGpxStyle, setUseAltGpxStyle] = React.useState(false);
  const gpxUrl = useBaseUrl("/data/sample-gpx.gpx");

  const gpxStyle: naver.maps.StyleOptions = useAltGpxStyle
    ? {
        strokeColor: "#ef4444",
        strokeOpacity: 0.9,
        strokeWeight: 5,
      }
    : {
        strokeColor: "#22c55e",
        strokeOpacity: 0.9,
        strokeWeight: 3,
      };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={() => setUseAltGpxStyle((prev) => !prev)}
          type="button"
        >
          GPX 스타일 변경
        </button>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          initialOptions={{ center: { x: 126.977, y: 37.568 }, zoom: 11 }}
        >
          <DataLayer
            type="gpx"
            data={gpxUrl}
            style={gpxStyle}
            onLoad={() => setGpxStatus("로딩 완료")}
            onError={() => setGpxStatus("로딩 실패")}
          />
        </Map>
      </div>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        GPX 상태: {gpxStatus}
      </div>
    </div>
  );
};
