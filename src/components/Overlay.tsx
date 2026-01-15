/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMap } from "./MapProvider";
import createCustomOverlayClass, {
  CustomOverlayCtor,
  type OverlayAnchorType,
} from "../utils/customOverlay";

interface Props {
  children: ReactNode;
  position: naver.maps.Coord | naver.maps.CoordLiteral;
  zIndex?: number;
  anchor?: OverlayAnchorType;
}

const Overlay = ({ children, ...options }: Props) => {
  const { current: map } = useMap();
  const containerRef = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<InstanceType<CustomOverlayCtor>>();

  useEffect(() => {
    if (!map || !containerRef.current) return;

    const CustomOverlay = createCustomOverlayClass();

    const newInstance = new CustomOverlay({
      element: containerRef.current,
      ...options,
    });
    newInstance.setMap(map);
    setInstance(newInstance);
    return () => {
      newInstance.destroy();
    };
  }, [map]);

  useEffect(() => {
    if (!instance) return;
    instance.setPosition(options.position);
  }, [instance, options.position]);

  useEffect(() => {
    if (!instance) return;
    instance.setZIndex(options.zIndex);
  }, [instance, options.zIndex]);

  useEffect(() => {
    if (!instance) return;
    instance.setAnchor(options.anchor);
  }, [instance, options.anchor]);

  return (
    <div>
      <div ref={containerRef}>{children}</div>
    </div>
  );
};

export default Overlay;
