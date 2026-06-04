"use client";

import { forwardRef, useState, VideoHTMLAttributes } from "react";
import { cldPoster, cldVideo, cn } from "@/lib/utils";

interface OptimizedVideoProps extends Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "src" | "poster"
> {
  /** Raw Cloudinary (or any) video URL. Transformations are applied for you. */
  src: string;
  /** Delivered width cap passed to Cloudinary (defaults to 1280). */
  width?: number;
  /** Wrapper className (positioning lives here). */
  wrapperClassName?: string;
  /** Show the animated skeleton until the video can play. Defaults to true. */
  showSkeleton?: boolean;
}

/**
 * A drop-in <video> that:
 *  - rewrites the URL to use Cloudinary q_auto/f_auto/width transforms
 *  - shows a crisp poster (first frame) + skeleton while buffering
 *  - fades in smoothly once it can actually play (no blurry half-frames)
 *  - only loads metadata up front (preload="metadata") to keep things fast
 */
export const OptimizedVideo = forwardRef<HTMLVideoElement, OptimizedVideoProps>(
  (
    {
      src,
      width = 1280,
      className,
      wrapperClassName,
      showSkeleton = true,
      autoPlay,
      ...rest
    },
    ref,
  ) => {
    const [ready, setReady] = useState(false);

    return (
      <div
        className={cn("relative size-full overflow-hidden", wrapperClassName)}
      >
        {showSkeleton && !ready && (
          <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
        )}

        <video
          ref={ref}
          src={cldVideo(src, width)}
          poster={cldPoster(src, width)}
          autoPlay={autoPlay}
          preload="metadata"
          playsInline
          onCanPlay={() => setReady(true)}
          onLoadedData={() => setReady(true)}
          className={cn(
            "transition-opacity duration-500",
            ready ? "opacity-100" : "opacity-0",
            className,
          )}
          {...rest}
        />
      </div>
    );
  },
);

OptimizedVideo.displayName = "OptimizedVideo";
