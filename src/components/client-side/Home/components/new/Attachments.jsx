import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Image from "next/image";
import SystemImg from "../../../../../../public/client/assets/images/new/attachments.png";

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
    <section id="attachments" className="relative flex">
      <TitleComponent title="Attachments" styles={"absolute h-fit"} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 z-10 mt-40 px-20">
        <div className="">
          <Image
            src={SystemImg}
            height={500}
            width={500}
            alt="Robot"
            loading="lazy"
            className="w-full  scale-x-[-1] h-full z-10"
          />
        </div>
        <div className="flex flex-col gap-8">
          <p>
            Eclipse is equipped with a variety of hot-swappable tools, allowing
            operators to swiftly adapt to diverse operational requirements.
            Standard multi-tool options include:
          </p>
          {systemData.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-2 ">
              <span className="w-1 h-1 aspect-auto rounded-full bg-[#4E4E4E]"></span>
              <div>
                <span className="text-oranges">{item.label}: </span>
                <span className="">{item.value}</span>
              </div>
            </div>
          ))}
          <p>
            Combined with advanced extended reality (XR) and gesture-based
            controls, Eclipse minimizes human exposure to danger by enabling
            precise teleoperation during critical tasks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Attachments;
