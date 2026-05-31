"use client";

import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "#", icon: <FaDiscord /> },
  { href: "#", icon: <FaTwitter /> },
  { href: "#", icon: <FaYoutube /> },
  { href: "#", icon: <FaMedium /> },
];

export const Footer = () => {
  return (
    <footer className="w-screen bg-[#5724ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-10">
        <p className="text-center text-sm font-light md:text-left font-general">
          &copy; Transcend 2026. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right font-general"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};
