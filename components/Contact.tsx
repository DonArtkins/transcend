"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = {
  // left cluster
  contact1:
    "https://res.cloudinary.com/dqyzd8vqh/image/upload/v1780661833/CONTACT_3_mpnpkq.jpg",
  contact2:
    "https://res.cloudinary.com/dqyzd8vqh/image/upload/v1780661319/CONTACT_2_k5tbm0.jpg",
  // right "swordman" image that bridges sections on mobile
  swordman:
    "https://res.cloudinary.com/dqyzd8vqh/image/upload/v1780661833/CONTACT_5_io0vjr.jpg",
};

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-card",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // opacity-only on the floating images so their positions (and the
      // mobile "bridge" overflow) stay perfectly intact.
      tl.from(".contact-shard", {
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }).from(
        [".contact-eyebrow", ".contact-title", ".contact-cta"],
        {
          opacity: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="mt-20 min-h-96 w-screen bg-blue-50 px-5 md:px-20 py-24"
    >
      {/* sm:overflow-hidden -> on mobile the swordman overflows the top of the
          card and bridges into the black section above, exactly like Zentry. */}
      <div className="contact-card relative isolate rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* Left cluster: two stacked clipped images (hidden on mobile).
            z-10 lifts them above the text so mix-blend-difference composites
            against the white title behind them (same idea as the Story title). */}
        <div className="absolute -left-20 top-0 z-10 hidden h-full w-72 overflow-hidden sm:block lg:left-10 lg:w-96">
          <div className="contact-shard contact-clip-path-1 relative h-80 w-full mix-blend-difference">
            <Image
              src={IMAGES.contact1}
              fill
              sizes="384px"
              className="object-cover"
              alt="Realm gateway"
            />
          </div>
          <div className="contact-shard contact-clip-path-2 relative top-60 h-80 w-full mix-blend-difference lg:-top-20">
            <Image
              src={IMAGES.contact2}
              fill
              sizes="384px"
              className="object-cover"
              alt="Nexus fragment"
            />
          </div>
        </div>

        {/* Right "swordman" image: bridges sections on mobile.
            Uses the same hexagonal Zentry clip-path on every breakpoint, with a
            subtle edge fade so only the top/bottom and corners (top-left, bottom)
            melt softly into the black background. */}
        <div className="absolute -top-64 left-20 z-10 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <div
            className="contact-shard sword-man-clip-path relative h-96 w-full mix-blend-difference md:scale-125"
            style={{
              // Each layer carves a soft fade only in its own region; combined
              // with `intersect` so the sides stay solid. The top-left corner
              // and the bottom corner fade more strongly, top/bottom edges a
              // touch, keeping the effect subtle elsewhere.
              maskImage: [
                "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, #000 14%)",
                "linear-gradient(to top, rgba(0,0,0,0.25) 0%, #000 22%)",
                "radial-gradient(ellipse 75% 75% at 0% 0%, transparent 0%, rgba(0,0,0,0.4) 30%, #000 68%)",
                "radial-gradient(ellipse 75% 60% at 45% 100%, transparent 0%, rgba(0,0,0,0.4) 30%, #000 68%)",
              ].join(", "),
              WebkitMaskImage: [
                "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, #000 14%)",
                "linear-gradient(to top, rgba(0,0,0,0.25) 0%, #000 22%)",
                "radial-gradient(ellipse 75% 75% at 0% 0%, transparent 0%, rgba(0,0,0,0.4) 30%, #000 68%)",
                "radial-gradient(ellipse 75% 60% at 45% 100%, transparent 0%, rgba(0,0,0,0.4) 30%, #000 68%)",
              ].join(", "),
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            <Image
              src={IMAGES.swordman}
              fill
              sizes="320px"
              className="object-cover"
              alt="Vortex explorer"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <p className="contact-eyebrow font-general text-[10px] uppercase">
            Join the Nexus
          </p>

          <h1 className="contact-title special-font mt-10 w-full text-5xl font-black uppercase leading-[0.9] md:text-[96px]">
            Let&#39;s b<b>u</b>ild the <br /> new e<b>r</b>a of <br /> exper
            <b>ie</b>nces t<b>o</b>gether
          </h1>

          <div className="contact-cta mt-10">
            <Button
              title="Contact Us"
              containerClass="bg-accent text-black px-10 font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
