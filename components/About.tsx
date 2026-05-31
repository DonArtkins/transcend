"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedTitle } from "./AnimatedTitle";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About = () => {
  useEffect(() => {
    gsap.fromTo(
      ".about-image-wrapper",
      {
        clipPath: "polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)",
        borderRadius: "20px",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0px",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#about",
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      }
    );
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen bg-blue-50 py-20">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Vortex
        </p>

        <AnimatedTitle
          title="The Univ<b>e</b>rse of <br /> Experien<b>c</b>es Begins Here"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext mt-10 text-center font-general text-xl text-black">
          <p>The Nexus Layer unites every platform from countless dimensions</p>
          <p className="text-gray-500">
            A new era of interoperable digital living is upon us.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen">
        <div className="about-image-wrapper mask-clip-path relative h-full w-full overflow-hidden">
          {/* We use an abstract video or image here too */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <video
             src="https://videos.pexels.com/video-files/5532777/5532777-uhd_2160_4096_25fps.mp4"
             autoPlay
             loop
             muted
             className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
