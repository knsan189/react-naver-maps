import React, { useMemo, useState } from "react";
import { MapContext } from "../context/MapContext";

const NaverMapProvider = ({ children }: { children: React.ReactNode }) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  const value = useMemo(() => ({ map, setMap }), [map, setMap]);

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export default NaverMapProvider;

