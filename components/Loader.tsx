"use client";

import { useEffect, useState } from "react";

export const Loader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hide = () => setIsLoading(false);

    // If everything is already loaded (e.g. fast cache / client navigation),
    // hide almost immediately.
    if (document.readyState === "complete") {
      const t = setTimeout(hide, 400);
      return () => clearTimeout(t);
    }

    // Hide once all page resources (styles, images, fonts, etc.) are ready.
    const onLoad = () => setTimeout(hide, 400);
    window.addEventListener("load", onLoad);

    // Safety fallback so the loader can NEVER hang forever, even if a remote
    // asset (like an external video) stalls and never finishes buffering.
    const fallback = setTimeout(hide, 3500);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
    };
  }, []);

  // Prevent the page from scrolling while the loader is visible.
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="flex-center fixed inset-0 z-[9999] h-[100dvh] w-screen flex-col gap-8 overflow-hidden bg-black">
          {/* Ambient cosmic glow that mirrors the hero / footer sections */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
          </div>

          {/* Nexus portal: counter-rotating orbital rings + pulsing core */}
          <div className="nexus-loader relative z-10">
            <span className="nexus-loader__ring" />
            <span className="nexus-loader__ring" />
            <span className="nexus-loader__ring" />
            <span className="nexus-loader__core" />
          </div>

          {/* Brand + loading label */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <h2 className="special-font text-2xl font-black uppercase leading-none tracking-wider text-primary-100">
              Tr<b>a</b>nsc<b>e</b>nd
            </h2>
            <span className="nexus-loader-text font-general text-xs uppercase tracking-[0.35em]">
              Entering the Nexus...
            </span>
          </div>
        </div>
      )}

      {children}
    </>
  );
};
