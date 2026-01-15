/* eslint-disable react-hooks/exhaustive-deps */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useMap } from "./MapProvider";

const EVENT_TO_PROP = {
  click: "onClick",
  dblclick: "onDblclick",
  rightclick: "onRightclick",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mouseout: "onMouseOut",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
} as const;

type EventKey = keyof typeof EVENT_TO_PROP;
type PropKey = (typeof EVENT_TO_PROP)[EventKey];

interface PolygonCallbacks {
  click?: (event: naver.maps.PointerEvent) => void;
  dblclick?: (event: naver.maps.PointerEvent) => void;
  rightclick?: (event: naver.maps.PointerEvent) => void;
  mousedown?: (event: naver.maps.PointerEvent) => void;
  mouseup?: (event: naver.maps.PointerEvent) => void;
  mouseover?: (event: naver.maps.PointerEvent) => void;
  mouseout?: (event: naver.maps.PointerEvent) => void;
  mouseenter?: (event: naver.maps.PointerEvent) => void;
  mouseleave?: (event: naver.maps.PointerEvent) => void;
}

type HandlerOfProp<P extends PropKey> = PolygonCallbacks[{
  [E in EventKey]: (typeof EVENT_TO_PROP)[E] extends P ? E : never;
}[EventKey]];

type PolygonEventProps = {
  [P in PropKey]?: HandlerOfProp<P>;
};

type BasePolygonProps = Omit<naver.maps.PolygonOptions, "map">;

export interface PolygonProps extends BasePolygonProps, PolygonEventProps {}

const Polygon = forwardRef<naver.maps.Polygon, PolygonProps>(
  (props: PolygonProps, ref: React.Ref<naver.maps.Polygon | undefined>) => {
    const { current: map } = useMap();
    const [instance, setInstance] = useState<naver.maps.Polygon>();

    const eventProps: PolygonEventProps = {};
    const options: Partial<naver.maps.PolygonOptions> = {};

    (Object.keys(props) as Array<keyof PolygonProps>).forEach((key) => {
      const propKey = key as PropKey;
      if (
        Object.values(EVENT_TO_PROP).includes(
          propKey as (typeof EVENT_TO_PROP)[EventKey]
        )
      ) {
        const value = props[propKey];
        if (value !== undefined) {
          (eventProps as Record<string, unknown>)[propKey] = value;
        }
      } else {
        const value = props[key];
        if (value !== undefined) {
          (options as Record<string, unknown>)[key] = value;
        }
      }
    });

    useEffect(() => {
      if (!map) return undefined;
      const newInstance = new naver.maps.Polygon(
        options as naver.maps.PolygonOptions
      );
      setInstance(newInstance);
      newInstance.setMap(map);
      return () => {
        if (!map) return;
        newInstance.setMap(null);
      };
    }, [map]);

    useEffect(() => {
      if (!instance) return;
      instance.setOptions(options as naver.maps.PolygonOptions);
    }, [instance, options]);

    const handlersRef = useRef<
      Partial<Record<EventKey, (...args: unknown[]) => void>>
    >({});

    useEffect(() => {
      const next: Partial<Record<EventKey, (...args: unknown[]) => void>> = {};
      (Object.keys(EVENT_TO_PROP) as EventKey[]).forEach((eventKey) => {
        const propKey = EVENT_TO_PROP[eventKey];
        const fn = (eventProps as Record<string, unknown>)[propKey];
        if (typeof fn === "function")
          next[eventKey] = fn as (...args: unknown[]) => void;
      });
      handlersRef.current = next;
    }, [eventProps]);

    useEffect(() => {
      if (!instance) return;

      const disposers: Array<() => void> = [];
      (Object.keys(EVENT_TO_PROP) as EventKey[]).forEach((eventKey) => {
        const listener = naver.maps.Event.addListener(
          instance,
          eventKey,
          (...args: unknown[]) => {
            handlersRef.current[eventKey]?.(...args);
          }
        );
        disposers.push(() => naver.maps.Event.removeListener(listener));
      });
      return () => disposers.forEach((d) => d());
    }, [instance]);

    useImperativeHandle(ref, () => instance, [instance]);

    return null;
  }
);

Polygon.displayName = "Polygon";

export default Polygon;
