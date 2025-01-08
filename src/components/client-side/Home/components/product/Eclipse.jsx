import React from "react";
import EclipseRobotimg from "../../../../../../public/client/assets/images/EclipseRobot.webp";
import Image from "next/image";
import Link from "next/link";

const Eclipse = () => {
  return (
    <section
      id="product-eclipse"
      className="flex w-full flex-col md:flex-row-reverse relative pt-24 py-8 md:py-0 items-center md:justify-center gap-6 md:gap-0 mt-[12vh] md:h-[75vh] h-auto"
    >
      <div className="w-[95%] md:w-[50%] z-10 flex items-center justify-center">
        <Image
          src={EclipseRobotimg}
          height={1000}
          width={1000}
          quality={100}
          alt="Eclipse Robot"
          className="w-[70%] md:w-[70%] h-auto object-cover"
        />
      </div>
      <div className="w-full text-center md:text-left md:w-[50%] px-4 content flex flex-col gap-3 md:gap-6 z-10 pl-[4%]">
        <h1 className="text-white title">
          Introducing Eclipse <br />
          <span className="text-oranges">Multi-Utility Robots</span>
        </h1>
        <p className="desc w-full md:w-3/4">
          Eclipse are state-of-the-art modular robotic platforms designed to
          enhance safety and efficiency in high-risk environments and emergency
          situations, empowering operators to perform remote tasks with
          exceptional precision and versatility.
        </p>
        <Link
          href="/technical-specifications"
          className="flex justify-center w-fit"
        >
          <button className="relative transition-colors duration-300 w-fit self-center">
            <svg
              width="314"
              height="45"
              viewBox="0 0 314 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M309.392 0H4C1.79086 0 0 1.79086 0 4V41C0 43.2091 1.79086 45 4 45H283.93C285.247 45 286.479 44.3521 287.226 43.2676L312.687 6.26756C314.513 3.6137 312.613 0 309.392 0Z"
                fill="#FC8500"
              />
            </svg>

            <p
              className="flex items-center justify-start text-lg font-spaceGrotesk font-semibold text-black absolute px-4 inset-0"
              style={{ transform: "translate(-1px, -1px)" }}
            >
              Technical Specifications
            </p>
          </button>
        </Link>
      </div>

      <div className="line-v-2" />
    </section>
  );
};

export default Eclipse;
