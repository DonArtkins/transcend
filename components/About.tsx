"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedTitle } from "./AnimatedTitle";
import { useEffect } from "react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // See Hero.tsx: ignore the resize mobile browsers fire when the address bar
  // shows/hides, so the pinned image lands flush to the top of the screen
  // instead of leaving a gap. No effect on desktop.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const About = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-clip",
          start: "center center",
          // Total scroll distance the section stays pinned. The first part
          // expands the image, the rest is a "hold" so you can admire it.
          end: "+=1600 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      // Phase 1: small framed image grows to fill the entire screen.
      clipAnimation.to(".about-image-mask", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "power1.inOut",
        duration: 1,
      });

      // Phase 2: gently fade the immersive caption in once it's full screen.
      clipAnimation.fromTo(
        ".about-immersive-caption",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          duration: 0.25,
        },
        ">-0.1",
      );

      // Phase 3: empty hold so further scrolling keeps the full-screen image
      // pinned, letting the viewer take it in before moving to the next section.
      clipAnimation.to({}, { duration: 0.9 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen bg-blue-50 pt-20">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px] !text-black">
          Welcome to Vortex
        </p>

        <AnimatedTitle
          title="The Univ<b>e</b>rse of <br /> Experien<b>c</b>es Begins Here"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext mt-20 text-center font-general text-xl text-black">
          <p>The Nexus Layer unites every platform from countless dimensions</p>
          <p className="text-gray-500">
            A new era of interoperable digital living is upon us.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="about-clip">
        <div className="about-image-mask mask-clip-path about-image">
          <Image
            src="https://res.cloudinary.com/dqyzd8vqh/image/upload/v1780586173/ABOUT_1_zfukdb.jpg"
            alt="A vast cosmic expanse of stars and galaxies"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Subtle vignette for depth without hiding the image */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

          <div className="about-immersive-caption absolute inset-x-0 bottom-16 px-6 text-center opacity-0">
            <p className="font-zentry text-4xl uppercase text-white md:text-6xl">
              Step Into the Nexus
            </p>
            <p className="mx-auto mt-3 max-w-xl font-circular text-sm text-white/70 md:text-base">
              Every world, every dimension, woven into a single boundless layer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
