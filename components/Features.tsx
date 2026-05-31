import { ReactNode } from "react";
import clsx from "clsx";

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description: string;
  isComingSoon?: boolean;
}

const BentoCard = ({ src, title, description, isComingSoon }: BentoCardProps) => {
  return (
    <div className="relative size-full">
      {src.endsWith('.mp4') ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          className="absolute left-0 top-0 size-full object-cover object-center"
          alt="bento bg"
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font flex flex-col text-5xl md:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base font-general">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <section className="bg-black pb-52 text-white">
      <div className="container mx-auto px-6 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular text-lg text-blue-50 uppercase tracking-widest">
            Into the Nexus Layer
          </p>
          <p className="max-w-md font-circular text-lg text-blue-50 opacity-50 mt-4">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of digital tools converge into an interconnected
            overlay experience that transforms the way you interact on your world.
          </p>
        </div>

        <div className="border-[rgba(255,255,255,0.1)] h-96 md:h-[65dvh] w-full overflow-hidden rounded-md border max-w-7xl mx-auto">
          <BentoCard
            src="https://videos.pexels.com/video-files/3129595/3129595-hd_1920_1080_30fps.mp4"
            title={
              <>
                Lumi<b>n</b>a
              </>
            }
            description="A cross-platform app turning your activities across Web2 and Web3 into a rewarding adventure."
          />
        </div>

        <div className="grid h-[135dvh] w-full grid-cols-2 grid-rows-3 gap-7 mt-7 max-w-7xl mx-auto">
          <div className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 rounded-md overflow-hidden border border-white/10">
            <BentoCard
              src="https://videos.pexels.com/video-files/1851190/1851190-hd_1920_1080_25fps.mp4"
              title={
                <>
                  Aet<b>h</b>er
                </>
              }
              description="A futuristic environment primed for exploration and limitless collaboration."
            />
          </div>

          <div className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0 rounded-md overflow-hidden border border-white/10">
            <BentoCard
              src="https://videos.pexels.com/video-files/1191544/1191544-hd_1920_1080_24fps.mp4"
              title={
                <>
                  Syn<b>a</b>pse
                </>
              }
              description="A gamified social hub adding a new dimension of play."
            />
          </div>

          <div className="bento-tilt_1 me-14 md:col-span-1 md:me-0 rounded-md overflow-hidden border border-white/10">
            <BentoCard
              src="https://videos.pexels.com/video-files/5532777/5532777-uhd_2160_4096_25fps.mp4"
              title={
                <>
                  Or<b>i</b>on
                </>
              }
              description="A cross-world AI Agent making gameplay and workflow efficient."
            />
          </div>

          <div className="bento-tilt_2 bg-violet-300 rounded-md overflow-hidden">
             <div className="flex size-full flex-col justify-between p-5 text-blue-50">
               <h1 className="bento-title special-font max-w-64 text-black text-5xl md:text-7xl">
                 More<br/>Coming<br/>Soon.
               </h1>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
