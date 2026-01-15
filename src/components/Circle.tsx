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

interface CircleCallbacks {
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

type HandlerOfProp<P extends PropKey> = CircleCallbacks[{
  [E in EventKey]: (typeof EVENT_TO_PROP)[E] extends P ? E : never;
}[EventKey]];

type CircleEventProps = {
  [P in PropKey]?: HandlerOfProp<P>;
};

type BaseCircleProps = Omit<naver.maps.CircleOptions, "map">;

export interface CircleProps extends BaseCircleProps, CircleEventProps {}

const Circle = forwardRef<naver.maps.Circle, CircleProps>(
  (props: CircleProps, ref: React.Ref<naver.maps.Circle | undefined>) => {
    const { current: map } = useMap();
    const [instance, setInstance] = useState<naver.maps.Circle>();

    const eventProps: CircleEventProps = {};
    const options: Partial<naver.maps.CircleOptions> = {};

    (Object.keys(props) as Array<keyof CircleProps>).forEach((key) => {
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
      const newInstance = new naver.maps.Circle(
        options as naver.maps.CircleOptions
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
      instance.setOptions(options as naver.maps.CircleOptions);
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

Circle.displayName = "Circle";

export default Circle;
