import React from "react";
import { Map } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const MapEventsExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [events, setEvents] = React.useState<string[]>([]);

  const addEvent = (eventName: string) => {
    setEvents((prev) => [eventName, ...prev].slice(0, 10));
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{ width: "100%", height: "400px" }}>
        <Map
          ncpKeyId={ncpKeyId}
          mapOptions={{ center: { x: 127.0276, y: 37.4979 }, zoom: 12 }}
          onClick={() => addEvent("지도 클릭")}
          onZoomStart={() => addEvent("줌 시작")}
          onZoomEnd={() => addEvent("줌 종료")}
          onDragStart={() => addEvent("드래그 시작")}
          onDragEnd={() => addEvent("드래그 종료")}
          onBoundsChanged={() => addEvent("범위 변경")}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <h3 style={{ marginBottom: "6px" }}>이벤트 로그</h3>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          {events.map((event, index) => (
            <li key={index} style={{ fontSize: "14px", lineHeight: "1.4" }}>
              {event}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
