import { useContext } from "react";
import { MapContext } from "../context/MapContext";

const useMap = () => useContext(MapContext);

export default useMap;

