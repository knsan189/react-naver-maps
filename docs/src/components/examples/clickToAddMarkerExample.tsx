import React from "react";
import { Map, Marker } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const ClickToAddMarkerExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [markers, setMarkers] = React.useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const [idCounter, setIdCounter] = React.useState(0);

  const handleMapClick = (event: naver.maps.PointerEvent) => {
    const coord = event.coord;
    setMarkers((prev) => [...prev, { x: coord.x, y: coord.y, id: idCounter }]);
    setIdCounter((prev) => prev + 1);
  };

  return (
    <div style={{ width: "100%", height: "400px", margin: "20px 0" }}>
      <Map
        ncpKeyId={ncpKeyId}
        initialOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 13 }}
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} position={{ x: marker.x, y: marker.y }} />
        ))}
      </Map>
    </div>
  );
};
