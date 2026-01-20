import React, { useCallback, useContext, useMemo, useState } from "react";
import { createContext } from "react";

export interface MountedMapContextType {
  maps: { [id: string]: naver.maps.Map };
  onMount: (map: naver.maps.Map, id?: string) => void;
  onUnmount: (id?: string, options?: { keep?: boolean }) => void;
}

export const MountedMapContext = createContext<MountedMapContextType>({
  maps: {},
  onMount: () => {},
  onUnmount: () => {},
});

interface MapProviderProps {
  children: React.ReactNode;
}

const MapProvider = ({ children }: MapProviderProps) => {
  const [maps, setMaps] = useState<{ [id: string]: naver.maps.Map }>({});

  const onMount = useCallback((map: naver.maps.Map, id: string = "default") => {
    setMaps((prev) => ({ ...prev, [id]: map }));
  }, []);

  const onUnmount = useCallback(
    (id: string = "default", options?: { keep?: boolean }) => {
      if (options?.keep) return;
      setMaps((prev) => {
        const newMaps = { ...prev };
        delete newMaps[id];
        return newMaps;
      });
    },
    []
  );

  const value = useMemo(
    () => ({ maps, onMount, onUnmount }),
    [maps, onMount, onUnmount]
  );
  return (
    <MountedMapContext.Provider value={value}>
      {children}
    </MountedMapContext.Provider>
  );
};

export type MapCollection = {
  [id: string]: naver.maps.Map | undefined;
  current?: naver.maps.Map;
};

export const useMap = () => {
  const { maps } = useContext(MountedMapContext);
  const currentMap = useContext(MapContext);
  const mapsWithCurrent: MapCollection = useMemo(() => {
    if (!currentMap) return maps;
    return { ...maps, current: currentMap };
  }, [maps, currentMap]);
  return mapsWithCurrent;
};

export default MapProvider;

export const MapContext = createContext<naver.maps.Map | undefined>(undefined);
