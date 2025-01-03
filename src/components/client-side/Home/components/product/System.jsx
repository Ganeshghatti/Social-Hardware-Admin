import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Image from "next/image";
import SystemImg from "../../../../../../public/client/assets/images/product/system.png";

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
    <section id="system" className="relative flex py-12 px-[4%] flex-col md:flex-row">
      <TitleComponent title="System" styles={"absolute h-fit"} />
      <div className="flex flex-col gap-8 mt-10 md:mt-32 w-full md:w-[55%]">
        {systemData.map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-6 text-[16px] md:text-[20px]">
            <span className="w-1.5 h-1.5 aspect-auto rounded-full bg-[#4E4E4E]"></span>
            <div>
              <span className="text-oranges">{item.label}: </span>
              <span className="">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center w-full md:w-[45%]">
        <Image
          src={SystemImg}
          height={500}
          width={500}
          alt="Robot"
          className="w-3/4 z-10"
        />
      </div>
    </section>
  );
};

export default System;
