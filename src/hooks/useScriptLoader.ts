import { useEffect, useMemo, useState } from "react";
import { loadNaverMaps, NaverMapsSubmodule } from "../utils/scriptLoader";

export interface UseScriptLoaderOptions {
  ncpKeyId: string;
  submodules: NaverMapsSubmodule[];
  disableGL?: boolean;
}

const useScriptLoader = ({
  ncpKeyId,
  submodules,
  disableGL,
}: UseScriptLoaderOptions) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const key = useMemo(() => {
    return JSON.stringify({ ncpKeyId, submodules });
  }, [ncpKeyId, submodules]);

  useEffect(() => {
    let cancelled = false;
    const { submodules, ncpKeyId } = JSON.parse(key);
    const useGL = !disableGL;

    const load = async () => {
      try {
        await loadNaverMaps({ ncpKeyId, submodules, useGL });
        if (!cancelled) setIsScriptLoaded(true);
      } catch (err) {
        if (!useGL) return;
        console.warn("Naver Maps GL load failed, retrying without GL", err);
        try {
          await loadNaverMaps({ ncpKeyId, submodules, useGL: false });
          if (!cancelled) setIsScriptLoaded(true);
        } catch (nonGlError) {
          if (!cancelled)
            console.error("Failed to load Naver Maps SDK", nonGlError);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [key, disableGL]);

  return { isScriptLoaded };
};

export default useScriptLoader;
