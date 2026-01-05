export type OverlayAnchorType =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface CustomOverlayOptions {
  element: HTMLElement;
  position: naver.maps.LatLng;
  zIndex: number;
  anchor?: OverlayAnchorType;
}

const anchorStyleTransformMap: Record<OverlayAnchorType, string> = {
  "center-center": "translate(-50%, -50%)",
  "center-left": "translate(-100%, -50%)",
  "center-right": "translate(0, -50%)",
  "top-center": "translate(-50%, 0)",
  "top-left": "translate(-100%, 0)",
  "top-right": "translate(0, 0)",
  "bottom-center": "translate(-50%, -100%)",
  "bottom-left": "translate(-100%, -100%)",
  "bottom-right": "translate(0, -100%)",
};

const createCustomOverlayClass = () => {
  return class CustomOverlay extends naver.maps.OverlayView {
    _element: HTMLElement;

    _position: naver.maps.LatLng;

    zIndex: number;

    anchor: OverlayAnchorType;

    constructor({
      element,
      position,
      zIndex,
      anchor = "center-center",
    }: CustomOverlayOptions) {
      super();
      this._element = element;
      this._position = position;
      this.zIndex = zIndex;
      this.anchor = anchor;
    }

    getPosition() {
      return this._position;
    }

    setPosition(position: naver.maps.LatLng) {
      this._position = position;
      this.draw();
    }

    setZIndex(zIndex: number) {
      this.zIndex = zIndex;
    }

    onAdd() {
      const layer = this.getPanes().overlayImage;
      layer.append(this._element);
    }

    draw(): void {
      if (!this.getMap()) {
        return;
      }
      const projection = this.getProjection();
      const position = this.getPosition();
      const pixelPosition = projection.fromCoordToOffset(position);
      this._element.style.position = "absolute";
      this._element.style.zIndex = this.zIndex.toString();
      this._element.style.left = `${pixelPosition.x}px`;
      this._element.style.top = `${pixelPosition.y}px`;
      this._element.style.transform = anchorStyleTransformMap[this.anchor];
    }

    onRemove(): void {
      this._element.remove();
    }
  };
};

export default createCustomOverlayClass;
