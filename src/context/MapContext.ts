import { createContext } from "react";

export interface MapContextType {
  map: naver.maps.Map | null;
  setMap: (map: naver.maps.Map | null) => void;
}

export const MapContext = createContext<MapContextType>({
  map: null,
  setMap: () => {},
});

