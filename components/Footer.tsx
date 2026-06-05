"use client";

import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";

const socialLinks = [
  { href: "#", icon: <FaDiscord />, label: "Discord" },
  { href: "#", icon: <FaTwitter />, label: "Twitter" },
  { href: "#", icon: <FaYoutube />, label: "YouTube" },
  { href: "#", icon: <FaMedium />, label: "Medium" },
];

const linkColumns = [
  {
    title: "Explore",
    links: [
      { label: "Nexus", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Vault", href: "#features" },
      { label: "Prologue", href: "#story" },
    ],
  },
  {
    title: "Realms",
    links: [
      { label: "Lumina", href: "#features" },
      { label: "Aether", href: "#features" },
      { label: "Synapse", href: "#features" },
      { label: "Orion", href: "#features" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Whitepaper", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="relative w-screen overflow-hidden bg-black text-blue-50">
      {/* Ambient accent glow that echoes the cosmic hero / bento sections */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-80 w-[80vw] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <div className="relative z-10 container mx-auto px-5 pt-20 md:px-10">
        {/* Top: brand + tagline + back to top */}
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="special-font hero-heading uppercase leading-[0.85] text-blue-50">
              Tr<b>a</b>nsc<b>e</b>nd
            </h2>
            <p className="mt-6 max-w-md font-circular text-sm leading-relaxed text-blue-50/60">
              Step into the Nexus. A boundless metagame layer where Web2 and
              Web3 converge into one interconnected universe of play.
            </p>
          </div>

          <a
            href="#hero"
            className="border-hsla group flex items-center gap-3 rounded-full bg-white/5 px-6 py-3 backdrop-blur-sm transition-colors duration-500 hover:bg-accent"
          >
            <span className="font-general text-xs font-semibold uppercase tracking-wider text-blue-50 transition-colors duration-500 group-hover:text-black">
              Back to top
            </span>
            <TiLocationArrow className="-rotate-90 text-lg text-accent transition-colors duration-500 group-hover:text-black" />
          </a>
        </div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-general text-xs uppercase tracking-[0.2em] text-accent">
                {column.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-circular text-sm text-blue-50/60 transition-colors duration-300 hover:text-blue-50"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h3 className="font-general text-xs uppercase tracking-[0.2em] text-accent">
              Follow
            </h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-hsla flex size-10 items-center justify-center rounded-full bg-white/5 text-base text-blue-50/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-black"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 md:flex-row">
          <p className="font-general text-xs uppercase tracking-wider text-blue-50/50">
            &copy; Transcend 2026. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#privacy-policy"
              className="font-general text-xs uppercase tracking-wider text-blue-50/50 transition-colors duration-300 hover:text-accent"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="font-general text-xs uppercase tracking-wider text-blue-50/50 transition-colors duration-300 hover:text-accent"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Oversized brand watermark bleeding off the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 -mb-6 select-none text-center md:-mb-10"
      >
        <span className="special-font block bg-gradient-to-b from-white/[0.06] to-transparent bg-clip-text text-[22vw] font-black uppercase leading-none text-transparent">
          Trns
        </span>
      </div>
    </footer>
  );
};
