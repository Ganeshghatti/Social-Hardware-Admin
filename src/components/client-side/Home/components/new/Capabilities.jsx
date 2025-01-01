import React from "react";
import Image from "next/image";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Cab1 from "../../../../../../public/client/assets/images/new/cab1.png";
import Cab2 from "../../../../../../public/client/assets/images/new/cab2.png";

const Capabilities = () => {
  return (
    <section id="capabilities" className="relative flex py-8 px-2">
      <TitleComponent title="Capabilities" styles={"absolute h-fit"} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 z-10 mt-40 px-20">
        <div className="flex flex-col gap-28">
          <div className="w-full border border-white grid grid-cols-3 overflow-hidden">
            <div className="p-4 border-r border-white max-w-[80px] text-center w-full">
              01
            </div>
            <div className="p-4 col-span-2">TERRAIN CLIMBING</div>
          </div>
          <div className="flex justify-center items-center relative">
            <Image
              src={Cab1}
              alt="Cab1"
              width={1000}
              height={1000}
              className="max-w-[501px] w-full"
            />
            <div className="absolute top-6 -left-5 p-4 text-white text-xl">
              <span className="text-oranges">30° incline</span> on uneven
              terrain
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-28">
          <div className="w-full border border-white grid grid-cols-3 overflow-hidden">
            <div className="p-4 border-r border-white max-w-[80px] text-center w-full">
              02
            </div>
            <div className="p-4 col-span-2">STOW DIMENSIONS</div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-fit h-fit relative">
              <Image
                src={Cab2}
                alt="Cab1"
                width={1000}
                height={1000}
                className="max-w-[318px] w-full"
              />
              <div className="absolute -bottom-4 -left-10">
                <div className="relative h-[100px] aspect-square w-[100px] ">
                  <div className="absolute top-[14px] left-[16px] bg-oranges w-8 h-[2px] -z-10"></div>
                  <div className="absolute top-0 left-0 h-full rotate-45 w-[2px] bg-oranges z-10"></div>
                  <div className="absolute bottom-14 -left-16 z-10">0.84cm</div>
                  <div className="absolute bottom-[13px] -left-12 bg-oranges w-8 h-[2px] -z-10"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-10">
                    <div className="relative h-[300px] w-1 flex items-center gap-4">
                        <div className="flex flex-col justify-center items-center h-full w-full">
                        <div className="w-8 h-[2px] bg-oranges"/>
                        <div className="w-[2px] h-full bg-oranges"/>
                        <div className="w-8 h-[2px] bg-oranges"/>
                        </div>
                        <div>0.93cm</div>
                    </div>
              </div>
              <div className="absolute -top-16 right-10">
                    <div className="relative w-[300px] h-1 flex flex-col items-center gap-2">
                    <div>0.93cm</div>
                        <div className="flex flex-row justify-between items-center  w-full">
                        <div className="h-8 w-[2px] bg-oranges"/>
                        <div className="h-[2px] w-full bg-oranges"/>
                        <div className="h-8 w-[2px] bg-oranges"/>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
