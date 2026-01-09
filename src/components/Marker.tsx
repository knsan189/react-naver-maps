/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useMap } from "..";

interface MarkerClickEvent extends naver.maps.PointerEvent {
  overlay: naver.maps.Marker;
  domEvent: naver.maps.DOMEvent;
}

interface MarkerCallbacks {
  click?: (marker: MarkerClickEvent) => void;
  mouseenter?: (marker: naver.maps.Marker) => void;
  mouseleave?: (marker: naver.maps.Marker) => void;
  positionchanged?: (marker: naver.maps.Marker) => void;
}
export interface MarkerProps extends naver.maps.MarkerOptions {
  onClick?: MarkerCallbacks["click"];
  onMouseEnter?: MarkerCallbacks["mouseenter"];
  onMouseLeave?: MarkerCallbacks["mouseleave"];
  onPositionChanged?: MarkerCallbacks["positionchanged"];
}

const Marker = ({
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onPositionChanged = () => {},
  ...markerOptions
}: MarkerProps) => {
  const { current: map } = useMap();
  const [instance, setInstance] = useState<naver.maps.Marker>();

  useEffect(() => {
    if (!map) return undefined;
    const newInstance = new naver.maps.Marker(markerOptions);
    setInstance(newInstance);
    newInstance.setMap(map);
    return () => {
      newInstance.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (!instance) return undefined;
    instance.setPosition(markerOptions.position);
  }, [instance, markerOptions.position]);

  useEffect(() => {
    if (markerOptions.zIndex === undefined || !instance) return;
    instance.setZIndex(markerOptions.zIndex);
  }, [markerOptions.zIndex, instance]);

  const callbacksRef = useRef<MarkerCallbacks>({});

  useEffect(() => {
    callbacksRef.current = {
      click: onClick,
      mouseenter: onMouseEnter,
      mouseleave: onMouseLeave,
      positionchanged: onPositionChanged,
    };
  }, [onClick, onMouseEnter, onMouseLeave, onPositionChanged]);

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

  return null;
};

export default Marker;
