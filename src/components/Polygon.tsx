/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useMap } from "./MapProvider";

export interface PolygonProps extends naver.maps.PolygonOptions {
  onClick?: PolygonCallbacks["click"];
  onMouseEnter?: PolygonCallbacks["mouseenter"];
}

interface PolygonCallbacks {
  click?: (event: unknown) => void;
  mouseenter?: (event: unknown) => void;
}
const Polygon = ({
  onClick = () => {},
  onMouseEnter = () => {},
  ...options
}: PolygonProps) => {
  const { current: map } = useMap();
  const [instance, setInstance] = useState<naver.maps.Polygon | null>(null);
  const callbacksRef = useRef<PolygonCallbacks>({});

  useEffect(() => {
    callbacksRef.current = {
      click: onClick,
      mouseenter: onMouseEnter,
    };
  }, [onClick]);

  useEffect(() => {
    if (!instance) return;
    const handlers: naver.maps.MapEventListener[] = [];

    Object.entries(callbacksRef.current).forEach(([key, value]) => {
      if (!value) return;
      handlers.push(instance.addListener(key, value));
    });

    return () => {
      handlers.forEach((handler) => instance.removeListener(handler));
    };
  }, [instance]);

  useEffect(() => {
    if (!map) return;
    const newInstance = new naver.maps.Polygon(options);
    newInstance.setMap(map);
    setInstance(newInstance);
    return () => {
      newInstance.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    instance?.addListener("click", onClick);
  }, []);
  return null;
};

export default Polygon;
