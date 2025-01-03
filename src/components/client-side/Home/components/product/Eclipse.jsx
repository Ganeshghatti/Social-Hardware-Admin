import React from "react";
import EclipseRobotimg from "../../../../../../public/client/assets/images/EclipseRobot.webp";
import Image from "next/image";

const Eclipse = () => {
  return (
    <section
      id="product-eclipse"
      className="flex w-full flex-col md:flex-row-reverse relative pt-24 py-8 md:py-0 items-center md:justify-center gap-6 md:gap-0 mt-[18vh] md:h-[75vh] h-auto"
    >
      <div className="w-[95%] md:w-[50%] z-10 flex items-center justify-center">
        <Image
          src={EclipseRobotimg}
          height={1000}
          width={1000}
          quality={100}
          alt="Eclipse Robot"
          className="w-[70%] md:w-[70%] h-auto object-cover"
        />
      </div>
      <div className="w-full text-center md:text-left md:w-[50%] px-4 content flex flex-col gap-3 md:gap-6 z-10 pl-[4%]">
        <h1 className="text-white title">
          Introducing Eclipse <br />
          <span className="text-oranges">Multi-Utility Robots</span>
        </h1>
        <p className="desc w-full md:w-3/4">
          Eclipse are state-of-the-art modular robotic platforms designed to
          enhance safety and efficiency in high-risk environments and emergency
          situations, empowering operators to perform remote tasks with
          exceptional precision and versatility.
        </p>
      </div>
      <div className="line-v-2" />
    </section>
  );
};

export default Eclipse;
