import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map, MapProvider } from "@rousen/react-naver-maps";
import { defaultNcpKeyId, type MapExampleProps } from "./types";

export const ReuseMapExample: React.FC<MapExampleProps> = ({
  ncpKeyId = defaultNcpKeyId,
}: MapExampleProps) => {
  const [visible, setVisible] = useState(true);
  const [sameInstance, setSameInstance] = useState<boolean | null>(null);
  const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);
  const mapRef = useRef<naver.maps.Map>(undefined);
  const lastRef = useRef<naver.maps.Map>(undefined);

  const handleMapRef = useCallback((instance?: naver.maps.Map) => {
    mapRef.current = instance;
    setMapInstance(instance ?? null);
  }, []);

  useEffect(() => {
    if (!visible || !mapInstance) return;
    if (lastRef.current) {
      setSameInstance(mapInstance === lastRef.current);
    } else {
      setSameInstance(null);
    }
    lastRef.current = mapInstance;
  }, [mapInstance, visible]);

  return (
    <MapProvider>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button onClick={() => setVisible((v) => !v)}>toggle</button>
        {sameInstance !== null && (
          <span>same instance: {String(sameInstance)}</span>
        )}
      </div>
      <div style={{ width: "100%", height: 360, marginTop: 12 }}>
        {visible && (
          <Map id="reuse" reuseMap ncpKeyId={ncpKeyId} ref={handleMapRef} />
        )}
      </div>
    </MapProvider>
  );
};
