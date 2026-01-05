import { useEffect, useRef, useState, type ReactNode } from "react";
import useMap from "../hooks/useMap";
import createCustomOverlayClass, {
  type OverlayAnchorType,
} from "../utils/customOverlay";

type CustomOverlayCtor = ReturnType<typeof createCustomOverlayClass>;
type CustomOverlayInstance = InstanceType<CustomOverlayCtor>;

interface Props {
  children: ReactNode;
  position: number[];
  zIndex?: number;
  anchor?: OverlayAnchorType;
}

const Overlay = ({
  position,
  children,
  zIndex = 1,
  anchor = "bottom-center",
}: Props) => {
  const { map } = useMap();
  const divRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState<CustomOverlayInstance | null>(null);
  const positionRef = useRef<number[]>(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    if (!map || !divRef.current) return;

    const CustomOverlay = createCustomOverlayClass();
    const newOverlay: CustomOverlayInstance = new CustomOverlay({
      element: divRef.current,
      position: new naver.maps.LatLng(
        positionRef.current[1],
        positionRef.current[0]
      ),
      zIndex,
      anchor,
    });
    newOverlay.setMap(map);
    setOverlay(newOverlay);
    return () => {
      newOverlay.setMap(null);
      setOverlay(null);
    };
  }, [map, zIndex, anchor]);

  useEffect(() => {
    if (!overlay) return;
    overlay.setPosition(new naver.maps.LatLng(position[1], position[0]));
  }, [overlay, position]);

  return (
    <div>
      <div ref={divRef}>{children}</div>
    </div>
  );
};

export default Overlay;

