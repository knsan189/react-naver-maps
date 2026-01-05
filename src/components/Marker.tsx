import { useEffect, useRef, useState } from "react";
import useMap from "../hooks/useMap";

export interface MarkerProps extends naver.maps.MarkerOptions {
  zIndex?: number;
  onClick?: (marker: naver.maps.Marker) => void;
  onMouseEnter?: (marker: naver.maps.Marker) => void;
  onMouseLeave?: (marker: naver.maps.Marker) => void;
  onPositionChanged?: (marker: naver.maps.Marker) => void;
  position: [number, number];
}

const Marker = ({
  zIndex,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPositionChanged,
  position,
  icon,
  clickable,
  draggable,
}: MarkerProps) => {
  const { map } = useMap();
  const [marker, setMarker] = useState<naver.maps.Marker>();

  const positionRef = useRef<[number, number]>(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    if (!map) return undefined;
    const newMarker = new naver.maps.Marker({
      icon,
      position: new naver.maps.LatLng(
        positionRef.current[1],
        positionRef.current[0]
      ),
      clickable,
      draggable,
    });
    setMarker(newMarker);
    newMarker.setMap(map);
    return () => {
      setMarker(undefined);
      newMarker.setMap(null);
    };
  }, [map, icon, clickable, draggable]);

  useEffect(() => {
    if (!marker) return undefined;
    marker.setPosition(new naver.maps.LatLng(position[1], position[0]));
  }, [marker, position]);

  useEffect(() => {
    if (zIndex && marker) {
      marker.setZIndex(zIndex);
    }
  }, [zIndex, marker]);

  useEffect(() => {
    if (!marker) return undefined;
    const newEvent = marker.addListener("click", () => onClick?.(marker));
    return () => {
      marker.removeListener(newEvent);
    };
  }, [marker, onClick]);

  useEffect(() => {
    if (!marker) return undefined;
    const newEvent = marker.addListener("mouseover", () =>
      onMouseEnter?.(marker)
    );
    return () => {
      marker.removeListener(newEvent);
    };
  }, [marker, onMouseEnter]);

  useEffect(() => {
    if (!marker) return undefined;
    const newEvent = marker.addListener("mouseout", () =>
      onMouseLeave?.(marker)
    );
    return () => {
      marker.removeListener(newEvent);
    };
  }, [marker, onMouseLeave]);

  useEffect(() => {
    if (!marker) return undefined;
    const newEvent = marker.addListener("position_changed", () => {
      onPositionChanged?.(marker);
    });
    return () => {
      marker.removeListener(newEvent);
    };
  }, [marker, onPositionChanged]);

  return null;
};

export default Marker;

