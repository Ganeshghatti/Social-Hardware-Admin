import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";

const systemData = [
  {
    label: "Display",
    value:
      "LCD screen providing clear visuals for accurate task assessment.",
  },
  {
    label: "Refresh Rate",
    value:
      "120Hz for smooth movements and quick operator response.",
  },
  {
    label: "Field of View",
    value:
      "110° for wide situational awareness.",
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
    <section id="system" className="relative flex py-20 px-2 wrapper">
      <TitleComponent title="Head Mounted Display" styles={"absolute h-fit"} />
      <div className="w-full z-10 mt-40 px-20">
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
      </div>
    </section>
  );
};

export default Head;
