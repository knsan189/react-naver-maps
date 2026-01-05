import { useEffect, useState } from "react";
import useMap from "../hooks/useMap";

export interface PolylineProps
  extends Omit<naver.maps.PolylineOptions, "path"> {
  path: number[][];
  onClick?: (event: unknown) => void;
}

const Polyline = ({
  path,
  strokeColor,
  strokeWeight,
  strokeLineCap,
  strokeLineJoin,
  clickable,
  onClick,
}: PolylineProps) => {
  const { map } = useMap();
  const [polyline, setPolyline] = useState<null | naver.maps.Polyline>(null);
  useEffect(() => {
    if (!map) return;
    const newPoyline = new naver.maps.Polyline({
      path: path.map(([lon, lat]) => new naver.maps.LatLng(lat, lon)),
      strokeColor,
      strokeWeight,
      strokeLineCap,
      strokeLineJoin,
      clickable,
    });
    newPoyline.setMap(map);
    setPolyline(newPoyline);
    return () => {
      newPoyline.setMap(null);
      setPolyline(null);
    };
  }, [
    map,
    path,
    strokeColor,
    clickable,
    strokeWeight,
    strokeLineCap,
    strokeLineJoin,
  ]);

  useEffect(() => {
    if (!polyline || !onClick) return;
    const listener = polyline.addListener("click", onClick);
    return () => {
      polyline.removeListener(listener);
    };
  }, [onClick, polyline]);

  return null;
};

export default Polyline;

