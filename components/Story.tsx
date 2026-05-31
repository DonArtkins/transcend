"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";
import { AnimatedTitle } from "./AnimatedTitle";
import { Button } from "./Button";

export const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50 py-20 px-5">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          The Multiversal IP World
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container h-[50vh] md:h-[70vh] w-[80vw] md:w-[60vw] mx-auto mt-[-5vh] md:mt-[-10vh]">
            <div className="story-img-mask relative w-full h-full overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-105"
                 style={{ clipPath: "polygon(4% 0, 83% 21%, 100% 73%, 0 100%)" }}>
              <img
                ref={frameRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseLeave}
                onMouseEnter={handleMouseLeave}
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                alt="entrance"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        
        <div className="-mt-20 md:-mt-8 flex w-full justify-center md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start text-center md:text-left gap-5">
            <p className="w-full max-w-sm text-sm text-blue-50 opacity-80 md:text-base font-general">
              Where realms converge, lies Vortex and the boundless pillar. Discover its
              secrets and shape your fate amidst infinite opportunities.
            </p>
            <Button
              id="realm-btn"
              title="Discover Prologue"
              containerClass="bg-white text-black font-bold"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
