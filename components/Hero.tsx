"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import { Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const totalVideos = 9;
  const nextVdRef = useRef<HTMLVideoElement>(null);

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" });

      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          if (nextVdRef.current) {
            nextVdRef.current.play();
          }
        },
      });

      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, [hasClicked, currentIndex]);

  useEffect(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  const getVideoSrc = (index: number) => {
    const urls = [
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780571919/Hero_1_vohtra.mp4",
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780571915/Hero_2_pkk5ng.mp4",
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569249/DNA_1_lduutc.mp4",
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569388/World_1_niu7i3.mp4",
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569261/Synapse_2_jrhctw.mp4",
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569388/Orion_2_bxssff.mp4",
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569379/DNA_2_t166uz.mp4",
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569354/Orion_1_rh2nuj.mp4",
      "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569315/Orion_3_nyqzb3.mp4",
    ];
    return urls[(index - 1) % urls.length];
  };

  return (
    <div className="relative h-[100dvh] w-screen overflow-x-hidden bg-blue-50">
      <div
        id="video-frame"
        className="relative z-10 h-[100dvh] w-screen overflow-hidden rounded-lg bg-primary-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
              />
            </div>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute left-1/2 top-1/2 z-20 size-64 -translate-x-1/2 -translate-y-1/2 object-cover object-center invisible"
          />

          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex,
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-primary-75">
          C<b>E</b>ND
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-primary-100">
              TR<b>A</b>NS
            </h1>

            <p className="mb-5 max-w-64 font-general text-primary-100 text-lg uppercase">
              Enter the Nexus Realm. <br />
              Pioneer the Digital Frontier.
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<Play className="mr-2 icon-sm" size={16} />}
              containerClass="bg-accent flex items-center justify-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        C<b>E</b>ND
      </h1>
    </div>
  );
};
