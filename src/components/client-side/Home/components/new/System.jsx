import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Image from "next/image";
import SystemImg from "../../../../../../public/client/assets/images/new/system.png";

const systemData = [
  {
    label: "Modular Manipulators",
    value:
      "Dual 6-DOF robotic arms with a proprietary quick-swap tool and sensor system for maximum flexibility.",
  },
  {
    label: "Dual Bionic Hands",
    value:
      "5-finger humanoid hands with 10 N per finger grip strength for precise, life-like performance.",
  },
  {
    label: "Camera System",
    value:
      "Multi-cameras with real-time depth perception, object recognition, and threat detection for enhanced awareness.",
  },
  {
    label: "Power System",
    value:
      "iFePO4 battery provides 2 hours of operation with a 4-hour recharge time for reliable performance.",
  },
];

const System = () => {
  return (
    <section id="system" className="relative flex py-8 px-2">
      <TitleComponent title="System" styles={"absolute h-fit"} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 z-10 mt-40 px-20">
        <div className="flex flex-col gap-8">
          {systemData.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-2 ">
              <span className="w-1 h-1 aspect-auto rounded-full bg-[#4E4E4E]"></span>
              <div>
                <span className="text-oranges">{item.label}: </span>{" "}
                <span className="">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <div className="relative w-fit h-fit">
          <div className="!-z-10 absolute !-top-20 !right-[140px] flex flex-col justify-center items-center">
              <p className="text-oranges font-medium"> Interactive GUI </p>
              <div className="relative">
                <div className="absolute left-10 top-1 bg-oranges w-[2px] rounded-sm h-[200px] -rotate-[24deg] mt-2"></div>
              </div>
            </div>
            <div className="absolute -z-10 top-0 -left-16 flex flex-col justify-center items-center">
              <p className="text-oranges font-medium">7 Inch QLED Display</p>
              <div className="relative">
                <div className="absolute left-16 -top-4 bg-oranges w-[2px] rounded-sm h-[200px] -rotate-45"></div>
              </div>
            </div>
           
            <div className="absolute -z-10 top-0 -right-[40px] flex flex-col justify-center items-center">
              <p className="text-oranges font-medium"> Interface Buttons </p>
              <div className="relative">
                <div className="absolute -left-6 top-2 bg-oranges w-[2px] rounded-sm h-[200px] rotate-12 mt-2"></div>
              </div>
            </div>
            <Image
              src={SystemImg}
              height={500}
              width={500}
              alt="Robot"
              loading="lazy"
              className="max-w-[369px] object-cover w-full h-[313px] z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default System;
