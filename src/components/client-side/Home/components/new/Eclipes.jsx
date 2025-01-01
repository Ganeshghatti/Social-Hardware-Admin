import React from "react";
import EclipseRobotimg from "../../../../../../public/client/assets/images/EclipseRobot.webp"
import Image from "next/image";

const Eclipes = () => {
  return (
    <section
      id="technology"
      className="relative py-8 flex md:items-start flex-col md:flex-row md:gap-10 w-full justify-between"
    >

      <div className="carousel-container relative md:static pt-10 md:pt-0 md:mt-10 z-10 ml-[4%] w-[80%] md:w-[40%] mb-10 md:mb-0 md:h-auto">
        <p className="text-oranges text-[50px]">Introducing Eclipse</p>
        <p className="text-[50px]">Multi-Utility Robots</p>
        <p className="mt-10 text-xl">Eclipse are state-of-the-art modular robotic platforms designed to enhance safety and efficiency in high-risk environments and emergency situations, empowering operators to perform remote tasks with exceptional precision and versatility.</p>
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

export default Eclipes;
