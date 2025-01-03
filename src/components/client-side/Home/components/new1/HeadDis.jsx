import React from "react";
import EclipseRobotimg from "../../../../../../public/client/assets/images/EclipseRobot.webp";
import Image from "next/image";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Robot from "../../../../../../public/client/assets/images/new/robots.png";
import Case from "../../../../../../public/client/assets/images/new/case.png";
import Mic from "../../../../../../public/client/assets/images/new/mic.png";

const HeadDis = () => {
  return (
    <section
      id="technology"
      className="relative wrapper py-20 flex md:items-start flex-col md:flex-col md:gap-10 w-full justify-between"
    >
      <TitleComponent
        title="Head Mounted Display"
        styles={"absolute h-fit w-[340px] text-sm"}
      />
      <div className="max-w-[1000px] w-full mx-auto flex justify-between mt-20">
        <p>Eclipse Multi-Utility Robot</p>
        <p>Mesh Network Node</p>
        <p>Mesh Network Node</p>
      </div>
      <div className="w-full flex justify-between items-center relative z-10 mx-auto">
        <Image
          src={Robot}
          height={500}
          width={500}
          alt="Robot"
          loading="lazy"
          className="w-full scale-x-[-1] max-w-[458px] h-full z-10"
        />
        <div className="border-oranges border-dashed gap-1 absolute top-[66%] left-1/2 transform -translate-x-1/2 -translate-y-[66%] !-z-10 h-1 max-w-[1000px] w-full  border-b-2" />

        <Image
          src={Mic}
          height={500}
          width={500}
          alt="Mic"
          loading="lazy"
          className="w-full max-w-[201px] h-full mr-28 z-10"
        />

  
        <Image
          src={Case}
          height={500}
          width={500}
          alt="Case"
          loading="lazy"
          className="w-full max-w-[279px] h-full z-10"
        />
      </div>
      <div className="max-w-[800px] -mt-8 w-full mx-auto flex justify-between">
        <p><span className="text-oranges">300m range</span> between wireless devices</p>
        <p><span className="text-oranges">1km range</span> between tethered devices</p>
      </div>
    </section>
  );
};

export default HeadDis;
