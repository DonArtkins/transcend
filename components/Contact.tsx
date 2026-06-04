import Image from "next/image";
import { Button } from "./Button";

export const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-5 md:px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden h-full">
        {/* We use unspash images to mimic the floating images in the corner */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <div className="contact-clip-path-1 relative w-full h-full opacity-60">
            <Image
              src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop"
              width={192}
              height={600}
              className="absolute top-0 right-0 w-48 h-full object-cover transform -rotate-6"
              alt="img1"
            />
          </div>
        </div>

        <div className="absolute -top-40 right-10 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <div className="contact-clip-path-2 relative w-full h-full opacity-60">
            <Image
              src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1000&auto=format&fit=crop"
              width={256}
              height={600}
              className="absolute top-0 right-0 w-64 h-full object-cover transform rotate-12"
              alt="img2"
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join the Nexus
          </p>

          <h1 className="special-font text-5xl md:text-[6rem] leading-[0.9] font-black uppercase tracking-wider">
            Let&#39;s b<b>ui</b>ld the <br /> new e<b>r</b>a of <br /> exper
            <b>ie</b>nces t<b>o</b>gether.
          </h1>

          <div className="mt-14">
            <Button
              title="Contact Us"
              containerClass="bg-accent text-black px-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
