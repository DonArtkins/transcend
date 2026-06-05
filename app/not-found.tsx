import Link from "next/link";
import { TiLocationArrow } from "react-icons/ti";

export default function NotFound() {
  return (
    <main className="relative flex h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden bg-black text-blue-50">
      {/* Ambient cosmic glow echoing the hero / footer sections */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[150px]" />
        <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        {/* Glitching 404 with RGB-split layers */}
        <div className="relative select-none">
          <h1 className="special-font text-[28vw] font-black uppercase leading-none text-primary-100 md:text-[16rem]">
            4<b>0</b>4
          </h1>
          <h1
            aria-hidden="true"
            className="special-font absolute inset-0 text-[28vw] font-black uppercase leading-none text-accent [animation:glitch-shift_3s_steps(2,end)_infinite] md:text-[16rem]"
          >
            4<b>0</b>4
          </h1>
          <h1
            aria-hidden="true"
            className="special-font absolute inset-0 text-[28vw] font-black uppercase leading-none text-violet-400 [animation:glitch-shift-alt_3s_steps(2,end)_infinite] md:text-[16rem]"
          >
            4<b>0</b>4
          </h1>
        </div>

        <p className="mt-2 font-general text-xs uppercase tracking-[0.35em] text-accent">
          Lost in the Nexus
        </p>

        <p className="mt-6 max-w-md font-circular text-sm leading-relaxed text-blue-50/60">
          This realm doesn&apos;t exist on the digital frontier. The signal you
          were chasing has drifted beyond the known coordinates.
        </p>

        <Link
          href="/"
          className="border-hsla group mt-10 flex items-center gap-3 rounded-full bg-white/5 px-7 py-3 backdrop-blur-sm transition-colors duration-500 hover:bg-accent"
        >
          <TiLocationArrow className="text-lg text-accent transition-colors duration-500 group-hover:text-black" />
          <span className="font-general text-xs font-semibold uppercase tracking-wider text-blue-50 transition-colors duration-500 group-hover:text-black">
            Return to Nexus
          </span>
        </Link>
      </div>

      {/* Oversized brand watermark bleeding off the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 w-full select-none text-center"
      >
        <span className="special-font block bg-gradient-to-b from-white/[0.05] to-transparent bg-clip-text text-[22vw] font-black uppercase leading-none text-transparent">
          Trns
        </span>
      </div>
    </main>
  );
}
