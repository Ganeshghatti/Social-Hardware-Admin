import React from "react";
import EclipseRobotimg from "../../../../../../public/client/assets/images/EclipseRobot.webp"
import Image from "next/image";

const EclipseControl = () => {
  return (
    <section
      id="technology"
      className="relative wrapper py-20 flex md:items-start flex-col md:flex-row md:gap-10 w-full justify-between"
    >

      <div className="carousel-container relative md:static pt-10 md:pt-0 md:mt-10 z-10 ml-[4%] w-[80%] md:w-[40%] mb-10 md:mb-0 md:h-auto">
        <p className="text-oranges text-[50px]">Eclipse Robot</p>
        <p className="text-[50px]">Control System</p>
        <p className="mt-10">The Eclipse Master Station is a portable, ergonomically designed control unit optimised for intuitive, real-time operation. Equipped with mesh networking capabilities, it enables reliable, secure communication across dynamic or large-scale environments, ensuring uninterrupted control even in complex or high-risk scenarios.</p>
      </div>
      <Image
        src={EclipseRobotimg}
        height={1000}
        width={1000}
        quality={100}
        alt="Eclipse Robot"
        className="block  md:mr-[18%] max-w-[416px] w-full self-start z-10 md:my-8"
      />
    

      <div className="line-v-2" />
    </section>
  );
};

export default EclipseControl;
