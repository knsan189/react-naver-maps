import { useEffect, useRef, useState } from "react";
import { useMap } from "./MapProvider";

export interface PolylineProps extends naver.maps.PolylineOptions {
  onClick?: PolylineCallbacks["click"];
  onMouseEnter?: PolylineCallbacks["mouseenter"];
}

interface PolylineCallbacks {
  click?: (event: unknown) => void;
  mouseenter?: (event: unknown) => void;
}

const Polyline = ({
  onClick,
  onMouseEnter = () => {},
  ...options
}: PolylineProps) => {
  const { current: map } = useMap();

  const [instance, setInstance] = useState<null | naver.maps.Polyline>(null);

  const callbacksRef = useRef<PolylineCallbacks>({
    click: onClick,
  });

  useEffect(() => {
    callbacksRef.current = {
      click: onClick,
      mouseenter: onMouseEnter,
    };
  }, [onClick, onMouseEnter]);

  useEffect(() => {
    if (!instance) return;

    const handlers: naver.maps.MapEventListener[] = [];
    (Object.keys(callbacksRef.current) as (keyof PolylineCallbacks)[]).forEach(
      (key) => {
        const listener = instance.addListener(key, (...args: unknown[]) => {
          const callback = callbacksRef.current[
            key as keyof PolylineCallbacks
          ] as ((...args: unknown[]) => void) | undefined;
          if (callback) {
            callback(...args);
          }
        });
        handlers.push(listener);
      }
    );

    return () => {
      handlers.forEach((h) => naver.maps.Event.removeListener(h));
    };
  }, [instance]);

  useEffect(() => {
    if (!map) return;
    const newPoyline = new naver.maps.Polyline(options);
    newPoyline.setMap(map);
    setInstance(newPoyline);
    return () => {
      if (!map) return;
      newPoyline.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
};

export default Polyline;
