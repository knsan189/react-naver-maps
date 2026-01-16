import React from "react";
import { Map, Polygon } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const PolygonExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const paths: naver.maps.ArrayOfCoordsLiteral[] = [
    [
      { y: 37.37544345085402, x: 127.11224555969238 },
      { y: 37.37230584065902, x: 127.10791110992432 },
      { y: 37.35975408751081, x: 127.10795402526855 },
      { y: 37.359924641705476, x: 127.11576461791992 },
      { y: 37.35931064479073, x: 127.12211608886719 },
      { y: 37.36043630196386, x: 127.12293148040771 },
      { y: 37.36354029942161, x: 127.12310314178465 },
      { y: 37.365211629488016, x: 127.12456226348876 },
      { y: 37.37544345085402, x: 127.11224555969238 },
    ],
  ];

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        mapOptions={{ center: { x: 127.1137238, y: 37.3664975 }, zoom: 13 }}
      >
        <Polygon
          paths={paths}
          fillColor="#ff0000"
          fillOpacity={0.3}
          strokeColor="#ff0000"
          strokeOpacity={0.8}
          strokeWeight={3}
        />
      </Map>
    </div>
  );
};
