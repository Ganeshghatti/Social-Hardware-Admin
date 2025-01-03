import React from "react";
import heroImg from "../../../../../../public/client/assets/images/heroImage.webp";
import Image from "next/image";

const Teleoperation = () => {
  return (
    <section
      id="technology"
      className="relative flex px-[4%] flex-col gap-4 md:gap-0 md:flex-row-reverse">
      <div className="w-[96%] md:w-[50%] md:pl-[4%] z-1 mt-10 md:mt-32 gap-6 flex flex-col">
        <h2 className="standard-title">Immersive Teleoperation</h2>

        <p className="standard-description">
          Harness advanced &quot;extended reality&quot; control systems that allow remote
          operators to manage robotic systems with precision from a safe
          distance. These systems provide rich sensory feedback—visual, tactile,
          and auditory—ensuring intuitive operation. Infrared sensors seamlessly
          translate the operator's movements into precise robotic actions for
          enhanced efficiency
        </p>
      </div>
      <div className="w-[96%] md:w-[50%] z-10 flex items-center justify-center">
        <Image
          src={heroImg}
          height={1000}
          width={1000}
          quality={100}
          alt="Eclipse Robot"
          className="w-11/12 md:w-auto md:max-h-[450px] object-cover"
        />
      </div>
      <div className="line-v-2" />
    </section>
  );
};

export default Teleoperation;
