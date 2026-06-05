"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";
import { Play } from "lucide-react";
import { cldPoster, cldVideo } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VIDEO_URLS = [
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569388/Orion_2_bxssff.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780571915/Hero_2_pkk5ng.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569249/DNA_1_lduutc.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569388/World_1_niu7i3.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569261/Synapse_2_jrhctw.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569379/DNA_2_t166uz.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780571919/Hero_1_vohtra.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569354/Orion_1_rh2nuj.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780569315/Orion_3_nyqzb3.mp4",
  "https://res.cloudinary.com/dqyzd8vqh/video/upload/v1780585133/BENTO_4_rwiwxu.mp4",
];

const totalVideos = VIDEO_URLS.length;

const getVideoSrc = (index: number) =>
  cldVideo(VIDEO_URLS[(index - 1) % totalVideos]);

const getPosterSrc = (index: number) =>
  cldPoster(VIDEO_URLS[(index - 1) % totalVideos]);

/**
 * Play a video while gracefully swallowing the AbortError that the browser
 * throws when a pending play() is interrupted by a new load (rapid clicks).
 */
const safePlay = (video: HTMLVideoElement | null) => {
  if (!video) return;
  const playback = video.play();
  if (playback !== undefined) {
    playback.catch(() => {
      /* interrupted by a new load – safe to ignore */
    });
  }
};

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  // Locks out new clicks while a transition animation is in flight. This is
  // what stops rapid consecutive clicks from interrupting the play() request
  // and leaving the videos in a blurry / broken state.
  const isTransitioning = useRef(false);

  const nextVdRef = useRef<HTMLVideoElement>(null);

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    if (!hasClicked) return;

    const ctx = gsap.context(() => {
      gsap.set("#next-video", { visibility: "visible" });

      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => safePlay(nextVdRef.current),
        onComplete: () => {
          // Transition finished – accept the next click.
          isTransitioning.current = false;
        },
      });

      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
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

  return (
    <div
      id="hero"
      className="relative h-[100dvh] w-screen overflow-x-hidden bg-blue-50"
    >
      <div
        id="video-frame"
        className="relative z-10 h-[100dvh] w-screen overflow-hidden rounded-lg bg-primary-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg group">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                src={getVideoSrc(upcomingVideoIndex)}
                poster={getPosterSrc(upcomingVideoIndex)}
                loop
                muted
                playsInline
                preload="metadata"
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
              />
            </div>

            {/* Discovery beacon: teaches new visitors that the center is
                interactive. Fades out on hover (revealing the mini preview)
                and disappears for good after the first click. Purely
                decorative + pointer-events-none, so it never blocks the
                existing click/hover behavior. */}
            {!hasClicked && (
              <div className="pointer-events-none absolute inset-0 z-[60] transition-opacity duration-500 group-hover:opacity-0">
                {/* Sonar rings rippling outward — centered with inset-0 + auto
                    margins so the scale animation pulses around the shared
                    center (transform stays free for the keyframes). */}
                <span className="absolute inset-0 m-auto size-20 rounded-full border border-accent/60 [animation:hero-sonar_2.4s_ease-out_infinite]" />
                <span className="absolute inset-0 m-auto size-20 rounded-full border border-accent/60 [animation:hero-sonar_2.4s_ease-out_infinite] [animation-delay:1.2s]" />

                {/* Pulsing accent core with a play glyph — same shared center */}
                <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-accent text-black [animation:hero-beacon-pulse_2.4s_ease-in-out_infinite]">
                  <Play className="ml-0.5" size={20} fill="currentColor" />
                </span>

                {/* On-brand hint label — horizontally centered, just below core */}
                <span className="absolute inset-x-0 top-[calc(50%+2.25rem)] text-center font-general text-[10px] uppercase tracking-[0.2em] text-primary-100 [animation:hero-hint-bob_2.4s_ease-in-out_infinite]">
                  Hover &amp; Click
                </span>
              </div>
            )}
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            poster={getPosterSrc(currentIndex)}
            loop
            muted
            playsInline
            preload="metadata"
            id="next-video"
            className="absolute left-1/2 top-1/2 z-20 size-64 -translate-x-1/2 -translate-y-1/2 object-cover object-center invisible"
          />

          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex,
            )}
            poster={getPosterSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex,
            )}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
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
