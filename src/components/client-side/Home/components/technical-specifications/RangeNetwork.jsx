import React from "react";
import Image from "next/image";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Range from "../../../../../../public/client/assets/images/product/Range.png";

const RangeNetwork = () => {
  return (
    <section id="range-network" className="relative flex flex-col">
      <TitleComponent
        title="Range & Network"
        styles={"absolute h-fit w-[340px]"}
      />
      <div className="flex flex-col gap-6 mt-8 md:mt-32 w-full px-[4%]">
        <div className="w-4/5 mx-auto flex justify-between mt-10 md:mt-20 standard-description">
          <p>Eclipse Multi-Utility Robot</p>
          <p>Mesh Network Node</p>
          <p>Eclipse Master Station</p>
        </div>
        <div className="w-full flex justify-between items-center relative z-10 mx-auto">
          <Image
            src={Range}
            height={500}
            width={500}
            alt="Robot"
            loading="lazy"
            className="w-full h-full z-10"
          />
        </div>
        <div className="max-w-[800px] standard-description -mt-8 w-full mx-auto flex justify-between">
          <p>
            <span className="text-oranges">300m range</span> between wireless
            devices
          </p>
          <p>
            <span className="text-oranges">1km range</span> between tethered
            devices
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center gap-4 z-10 mt-4 border-t border-[#353539] py-6">
        <div className="standard-description w-full md:w-[50%] px-[5%] items-center ">
          State-of-the-art{" "}
          <span className="text-oranges">mesh networking technology</span>
          enables seamless and reliable data transfer between devices, even in
          challenging environments without a direct line of sight.
        </div>
        <div className="standard-description w-full md:w-[50%] px-[5%] items-center ">
          These robust, self-healing networks provide seamless data transfer
          between the robot and its operator, automatically adapting to
          disruptions to ensure smoooth operations.
        </div>
      </div>
      <div className="line-v-2" />
    </section>
  );
};

export default RangeNetwork;
