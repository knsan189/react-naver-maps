import { useEffect, useMemo, useState } from "react";
import { loadNaverMaps, NaverMapsSubmodule } from "../utils/scriptLoader";

export interface UseScriptLoaderOptions {
  ncpKeyId: string;
  submodules: NaverMapsSubmodule[];
}

const useScriptLoader = ({ ncpKeyId, submodules }: UseScriptLoaderOptions) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const key = useMemo(() => {
    return JSON.stringify({ ncpKeyId, submodules });
  }, [ncpKeyId, submodules]);

  useEffect(() => {
    const { submodules, ncpKeyId } = JSON.parse(key);
    loadNaverMaps({
      ncpKeyId,
      submodules: submodules as NaverMapsSubmodule[],
    }).then(() => setIsScriptLoaded(true));
  }, [key]);

  return { isScriptLoaded };
};

export default useScriptLoader;
