/* eslint-disable react-hooks/exhaustive-deps */
import {
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { NaverMapsSubmodule } from "../utils/scriptLoader";
import { MapContext, MountedMapContext } from "./MapProvider";
import useScriptLoader from "../hooks/useScriptLoader";

const EVENT_TO_PROP = {
  init: "onInit",
  bounds_changed: "onBoundsChanged",
  dragstart: "onDragStart",
  dragend: "onDragEnd",
  idle: "onIdle",
  resize: "onResize",
  scroll: "onScroll",
  addLayer: "onAddLayer",
  center_changed: "onCenterChanged",
  centerPoint_changed: "onCenterPointChanged",
  click: "onClick",
  dbclick: "onDbclick",
  doubletap: "onDoubletap",
  mapType_changed: "onMapTypeChanged",
  mapTypeId_changed: "onMapTypeIdChanged",
  mousedown: "onMousedown",
  mousemove: "onMousemove",
  mouseout: "onMouseout",
  mouseover: "onMouseover",
  mouseup: "onMouseup",
  panning: "onPanning",
  pinch: "onPinch",
  pinch_start: "onPinchStart",
  projection_changed: "onProjectionChanged",
  removeLayer: "onRemoveLayer",
  size_changed: "onSizeChanged",
  tap: "onTap",
  tilesloaded: "onTilesLoaded",
  touchend: "onTouchEnd",
  touchstart: "onTouchStart",
  touchmove: "onTouchMove",
  twofintertap: "onTwoFingerTap",
  zoom_changed: "onZoomChanged",
  zoomend: "onZoomEnd",
  zoomstart: "onZoomStart",
} as const;

type EventKey = keyof typeof EVENT_TO_PROP;
type PropKey = (typeof EVENT_TO_PROP)[EventKey];

interface MapCallbacks {
  addLayer?: (layer: naver.maps.Layer) => void;
  center_changed?: (center: naver.maps.Coord) => void;
  centerPoint_changed?: (centerPoint: naver.maps.LatLng) => void;
  click?: (event: naver.maps.PointerEvent) => void;
  dbclick?: (event: naver.maps.PointerEvent) => void;
  doubletap?: (event: naver.maps.PointerEvent) => void;
  bounds_changed?: (bounds: naver.maps.Bounds) => void;
  drag?: (event: naver.maps.PointerEvent) => void;
  dragstart?: (event: naver.maps.PointerEvent) => void;
  dragend?: (event: naver.maps.PointerEvent) => void;
  idle?: () => void;
  init?: () => void;
  scroll?: () => void;
  rightclick?: (event: naver.maps.PointerEvent) => void;
  keydown?: (event: naver.maps.DOMEvent) => void;
  keyup?: (event: naver.maps.DOMEvent) => void;
  longtap?: (event: naver.maps.PointerEvent) => void;
  mapType_changed?: (mapType: naver.maps.MapType) => void;
  mapTypeId_changed?: (mapTypeId: naver.maps.MapTypeId) => void;
  mousedown?: (event: naver.maps.PointerEvent) => void;
  mousemove?: (event: naver.maps.PointerEvent) => void;
  mouseout?: (event: naver.maps.PointerEvent) => void;
  mouseover?: (event: naver.maps.PointerEvent) => void;
  mouseup?: (event: naver.maps.PointerEvent) => void;
  panning?: () => void;
  pinch?: (event: naver.maps.PointerEvent) => void;
  pinch_start?: (event: naver.maps.PointerEvent) => void;
  projection_changed?: (projection: naver.maps.Projection) => void;
  removeLayer?: (layerName: naver.maps.Layer["name"]) => void;
  resize?: () => void;
  size_changed?: (size: naver.maps.Size) => void;
  tap?: (event: naver.maps.PointerEvent) => void;
  tilesloaded?: () => void;
  touchend?: () => void;
  touchmove?: (event: naver.maps.PointerEvent) => void;
  touchstart?: (event: naver.maps.PointerEvent) => void;
  twofintertap?: (event: naver.maps.PointerEvent) => void;
  zoom_changed?: (zoom: number) => void;
  zoomstart?: () => void;
  zoomend?: () => void;
}

type HandlerOfProp<P extends PropKey> = MapCallbacks[{
  [E in EventKey]: (typeof EVENT_TO_PROP)[E] extends P ? E : never;
}[EventKey]];

type MapEventProps = {
  [P in PropKey]?: HandlerOfProp<P>;
};

export interface MapProps extends MapEventProps {
  ncpKeyId: string;
  id?: string;
  mapTypeId?: naver.maps.MapTypeId;
  initialOptions?: Omit<naver.maps.MapOptions, "gl">;
  children?: ReactNode;
  submodules?: NaverMapsSubmodule[];
  style?: React.CSSProperties;
  disableGL?: boolean;
  reuseMap?: boolean;
  center?: naver.maps.MapOptions["center"];
  zoom?: naver.maps.MapOptions["zoom"];
}

const Map = forwardRef<naver.maps.Map, MapProps>(
  (
    {
      id,
      mapTypeId = "normal" as naver.maps.MapTypeId,
      ncpKeyId,
      children,
      initialOptions = {},
      submodules = [],
      style,
      disableGL = false,
      reuseMap = false,
      center,
      zoom,
      ...eventProps
    }: MapProps,
    ref: React.Ref<naver.maps.Map | undefined>
  ) => {
    const mountedMapContext = useContext(MountedMapContext);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<naver.maps.Map>();
    const contextValueRef = useRef<naver.maps.Map | undefined>(undefined);

    const { isScriptLoaded } = useScriptLoader({
      ncpKeyId,
      submodules,
      disableGL,
    });

    useEffect(() => {
      if (!isScriptLoaded || !containerRef.current) return;

      if (id === "current") {
        throw new Error("id cannot be 'current' use other id");
      }

      const mapId = id ?? "default";
      const existing = mountedMapContext.maps[mapId];

      const parkMapElement = (map: naver.maps.Map) => {
        const parking = mountedMapContext.getParkingContainer();
        const element = map.getElement();
        if (
          parking &&
          element &&
          element.parentElement === containerRef.current
        ) {
          parking.appendChild(element);
        }
      };

      if (reuseMap && existing) {
        const existingElement = existing.getElement();

        if (existingElement && containerRef.current) {
          if (existingElement.parentElement !== containerRef.current) {
            while (containerRef.current.firstChild) {
              containerRef.current.removeChild(containerRef.current.firstChild);
            }
            containerRef.current.appendChild(existingElement);
          }
        }

        existing.refresh();

        setMapInstance(existing);
        contextValueRef.current = existing;

        return () => {
          parkMapElement(existing);
          mountedMapContext.onUnmount(mapId, { keep: true });
          contextValueRef.current = undefined;
        };
      }

      const newInstance = new naver.maps.Map(containerRef.current, {
        ...initialOptions,
        gl: !disableGL,
      });

      setMapInstance(newInstance);
      mountedMapContext.onMount(newInstance, mapId);
      contextValueRef.current = newInstance;

      return () => {
        if (reuseMap) {
          parkMapElement(newInstance);
          mountedMapContext.onUnmount(mapId, { keep: true });
          contextValueRef.current = undefined;
          return;
        }
        mountedMapContext.onUnmount(mapId);
        contextValueRef.current = undefined;
        queueMicrotask(() => {
          newInstance.destroy();
        });
      };
    }, [isScriptLoaded, reuseMap, id]);

    const handlersRef = useRef<
      Partial<Record<EventKey, (...args: unknown[]) => void>>
    >({});

    useEffect(() => {
      const next: Partial<Record<EventKey, (...args: unknown[]) => void>> = {};
      (Object.keys(EVENT_TO_PROP) as EventKey[]).forEach((eventKey) => {
        const propKey = EVENT_TO_PROP[eventKey];
        const fn = (eventProps as MapEventProps)[propKey];
        if (typeof fn === "function")
          next[eventKey] = fn as (...args: unknown[]) => void;
      });
      handlersRef.current = next;
    }, [eventProps]);

    useEffect(() => {
      if (!mapInstance) return;
      mapInstance.setMapTypeId(mapTypeId);
    }, [mapInstance, mapTypeId]);

    useEffect(() => {
      if (!mapInstance) return;

      const disposers: Array<() => void> = [];
      (Object.keys(EVENT_TO_PROP) as EventKey[]).forEach((eventKey) => {
        const listener = naver.maps.Event.addListener(
          mapInstance,
          eventKey,
          (...args: unknown[]) => {
            handlersRef.current[eventKey]?.(...args);
          }
        );
        disposers.push(() => naver.maps.Event.removeListener(listener));
      });
      return () => disposers.forEach((d) => d());
    }, [mapInstance]);

    const prevCenterRef = useRef<naver.maps.LatLng | undefined>(undefined);

    useEffect(() => {
      if (!mapInstance || !center) return;
      const next =
        center instanceof naver.maps.LatLng
          ? center
          : new naver.maps.LatLng(center);

      if (!prevCenterRef.current?.equals(next)) {
        mapInstance.setCenter(next);
        prevCenterRef.current = next;
      }
    }, [mapInstance, center]);

    useEffect(() => {
      if (!mapInstance || !zoom) return;
      if (zoom !== undefined) {
        mapInstance.setZoom(zoom, true);
      }
    }, [mapInstance, zoom]);

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
