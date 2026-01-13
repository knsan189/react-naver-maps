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
  (
    {
      position,
      zIndex,
      animation,
      clickable = false,
      cursor,
      draggable = false,
      icon,
      shape,
      title,
      visible = true,
      ...eventProps
    }: MarkerProps,
    ref: React.Ref<naver.maps.Marker | undefined>
  ) => {
    const { current: map } = useMap();
    const [instance, setInstance] = useState<naver.maps.Marker>();

    useEffect(() => {
      if (!map) return undefined;
      const newInstance = new naver.maps.Marker({
        position,
        zIndex,
        animation,
        clickable,
        cursor,
        draggable,
        icon,
        shape,
        title,
        visible,
      });
      setInstance(newInstance);
      newInstance.setMap(map);
      return () => {
        if (!map) return;
        newInstance.setMap(null);
      };
    }, [map]);

    useEffect(() => {
      if (!instance) return;
      instance.setPosition(position);
    }, [instance, position]);

    useEffect(() => {
      if (!instance) return;
      instance.setAnimation(animation ?? null);
    }, [instance, animation]);

    useEffect(() => {
      if (!instance) return;
      instance.setClickable(clickable);
    }, [instance, clickable]);

    useEffect(() => {
      if (zIndex === undefined || !instance) return;
      instance.setZIndex(zIndex);
    }, [zIndex, instance]);

    useEffect(() => {
      if (!instance) return;
      instance.setCursor(cursor ?? "");
    }, [instance, cursor]);

    useEffect(() => {
      if (!instance) return;
      instance.setDraggable(draggable);
    }, [instance, draggable]);

    useEffect(() => {
      if (!instance || !icon) return;
      instance.setIcon(icon);
    }, [instance, icon]);

    useEffect(() => {
      if (!instance || !shape) return;
      instance.setShape(shape);
    }, [instance, shape]);

    useEffect(() => {
      if (!instance || !title) return;
      instance.setTitle(title);
    }, [instance, title]);

    useEffect(() => {
      if (!instance) return;
      instance.setVisible(visible);
    }, [instance, visible]);

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
