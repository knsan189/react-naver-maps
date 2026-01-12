/* eslint-disable react-hooks/exhaustive-deps */
import {
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  createContext,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { NaverMapsSubmodule } from "../utils/scriptLoader";
import { MountedMapContext } from "./MapProvider";
import useScriptLoader from "../hooks/useScriptLoader";

export const MapContext = createContext<naver.maps.Map | undefined>(undefined);

interface MapCallbacks {
  load?: (map: naver.maps.Map) => void;
  zoomstart?: (map: naver.maps.Map) => void;
  zoomend?: (map: naver.maps.Map) => void;
  dragstart?: (map: naver.maps.Map) => void;
  dragend?: (map: naver.maps.Map) => void;
  idle?: (event: "idle", map: naver.maps.Map) => void;
  resize?: (event: "resize", map: naver.maps.Map) => void;
  scroll?: (event: "scroll", map: naver.maps.Map) => void;
}

export interface MapProps {
  ncpKeyId: string;
  id?: string;
  mapTypeId?: naver.maps.MapTypeId;
  mapOptions?: naver.maps.MapOptions;
  children: ReactNode;
  submodules?: NaverMapsSubmodule[];
  style?: React.CSSProperties;
  onLoad?: MapCallbacks["load"];
  onZoomStart?: MapCallbacks["zoomstart"];
  onZoomEnd?: MapCallbacks["zoomend"];
  onDragEnd?: MapCallbacks["dragend"];
  onDragStart?: MapCallbacks["dragstart"];
  onIdle?: MapCallbacks["idle"];
  onResize?: MapCallbacks["resize"];
  onScroll?: MapCallbacks["scroll"];
}

const Map = forwardRef<naver.maps.Map, MapProps>(
  (
    {
      id,
      mapTypeId = "normal" as naver.maps.MapTypeId,
      ncpKeyId,
      children,
      mapOptions,
      submodules = [],
      style,
      onLoad = () => {},
      onZoomStart = () => {},
      onZoomEnd = () => {},
      onDragStart = () => {},
      onDragEnd = () => {},
      onIdle = () => {},
      onResize = () => {},
      onScroll = () => {},
    }: MapProps,
    ref: React.Ref<naver.maps.Map | undefined>
  ) => {
    const mountedMapContext = useContext(MountedMapContext);
    const containerRef = useRef<HTMLDivElement>(null);

    const [mapInstance, setMapInstance] = useState<naver.maps.Map>();
    const contextValueRef = useRef<naver.maps.Map | undefined>(undefined);

    const { isScriptLoaded } = useScriptLoader({ ncpKeyId, submodules });

    useEffect(() => {
      if (!isScriptLoaded || !containerRef.current) return;
      const newInstance = new naver.maps.Map(containerRef.current, mapOptions);
      setMapInstance(newInstance);
      mountedMapContext.onMount(newInstance, id);
      contextValueRef.current = newInstance;
      return () => {
        mountedMapContext.onUnmount(id);
        contextValueRef.current = undefined;
        newInstance.destroy();
      };
    }, [isScriptLoaded]);

    const callbacksRef = useRef<MapCallbacks>({});

    useEffect(() => {
      callbacksRef.current = {
        load: onLoad,
        zoomstart: onZoomStart,
        zoomend: onZoomEnd,
        dragend: onDragEnd,
        dragstart: onDragStart,
        idle: onIdle,
        resize: onResize,
        scroll: onScroll,
      };
    }, [
      onLoad,
      onZoomStart,
      onDragEnd,
      onDragStart,
      onIdle,
      onResize,
      onScroll,
    ]);

    useEffect(() => {
      if (!mapInstance) return;
      mapInstance.setMapTypeId(mapTypeId);
    }, [mapInstance, mapTypeId]);

    useEffect(() => {
      if (!mapInstance) return;
      const listeners: naver.maps.MapEventListener[] = [];
      Object.entries(callbacksRef.current).forEach(([event, callback]) => {
        const listener = mapInstance.addListener(event, callback);
        listeners.push(listener);
      });
      return () => {
        listeners.forEach((listener) => {
          mapInstance.removeListener(listener);
        });
      };
    }, [mapInstance]);

    useEffect(() => {
      if (!mapInstance) return;
      mapInstance.setMapTypeId(mapTypeId);
    }, [mapInstance, mapTypeId]);

    useEffect(() => {
      if (!mapInstance || !mapOptions) return;
      mapInstance.setOptions(mapOptions);
    }, [mapInstance, mapOptions]);

    useImperativeHandle(ref, () => contextValueRef.current, [mapInstance]);

    const containerStyle = useMemo(() => {
      return { width: "100%", height: "100%", ...style };
    }, [style]);

    return (
      <div id={id} style={containerStyle} ref={containerRef}>
        {mapInstance && (
          <MapContext.Provider value={mapInstance}>
            {children}
          </MapContext.Provider>
        )}
      </div>
    );
  }
);

Map.displayName = "Map";

export default Map;
