"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import clsx from "clsx";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full bg-yellow-300 text-black shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="size-6" />
    </button>
  );
};
