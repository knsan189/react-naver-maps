/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useMap } from "./MapProvider";
import createCustomOverlayClass, {
  CustomOverlayCtor,
  type OverlayAnchorType,
} from "../utils/customOverlay";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  position: naver.maps.Coord | naver.maps.CoordLiteral;
  zIndex?: number;
  anchor?: OverlayAnchorType;
}

const Overlay = ({ children, position, zIndex, anchor }: Props) => {
  const { current: map } = useMap();
  const element = useMemo(() => {
    return document.createElement("div");
  }, []);

  const [instance, setInstance] = useState<InstanceType<CustomOverlayCtor>>();
  const prevPositionRef = useRef<naver.maps.LatLng>(undefined);

  useEffect(() => {
    if (!map) return;
    const CustomOverlay = createCustomOverlayClass();
    const newInstance = new CustomOverlay({ element, position });
    newInstance.setMap(map);
    setInstance(newInstance);
    return () => {
      newInstance.destroy();
    };
  }, [map]);

  useEffect(() => {
    if (!instance) return;
    const next =
      position instanceof naver.maps.LatLng
        ? position
        : new naver.maps.LatLng(position);
    if (!prevPositionRef.current?.equals(next)) {
      instance.setPosition(next);
      prevPositionRef.current = next;
    }
  }, [instance, position]);

  useEffect(() => {
    if (!instance) return;
    instance.setZIndex(zIndex);
  }, [instance, zIndex]);

  useEffect(() => {
    if (!instance) return;
    instance.setAnchor(anchor);
  }, [instance, anchor]);

  return createPortal(children, element);
};

export default Overlay;
