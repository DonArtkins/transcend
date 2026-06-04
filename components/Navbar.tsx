"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "./Button";
import gsap from "gsap";

// Ordered to match the on-page scroll order so the active indicator moves
// smoothly across the bar instead of jumping around. Each label maps to a
// section id: Nexus -> Hero, About -> About, Vault -> Features,
// Prologue -> Story, Contact -> Contact.
const navItems = ["Nexus", "About", "Vault", "Prologue", "Contact"];

// Nav labels don't 1:1 match section element ids, so we map each label to the
// id of the DOM section it should highlight when scrolled into view.
const navSectionIds: Record<string, string> = {
  Nexus: "hero",
  About: "about",
  Vault: "features",
  Prologue: "story",
  Contact: "contact",
};

export const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [indicatorHeights, setIndicatorHeights] = useState([4, 4, 4, 4]);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove("floating-nav");
      } else if (window.scrollY > lastScrollY) {
        setIsNavVisible(false);
        navContainerRef.current?.classList.add("floating-nav");
      } else if (window.scrollY < lastScrollY) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add("floating-nav");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Build the ordered list of [navLabel, sectionElement] pairs once.
    const entries = navItems
      .map(
        (item) => [item, document.getElementById(navSectionIds[item])] as const,
      )
      .filter(
        (pair): pair is readonly [string, HTMLElement] => pair[1] !== null,
      );

    if (entries.length === 0) return;

    let frame = 0;

    // Highlight whichever section currently sits under the viewport's
    // vertical center. This is resilient to pinned sections (About) and
    // variable section heights, unlike a fixed-margin IntersectionObserver.
    const updateActiveSection = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      let bestId = "";
      let bestDistance = Infinity;

      for (const [, section] of entries) {
        const rect = section.getBoundingClientRect();
        const coversCenter =
          rect.top <= viewportCenter && rect.bottom >= viewportCenter;
        const distance = coversCenter
          ? 0
          : Math.min(
              Math.abs(rect.top - viewportCenter),
              Math.abs(rect.bottom - viewportCenter),
            );

        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = section.id;
        }
      }

      setActiveSection(bestId);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    const nextState = !isAudioPlaying;
    setIsAudioPlaying(nextState);
    setIsIndicatorActive(nextState);
    if (nextState) {
      setIndicatorHeights([
        Math.random() * 12 + 4,
        Math.random() * 12 + 4,
        Math.random() * 12 + 4,
        Math.random() * 12 + 4,
      ]);
    } else {
      setIndicatorHeights([4, 4, 4, 4]);
    }
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4 mix-blend-difference text-white">
          <div className="flex items-center gap-7">
            <span className="special-font text-3xl tracking-widest font-bold ml-4">
              <span className="text-accent">TR</span>
              <span className="text-primary">NS.</span>
            </span>

            <Button
              id="product-button"
              title="Products"
              rightIcon={
                <span className="ml-2 w-2 h-2 rounded-full bg-black/60 inline-block" />
              }
              containerClass="bg-accent md:flex hidden items-center justify-center gap-1 !px-4 !py-2 !text-xs"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${navSectionIds[item]}`}
                  className={clsx(
                    "nav-hover-btn",
                    activeSection === navSectionIds[item] && "is-active",
                  )}
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5 cursor-pointer"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar, index) => (
                <div
                  key={bar}
                  className={clsx(
                    "indicator-line h-1 w-1 rounded-full bg-white transition-all duration-200 ease-in-out",
                    isIndicatorActive ? "active" : "",
                  )}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                    height: `${indicatorHeights[index]}px`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};
