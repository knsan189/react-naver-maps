/* eslint-disable @typescript-eslint/no-explicit-any */
let loadPromise: Promise<typeof window.naver.maps> | null = null;

export type NaverMapsSubmodule =
  | "gl"
  | "traffic"
  | "transit"
  | "drawing"
  | "event"
  | "heatmap"
  | "marker";

export interface LoadNaverMapsOptions {
  ncpKeyId: string;
  submodules?: NaverMapsSubmodule[];
  scriptId?: string;
}

export function loadNaverMaps(opts: LoadNaverMapsOptions) {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Naver Maps SDK can only be loaded in browser.")
    );
  }

  if (window.naver?.maps) return Promise.resolve(window.naver.maps);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<typeof window.naver.maps>((resolve, reject) => {
    const scriptId = opts.scriptId ?? "naver-maps-sdk";
    const existing = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null;

    const subs = (opts.submodules ?? []).filter(Boolean);
    const hasGL = subs.includes("gl");
    const callbackName = hasGL
      ? `__naverMapsOnLoad__${scriptId.replace(/[^a-zA-Z0-9_]/g, "_")}`
      : null;

    const cleanupCallback = () => {
      if (callbackName && (window as any)[callbackName]) {
        try {
          delete (window as any)[callbackName];
        } catch {
          (window as any)[callbackName] = undefined;
        }
      }
    };

    const resolveIfReady = () => {
      if (!window.naver?.maps) {
        reject(
          new Error("Naver Maps loaded but window.naver.maps is missing.")
        );
        return;
      }
      resolve(window.naver.maps);
    };

    if (existing) {
      if (hasGL && callbackName) {
        (window as any)[callbackName] = () => {
          cleanupCallback();
          resolveIfReady();
        };
        if (window.naver?.maps) {
          cleanupCallback();
          resolve(window.naver.maps);
        }
        return;
      }

      existing.addEventListener("load", resolveIfReady, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Naver Maps SDK.")),
        {
          once: true,
        }
      );
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;

    const url = new URL("https://oapi.map.naver.com/openapi/v3/maps.js");
    url.searchParams.set("ncpKeyId", opts.ncpKeyId);

    if (subs.length) url.searchParams.set("submodules", subs.join(","));

    if (hasGL && callbackName) {
      (window as any)[callbackName] = () => {
        cleanupCallback();
        resolveIfReady();
      };
      url.searchParams.set("callback", callbackName);
    }

    script.src = url.toString();
    script.async = true;
    script.type = "text/javascript";

    script.onload = () => {
      if (hasGL) return;
      resolveIfReady();
    };

    script.onerror = () => {
      cleanupCallback();
      reject(new Error("Failed to load Naver Maps SDK."));
    };

    document.head.appendChild(script);
  }).catch((err) => {
    loadPromise = null;
    throw err;
  });

  return loadPromise;
}
