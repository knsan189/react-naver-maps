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
  position_changed: "onPositionChanged",
  rightclick: "onRightclick",
  title_changed: "onTitleChanged",
  touchend: "onTouchEnd",
  touchstart: "onTouchStart",
  visible_changed: "onVisibleChanged",
  zindex_changed: "onZIndexChanged",
  clickable_changed: "onClickableChanged",
  dblclick: "onDblclick",
  draggable_changed: "onDraggableChanged",
  icon_changed: "onIconChanged",
  icon_loaded: "onIconLoaded",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  mouseover: "onMouseOver",
  mouseout: "onMouseOut",
} as const;

type EventKey = keyof typeof EVENT_TO_PROP;
type PropKey = (typeof EVENT_TO_PROP)[EventKey];

interface MarkerCallbacks {
  click?: (event: naver.maps.PointerEvent) => void;
  clickable_changed?: (clickable: boolean) => void;
  dblclick?: (event: naver.maps.PointerEvent) => void;
  draggable_changed?: (draggable: boolean) => void;
  icon_changed?: (
    icon:
      | string
      | naver.maps.ImageIcon
      | naver.maps.SymbolIcon
      | naver.maps.HtmlIcon
  ) => void;
  icon_loaded?: (marker: naver.maps.Marker) => void;
  position_changed?: (position: naver.maps.Coord) => void;
  rightclick?: (event: naver.maps.PointerEvent) => void;
  title_changed?: (title: string) => void;
  touchend?: (event: naver.maps.PointerEvent) => void;
  touchstart?: (event: naver.maps.PointerEvent) => void;
  visible_changed?: (visible: boolean) => void;
  zindex_changed?: (zIndex: number) => void;
  mousedown?: (event: naver.maps.PointerEvent) => void;
  mouseup?: (event: naver.maps.PointerEvent) => void;
  mouseover?: (event: naver.maps.PointerEvent) => void;
  mouseout?: (event: naver.maps.PointerEvent) => void;
}

type HandlerOfProp<P extends PropKey> = MarkerCallbacks[{
  [E in EventKey]: (typeof EVENT_TO_PROP)[E] extends P ? E : never;
}[EventKey]];

type MarkerEventProps = {
  [P in PropKey]?: HandlerOfProp<P>;
};

type BaseMarkerProps = Omit<naver.maps.MarkerOptions, "map">;

export interface MarkerProps extends BaseMarkerProps, MarkerEventProps {}

const Marker = forwardRef<naver.maps.Marker, MarkerProps>(
  (props: MarkerProps, ref: React.Ref<naver.maps.Marker | undefined>) => {
    const { current: map } = useMap();
    const [instance, setInstance] = useState<naver.maps.Marker>();

    const eventProps: MarkerEventProps = {};
    const options: Partial<naver.maps.MarkerOptions> = {};

    (Object.keys(props) as Array<keyof MarkerProps>).forEach((key) => {
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
      const newInstance = new naver.maps.Marker(
        options as naver.maps.MarkerOptions
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
      const position = (options as naver.maps.MarkerOptions).position;
      if (position) {
        instance.setPosition(position);
      }
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const animation = (options as naver.maps.MarkerOptions).animation;
      instance.setAnimation(animation ?? null);
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const clickable = (options as naver.maps.MarkerOptions).clickable;
      instance.setClickable(clickable ?? false);
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const zIndex = (options as naver.maps.MarkerOptions).zIndex;
      if (zIndex !== undefined) {
        instance.setZIndex(zIndex);
      }
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const cursor = (options as naver.maps.MarkerOptions).cursor;
      instance.setCursor(cursor ?? "");
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const draggable = (options as naver.maps.MarkerOptions).draggable;
      instance.setDraggable(draggable ?? false);
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const icon = (options as naver.maps.MarkerOptions).icon;
      if (icon) {
        instance.setIcon(icon);
      }
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const shape = (options as naver.maps.MarkerOptions).shape;
      if (shape) {
        instance.setShape(shape);
      }
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const title = (options as naver.maps.MarkerOptions).title;
      if (title) {
        instance.setTitle(title);
      }
    }, [instance, options]);

    useEffect(() => {
      if (!instance) return;
      const visible = (options as naver.maps.MarkerOptions).visible;
      instance.setVisible(visible ?? true);
    }, [instance, options]);

    const handlersRef = useRef<
      Partial<Record<EventKey, (...args: unknown[]) => void>>
    >({});

    useEffect(() => {
      const next: Partial<Record<EventKey, (...args: unknown[]) => void>> = {};
      (Object.keys(EVENT_TO_PROP) as EventKey[]).forEach((eventKey) => {
        const propKey = EVENT_TO_PROP[eventKey];
        const fn = (eventProps as MarkerEventProps)[propKey];
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

export default Marker;
