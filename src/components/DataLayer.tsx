import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMap } from "./MapProvider";

const EVENT_TO_PROP = {
  addfeature: "onAddFeature",
  removefeature: "onRemoveFeature",
  setfeature: "onSetFeature",
  setgeometry: "onSetGeometry",
  setproperty: "onSetProperty",
  removeproperty: "onRemoveProperty",
  click: "onClick",
  dblclick: "onDblclick",
  rightclick: "onRightclick",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mouseout: "onMouseOut",
  mousemove: "onMouseMove",
} as const;

type EventKey = keyof typeof EVENT_TO_PROP;
type PropKey = (typeof EVENT_TO_PROP)[EventKey];

interface DataLayerCallbacks {
  addfeature?: (event: naver.maps.FeatureEvent) => void;
  removefeature?: (event: naver.maps.FeatureEvent) => void;
  setfeature?: (event: naver.maps.FeatureEvent) => void;
  setgeometry?: (event: naver.maps.FeatureEvent) => void;
  setproperty?: (event: naver.maps.PropertyEvent) => void;
  removeproperty?: (event: naver.maps.PropertyEvent) => void;
  click?: (event: naver.maps.PointerEvent) => void;
  dblclick?: (event: naver.maps.PointerEvent) => void;
  rightclick?: (event: naver.maps.PointerEvent) => void;
  mousedown?: (event: naver.maps.PointerEvent) => void;
  mouseup?: (event: naver.maps.PointerEvent) => void;
  mouseover?: (event: naver.maps.PointerEvent) => void;
  mouseout?: (event: naver.maps.PointerEvent) => void;
  mousemove?: (event: naver.maps.PointerEvent) => void;
}

type HandlerOfProp<P extends PropKey> = DataLayerCallbacks[{
  [E in EventKey]: (typeof EVENT_TO_PROP)[E] extends P ? E : never;
}[EventKey]];

type DataLayerEventProps = {
  [P in PropKey]?: HandlerOfProp<P>;
};

type DataLayerType = "gpx" | "kml" | "geojson";

export interface DataLayerProps extends DataLayerEventProps {
  type: DataLayerType;
  url: string;
  autoStyle?: boolean;
  style?: naver.maps.StyleOptions | naver.maps.StylingFunction;
  onLoad?: (layer: naver.maps.Data) => void;
  onError?: (error: Error) => void;
}

const DataLayer = ({
  type,
  url,
  autoStyle = true,
  style,
  onLoad,
  onError,
  ...eventProps
}: DataLayerProps) => {
  const { current: map } = useMap();
  const [layer, setLayer] = useState<naver.maps.Data>();

  const cleanUpFeatures = useMemo(() => {
    return (target: naver.maps.Data) => {
      target.getAllFeature().forEach((feature) => {
        target.removeFeature(feature);
      });
    };
  }, []);

  useEffect(() => {
    if (!map) return;
    const newLayer = new naver.maps.Data();
    newLayer.setMap(map);
    setLayer(newLayer);
    return () => {
      newLayer.setMap(null);
      setLayer(undefined);
    };
  }, [map]);

  useEffect(() => {
    if (!layer) return;
    const controller = new AbortController();
    const load = async () => {
      try {
        cleanUpFeatures(layer);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch data layer: ${response.status}`);
        }
        if (type === "geojson") {
          const geojson = (await response.json()) as naver.maps.GeoJSON;
          if (!controller.signal.aborted) {
            layer.addGeoJson(geojson, autoStyle);
            onLoad?.(layer);
          }
          return;
        }
        const text = await response.text();
        if (controller.signal.aborted) return;
        const xml = new DOMParser().parseFromString(text, "text/xml");
        if (type === "gpx") layer.addGpx(xml as naver.maps.GPX, autoStyle);
        if (type === "kml") layer.addKml(xml as naver.maps.KML, autoStyle);
        onLoad?.(layer);
      } catch (error) {
        if (controller.signal.aborted) return;
        onError?.(error as Error);
      }
    };
    load();
    return () => controller.abort();
  }, [layer, type, url, autoStyle, cleanUpFeatures, onLoad, onError]);

  useEffect(() => {
    if (!layer || style === undefined) return;
    layer.setStyle(style);
  }, [layer, style]);

  const handlersRef = useRef<
    Partial<Record<EventKey, (...args: unknown[]) => void>>
  >({});

  useEffect(() => {
    const next: Partial<Record<EventKey, (...args: unknown[]) => void>> = {};
    (Object.keys(EVENT_TO_PROP) as EventKey[]).forEach((eventKey) => {
      const propKey = EVENT_TO_PROP[eventKey];
      const fn = (eventProps as DataLayerEventProps)[propKey];
      if (typeof fn === "function") {
        next[eventKey] = fn as (...args: unknown[]) => void;
      }
    });
    handlersRef.current = next;
  }, [eventProps]);

  useEffect(() => {
    if (!layer) return;
    const disposers: Array<() => void> = [];
    (Object.keys(EVENT_TO_PROP) as EventKey[]).forEach((eventKey) => {
      const listener = naver.maps.Event.addListener(
        layer,
        eventKey,
        (...args: unknown[]) => {
          handlersRef.current[eventKey]?.(...args);
        }
      );
      disposers.push(() => naver.maps.Event.removeListener(listener));
    });
    return () => disposers.forEach((d) => d());
  }, [layer]);

  return null;
};

export default DataLayer;
