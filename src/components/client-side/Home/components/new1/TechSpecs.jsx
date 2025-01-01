import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";

const systemData = [
  {
    label: "Security",
    value:
      "AES-256 encryption of all sensor data and robot control commands.",
  },
  {
    label: "Data Streaming",
    value:
      "Up to 1 GB/s data rate, 23 ms latency, 300m wireless, or 1 km with fiber optics tether.",
  },
  {
    label: "Data Capture",
    value:
      "Instantaneous data acquisition designed to capture and analyze inputs from sensors in real-time.",
  },
  {
    label: "Network",
    value:
      "Advanced mesh networking technology to ensure reliable, scalable, and self-healing connectivity.",
  },
  {
    label: "Control Systems",
    value:
      "XR integration with gesture-based commands and a 7-inch handheld copilot controller.",
  },
  {
    label: "Accessibility",
    value:
      "User-friendly interface that provides seamless integration into exiting protocols.",
  },
];

const TechSpecs = () => {
  return (
    <section id="system" className="relative flex py-20 px-2 wrapper">
      <TitleComponent title="Tech Specs" styles={"absolute h-fit"} />
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

export default TechSpecs;
