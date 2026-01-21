import React from "react";
import { DataLayer, Map } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";
import useBaseUrl from "@docusaurus/useBaseUrl";

export const DataLayerGeoJsonExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [selectedGeojsonName, setSelectedGeojsonName] = React.useState<
    string | null
  >(null);
  const [useAltGeojsonStyle, setUseAltGeojsonStyle] = React.useState(false);
  const geojsonUrl = useBaseUrl("/data/sample-geojson.json");

  const geojsonStyle: naver.maps.StyleOptions = useAltGeojsonStyle
    ? {
        fillColor: "#f97316",
        fillOpacity: 0.25,
        strokeColor: "#ea580c",
        strokeOpacity: 0.9,
        strokeWeight: 3,
      }
    : {
        fillColor: "#60a5fa",
        fillOpacity: 0.35,
        strokeColor: "#2563eb",
        strokeOpacity: 0.9,
        strokeWeight: 2,
      };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={() => setUseAltGeojsonStyle((prev) => !prev)}
          type="button"
        >
          GeoJSON 스타일 변경
        </button>
      </div>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          initialOptions={{ center: { x: 126.977, y: 37.568 }, zoom: 14 }}
        >
          <DataLayer
            type="geojson"
            data={geojsonUrl}
            style={geojsonStyle}
            onClick={(event) => {
              const name = event.feature.getProperty("name");
              setSelectedGeojsonName(
                typeof name === "string" ? name : "선택된 영역"
              );
            }}
          />
        </Map>
      </div>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        선택된 영역: {selectedGeojsonName ?? "없음"}
      </div>
    </div>
  );
};
