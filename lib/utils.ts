import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Inject Cloudinary delivery transformations into a video URL.
 *
 * `q_auto` -> automatic quality, `f_auto` -> best format for the browser
 * (webm/vp9 for Chrome, mp4/h264 elsewhere), `w_<width>` -> cap the delivered
 * resolution so we never ship a 4k file into a 256px box.
 *
 * Non-Cloudinary URLs (no `/upload/` segment) are returned untouched.
 */
export function cldVideo(url: string, width = 1280): string {
  if (!url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/q_auto,f_auto,w_${width}/`);
}

/**
 * Derive a crisp poster (first frame) for a Cloudinary video.
 *
 * `so_0` grabs the frame at second 0 and we deliver it as an optimized image.
 * This gives the <video> a sharp first paint instead of a blurry/half-buffered
 * frame while the stream is still loading.
 */
export function cldPoster(url: string, width = 1280): string {
  if (!url.includes("/upload/")) return url;
  return url
    .replace("/upload/", `/upload/so_0,q_auto,f_auto,w_${width}/`)
    .replace(/\.(mp4|webm|mov|m4v)$/i, ".jpg");
}
