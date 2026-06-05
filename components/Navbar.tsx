"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "./Button";
import gsap from "gsap";
import { TiLocationArrow } from "react-icons/ti";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

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

const socialLinks = [
  { href: "#", icon: <FaDiscord />, label: "Discord" },
  { href: "#", icon: <FaTwitter />, label: "Twitter" },
  { href: "#", icon: <FaYoutube />, label: "YouTube" },
  { href: "#", icon: <FaMedium />, label: "Medium" },
];

export const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Open / close animation for the mobile menu. Fades the glass panel in and
  // staggers the items up so it feels like the rest of the site's motion.
  useEffect(() => {
    const panel = mobileMenuRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.set(panel, { visibility: "visible" });
        gsap.fromTo(
          panel,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
        );
        gsap.fromTo(
          ".mobile-nav-item",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power3.out",
            delay: 0.12,
          },
        );
      } else {
        gsap.to(panel, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => gsap.set(panel, { visibility: "hidden" }),
        });
      }
    }, panel);

    // Lock background scroll while the overlay is open.
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close the overlay automatically when the viewport grows to desktop.
  // Done via the resize subscription callback (not synchronously in the
  // effect body) so we don't trigger cascading renders.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4 mix-blend-difference text-white">
            <div className="flex items-center gap-7">
              <Link
                href="/"
                aria-label="Transcend home"
                className="special-font text-3xl tracking-widest font-bold ml-4 transition-opacity duration-300 hover:opacity-80"
              >
                <span className="text-accent">TR</span>
                <span className="text-primary">NS.</span>
              </Link>

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
                aria-label="Toggle ambient audio"
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

              {/* Morphing hamburger - mobile only */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                className="ml-6 flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
              >
                <span
                  className={clsx(
                    "block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out",
                    isMobileMenuOpen && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={clsx(
                    "block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out",
                    isMobileMenuOpen && "opacity-0",
                  )}
                />
                <span
                  className={clsx(
                    "block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out",
                    isMobileMenuOpen && "-translate-y-2 -rotate-45",
                  )}
                />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile menu overlay - kept outside the mix-blend-difference nav so its
          colors read correctly against the dark glass panel. */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-black/95 px-8 pb-12 pt-28 backdrop-blur-xl md:hidden"
        style={{ visibility: "hidden" }}
      >
        {/* Ambient glow echoing the hero / footer cosmic backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[80vw] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/10 blur-[110px]" />
        </div>

        <nav className="relative z-10 flex flex-col gap-5">
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${navSectionIds[item]}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-item group flex items-baseline gap-4"
            >
              <span className="font-general text-xs tracking-widest text-accent/70">
                0{index + 1}
              </span>
              <span
                className={clsx(
                  "special-font text-5xl uppercase leading-none transition-colors duration-300",
                  activeSection === navSectionIds[item]
                    ? "text-accent"
                    : "text-blue-50 group-hover:text-accent",
                )}
              >
                {item}
              </span>
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex flex-col gap-8">
          <div className="mobile-nav-item">
            <Button
              title="Products"
              rightIcon={<TiLocationArrow className="ml-2" />}
              containerClass="bg-accent flex w-full items-center justify-center gap-1"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>

          <div className="mobile-nav-item flex items-center justify-center gap-3 border-t border-white/10 pt-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="border-hsla flex size-11 items-center justify-center rounded-full bg-white/5 text-base text-blue-50/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-black"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
