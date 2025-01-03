import React from "react";
import EclipseRobotimg from "../../../../../../public/client/assets/images/product/EclipseRobotControl.png";
import Image from "next/image";

const EclipseControl = () => {
  return (
    <section
      id="eclipse-control"
      className="flex w-full flex-col md:flex-row-reverse relative pt-24 py-8 md:py-0 items-center md:justify-center gap-6 md:gap-0 mt-[18vh] md:h-[75vh] h-auto"
    >
      <div className="w-full text-center md:text-left md:w-[50%] content flex flex-col gap-3 md:gap-6 z-10 pl-[4%]">
        <h1 className="title">
          <span className="text-oranges">Eclipse Robot</span> <br />
          Control System
        </h1>
        <p className="desc w-full md:w-3/4">
          The Eclipse Master Station is a portable, ergonomically designed
          control unit optimised for intuitive, real-time operation. Equipped
          with mesh networking capabilities, it enables reliable, secure
          communication across dynamic or large-scale environments, ensuring
          uninterrupted control even in complex or high-risk scenarios.
        </p>
      </div>
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
      <div className="line-v-2" />
    </section>
  );
};

export default EclipseControl;
