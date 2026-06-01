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
        <div className="flex-center fixed inset-0 z-[9999] h-[100dvh] w-screen items-center justify-center overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
          <span className="ml-4 font-general text-black">
            Loading Transcendance...
          </span>
        </div>
      )}

      {children}
    </>
  );
};
