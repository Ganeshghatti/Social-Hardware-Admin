import React from "react";
import EclipseRobotimg from "../../../../../../public/client/assets/images/EclipseRobot.webp"
import Image from "next/image";
import TitleComponent from "@/components/client-side/ui/TitleComponent";


const HeadDis = () => {
  return (
    <section
      id="technology"
      className="relative wrapper py-20 flex md:items-start flex-col md:flex-row md:gap-10 w-full justify-between"
    >
         <TitleComponent title="Head Mounted Display" styles={"absolute h-fit w-[340px] text-sm"} />
      <div className="carousel-container relative md:static pt-10 md:pt-0 md:mt-10 z-10 ml-[4%] w-[80%] md:w-[40%] mb-10 md:mb-0 md:h-auto">
        <p className="text-oranges text-[40px]">Immersive Teleoperation</p>
        
        <p className="mt-10">Harness advanced "extended reality" control systems that allow remote operators to manage robotic systems with precision from a safe distance. These systems provide rich sensory feedback—visual, tactile, and auditory—ensuring intuitive operation. Infrared sensors seamlessly translate the operator's movements into precise robotic actions for enhanced efficiency</p>
      </div>
      <Image
        src={EclipseRobotimg}
        height={1000}
        width={1000}
        quality={100}
        alt="Eclipse Robot"
        className="block  md:mr-[18%] max-w-[416px] w-full self-start z-10 md:my-8"
      />
    </section>
  );
};

export default HeadDis;
