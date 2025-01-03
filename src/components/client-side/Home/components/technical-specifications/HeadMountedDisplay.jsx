import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";

const systemData = [
  {
    label: "Display",
    value: "LCD screen providing clear visuals for accurate task assessment.",
  },
  {
    label: "Refresh Rate",
    value: "120Hz for smooth movements and quick operator response.",
  },
  {
    label: "Field of View",
    value: "110° for wide situational awareness.",
  },
  {
    label: "Tracking",
    value:
      "Inside-out tracking for accurate positioning without external sensors.",
  },
  {
    label: "Real-time Analysis",
    value:
      "Seamless integration of real-time metrics, alerts, and environmental data.",
  },
];

const Head = () => {
  return (
    <section id="system" className="relative flex px-[4%] py-12">
      <TitleComponent title="Head Mounted Display" styles={"absolute h-fit"} />
      <div className="flex flex-col gap-8 mt-10 md:mt-32">
        {systemData.map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-2 text-[16px] md:text-[20px]">
            <span className="w-1 h-1 aspect-auto rounded-full bg-[#4E4E4E]"></span>
            <div>
              <span className="text-oranges">{item.label}: </span>{" "}
              <span className="">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Head;
