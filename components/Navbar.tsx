"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "./Button";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

export const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [indicatorHeights, setIndicatorHeights] = useState([4, 4, 4, 4]);

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
            <span className="special-font text-3xl tracking-widest text-primary font-bold ml-4">
              TRNS
            </span>

            <Button
              id="product-button"
              title="Products"
              rightIcon={
                <span className="ml-2 w-2 h-2 rounded-full bg-black/60 inline-block" />
              }
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 !px-4 !py-2 !text-xs"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
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
