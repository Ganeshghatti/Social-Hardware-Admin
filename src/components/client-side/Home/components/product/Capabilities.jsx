import React from "react";
import Image from "next/image";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Capabilities1 from "../../../../../../public/client/assets/images/product/capabilities1.png";
import Capabilities2 from "../../../../../../public/client/assets/images/product/capabilities2.png";

const capabilitiesData = [
  {
    id: "01",
    title: "TERRAIN CLIMBING",
    image: Capabilities1,
    alt: "Terrain Climbing",
  },
  {
    id: "02",
    title: "STOW DIMENSIONS",
    image: Capabilities2,
    alt: "Stow Dimensions",
  },
  
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="relative py-12 px-[4%]">
      <TitleComponent title="Capabilities" styles={"absolute h-fit"} />
      <section className="max-w-lg w-full h-52">
    </section>
      <div className="w-full mt-10 md:mt-32 flex gap-6 overflow-hidden">
        {capabilitiesData.map(({ id, title, image, alt }) => (
          <div className="flex flex-col gap-12 w-full md:w-1/2 text-[16px] md:text-[20px]" key={id}>
            <div className="w-full border border-white grid grid-cols-3 overflow-hidden">
              <div className="p-2 md:p-6 border-r border-white max-w-[80px] text-center w-full">
                {id}
              </div>
              <div className="p-2 md:p-6">{title}</div>
            </div>
            <div className="flex justify-center items-center relative">
              <Image
                src={image}
                alt={alt}
                width={1000}
                height={1000}
                className="max-w-[500px] w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Capabilities;
