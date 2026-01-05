import { useContext, useEffect, useMemo, useState } from "react";
import { MapContext } from "../context/MapContext";
import { loadNaverMaps, NaverMapsSubmodule } from "../utils/scriptLoader";

export interface MapProps {
  ncpKeyId: string;
  id?: string;
  mapTypeId?: naver.maps.MapTypeId;
  mapOptions?: naver.maps.MapOptions;
  children: React.ReactNode;
  submodules?: NaverMapsSubmodule[];
  style?: React.CSSProperties;
  onBoundsChanged?: (map: naver.maps.Map) => void;
  onLoad?: (map: naver.maps.Map) => void;
  onMoveEnd?: (map: naver.maps.Map) => void;
  onMoveStart?: (map: naver.maps.Map) => void;
}

const Map = ({
  id = "naver-map",
  mapTypeId = "normal" as naver.maps.MapTypeId,
  ncpKeyId,
  children,
  mapOptions,
  submodules = [],
  style,
  onBoundsChanged,
  onLoad,
  onMoveEnd,
  onMoveStart,
}: MapProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { map, setMap } = useContext(MapContext);

  const key = useMemo(() => {
    return JSON.stringify({
      id,
      mapOptions,
      submodules,
    });
  }, [id, mapOptions, submodules]);

  useEffect(() => {
    const { submodules } = JSON.parse(key);
    loadNaverMaps({
      ncpKeyId,
      submodules: submodules as NaverMapsSubmodule[],
    }).then(() => {
      setIsScriptLoaded(true);
    });
  }, [key, ncpKeyId]);

  useEffect(() => {
    if (!isScriptLoaded) return;
    const { id, mapOptions } = JSON.parse(key);
    const newMap = new naver.maps.Map(id, mapOptions);
    setMap(newMap);
  }, [isScriptLoaded, setMap, key]);

  useEffect(() => {
    if (!map) return;
    map.setMapTypeId(mapTypeId);
  }, [map, mapTypeId]);

  useEffect(() => {
    if (!map || !onBoundsChanged) return;
    const listener = map.addListener("bounds_changed", () => {
      onBoundsChanged(map);
    });
    return () => {
      map.removeListener(listener);
    };
  }, [map, onBoundsChanged]);

  useEffect(() => {
    if (!map || !onLoad) return;
    const listener = map.addListener("init", () => {
      onLoad(map);
    });
    return () => {
      map.removeListener(listener);
    };
  }, [map, onLoad]);

  useEffect(() => {
    if (!map || !onMoveEnd) return;
    const handleMoveEnd = () => {
      onMoveEnd(map);
    };
    const dragendListener = map.addListener("dragend", handleMoveEnd);
    const zoomendListener = map.addListener("zoomend", handleMoveEnd);
    return () => {
      map.removeListener(dragendListener);
      map.removeListener(zoomendListener);
    };
  }, [map, onMoveEnd]);

  useEffect(() => {
    if (!map || !onMoveStart) return;
    const dragstartListener = map.addListener("dragstart", () => {
      onMoveStart(map);
    });
    const zoomstartListener = map.addListener("zoomstart", () => {
      onMoveStart(map);
    });
    return () => {
      map.removeListener(dragstartListener);
      map.removeListener(zoomstartListener);
    };
  }, [map, onMoveStart]);

  return (
    <div id={id} style={{ width: "100%", height: "100%", ...style }}>
      {children}
    </div>
  );
};

export default Map;

