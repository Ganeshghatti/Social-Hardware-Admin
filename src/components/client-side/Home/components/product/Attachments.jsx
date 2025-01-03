import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Image from "next/image";
import SystemImg from "../../../../../../public/client/assets/images/product/attachments.png";

const systemData = [
  {
    label: "Metal Detector",
    value: "For locating hidden metallic objects.",
  },
  {
    label: "Metal Cutting Disc",
    value: "For precise cutting of various materials.",
  },
  {
    label: "Precision Gripper",
    value: "For secure handling of delicate items.",
  },
  {
    label: "Explosive Ordnance Disruptor",
    value: "For safely neutralizing threats.",
  },
];

const Attachments = () => {
  return (
    <section id="attachments" className="relative flex py-20 px-[4%] flex-col md:flex-row">
      <TitleComponent title="Attachments" styles={"absolute h-fit"} />
      <div className="flex justify-center items-center w-full md:w-[45%]">
        <Image
          src={SystemImg}
          height={500}
          width={500}
          alt="Robot Attachment"
          className="w-full z-10"
        />
      </div>
      <div className="flex flex-col gap-8 mt-10 md:mt-32 pl-[4%] w-full md:w-[55%]">
        <p className="text-[16px] md:text-[20px]">
          Eclipse is equipped with a variety of hot-swappable tools, allowing
          operators to swiftly adapt to diverse operational requirements.
          Standard multi-tool options include:
        </p>
        {systemData.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-6 text-[16px] md:text-[20px]"
          >
            <span className="w-1.5 h-1.5 aspect-auto rounded-full bg-[#4E4E4E]"></span>
            <div>
              <span className="text-oranges">{item.label}: </span>
              <span className="">{item.value}</span>
            </div>
          </div>
        ))}
        <p className="text-[16px] md:text-[20px]">
          Combined with advanced extended reality (XR) and gesture-based
          controls, Eclipse minimizes human exposure to danger by enabling
          precise teleoperation during critical tasks.
        </p>
      </div>
    </section>
  );
};

export default Attachments;
