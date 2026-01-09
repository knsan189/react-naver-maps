import { useEffect } from "react";
import { useMap } from "..";

const Polygon = ({
  paths,
  zIndex,
  strokeColor,
  strokeLineCap,
  strokeWeight,
  strokeStyle,
  strokeLineJoin,
  fillColor,
  fillOpacity,
}: naver.maps.PolygonOptions) => {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    const newPolygon = new naver.maps.Polygon({
      paths,
      zIndex,
      strokeColor,
      strokeLineCap,
      strokeWeight,
      strokeStyle,
      strokeLineJoin,
      fillColor,
      fillOpacity,
    });
    newPolygon.setMap(map);
    return () => {
      newPolygon.setMap(null);
    };
  }, [
    map,
    paths,
    zIndex,
    strokeColor,
    strokeLineCap,
    strokeWeight,
    strokeStyle,
    strokeLineJoin,
    fillColor,
    fillOpacity,
  ]);
  return null;
};

export default Polygon;
