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

export interface OverlayOptions {
  element: HTMLElement;
  position: naver.maps.Coord | naver.maps.CoordLiteral;
  zIndex?: number;
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

export type CustomOverlayCtor = new (opts: OverlayOptions) => {
  getPosition(): naver.maps.Coord | naver.maps.CoordLiteral;
  setPosition(position: naver.maps.Coord | naver.maps.CoordLiteral): void;
  setZIndex(zIndex?: number): void;
  setAnchor(anchor?: OverlayAnchorType): void;
  setStyle(style?: Partial<CSSStyleDeclaration>): void;
  onAdd(): void;
  draw(): void;
  destroy(): void;
  setMap(map: naver.maps.Map): void;
};

const createCustomOverlayClass = (): CustomOverlayCtor => {
  return class CustomOverlay extends naver.maps.OverlayView {
    private _element: HTMLElement;

    _position: naver.maps.Coord | naver.maps.CoordLiteral;

    zIndex?: number;

    anchor?: OverlayAnchorType;

    _style?: Partial<CSSStyleDeclaration>;

    constructor({
      element,
      position,
      zIndex,
      anchor = "center-center",
    }: OverlayOptions) {
      super();
      this._element = element;
      this._position = position;
      this.zIndex = zIndex;
      this.anchor = anchor;
    }

    getPosition() {
      return this._position;
    }

    setPosition(position: naver.maps.Coord | naver.maps.CoordLiteral) {
      this._position = position;
      this.draw();
    }

    setZIndex(zIndex?: number) {
      this.zIndex = zIndex;
      this.draw();
    }

    setAnchor(anchor?: OverlayAnchorType) {
      this.anchor = anchor;
      this.draw();
    }

    setStyle(style?: Partial<CSSStyleDeclaration>) {
      this._style = style;
      this.draw();
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
      const pixelPosition = projection.fromCoordToOffset(
        new naver.maps.LatLng(this.getPosition())
      );
      this._element.style.position = "absolute";
      this._element.style.zIndex = this.zIndex?.toString() ?? "auto";
      this._element.style.left = `${pixelPosition.x}px`;
      this._element.style.top = `${pixelPosition.y}px`;
      this._element.style.transform =
        anchorStyleTransformMap[this.anchor ?? "bottom-center"];
      if (this._style) {
        Object.assign(this._element.style, this._style);
      }
    }

    destroy(): void {
      this._element.remove();
    }

    onRemove(): void {
      this.destroy();
    }
  };
};

export default createCustomOverlayClass;
