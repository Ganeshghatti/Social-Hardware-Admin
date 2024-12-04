"use client";
import React, { useState, useEffect } from "react";
import TitleComponent from "../../ui/TitleComponent";
import EclipseRobotimg from "../../../../../public/client/assets/images/EclipseRobot.webp"
import Image from "next/image";

export default function Technology() {
  const carouselData = [
    "Endlessly customizable and scalable, Eclipse Remote Systems can be tailored to meet the unique demands of your industry. From bespoke tool attachments to network modifications, we ensure seamless integration into your operations; delivering secure, reliable, and consistent results—every time.",
    "Our telerobotics systems are designed for ease of use, even by non-technical users. With advanced sensory capabilities that surpass human limits, they leverage IoT and AI-enhanced data collection to deliver unparalleled operational insights, empowering smarter, more informed decisions for improved efficiency.",
    "Our fully customizable systems adapt to your industry's specific needs, with multiple units deployable for seamless coordination in large-scale operations. Designed with top-tier safety and privacy compliance, you can trust our solutions to deliver secure, high-performance results every time",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    setIsFirstSlide(currentSlide === 0);
    setIsLastSlide(currentSlide === carouselData.length - 1);
  }, [currentSlide, carouselData.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === carouselData.length - 1 ? prevSlide : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? prevSlide : prevSlide - 1
    );
  };

  return (
    <section
      id="technology"
      className="relative py-8 flex md:items-start flex-col md:flex-row md:gap-10 w-full justify-between"
    >
      <TitleComponent title="Technology" styles={"absolute"} />
      <div className="carousel-container relative md:static pt-10 md:pt-0 md:mt-32 z-10 ml-[4%] w-[80%] md:w-[40%] mb-10 md:mb-0 md:h-auto">
        <div className="carousel">
          {carouselData.map((item, index) => (
            <p
              key={index}
              className={`standard-description transition-opacity duration-750 ${
                index === currentSlide ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              {item}
            </p>
          ))}
        </div>
        {/* <div className="arrow-block absolute self-start bottom-[10%] flex gap-4  w-fit py-8">
          <button
            onClick={prevSlide}
            className="hover:opacity-75 transition-opacity"
            disabled={isFirstSlide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="32"
              viewBox="0 0 38 32"
              fill="none"
            >
              <path
                d="M16.8036 30.9261C16.9495 30.7804 17.0652 30.6073 17.1442 30.4168C17.2232 30.2263 17.2638 30.0221 17.2638 29.8159C17.2638 29.6097 17.2232 29.4055 17.1442 29.215C17.0652 29.0245 16.9495 28.8514 16.8036 28.7057L5.35813 17.2622L36.0931 17.2622C36.5093 17.2622 36.9084 17.0969 37.2027 16.8026C37.497 16.5083 37.6623 16.1092 37.6623 15.693C37.6623 15.2768 37.497 14.8777 37.2027 14.5834C36.9084 14.2891 36.5093 14.1238 36.0931 14.1238L5.35813 14.1238L16.8036 2.6803C17.098 2.38585 17.2634 1.9865 17.2634 1.57008C17.2634 1.15367 17.098 0.754314 16.8036 0.459866C16.5091 0.165418 16.1098 -7.01078e-07 15.6934 -6.85978e-07C15.2769 -6.70879e-07 14.8776 0.165418 14.5831 0.459866L0.460229 14.5828C0.31433 14.7285 0.198586 14.9016 0.119617 15.0921C0.0406474 15.2826 6.76948e-07 15.4868 6.85962e-07 15.693C6.94976e-07 15.8992 0.0406475 16.1034 0.119617 16.2939C0.198586 16.4844 0.31433 16.6575 0.460229 16.8032L14.5831 30.9261C14.7289 31.072 14.9019 31.1878 15.0924 31.2667C15.2829 31.3457 15.4871 31.3863 15.6934 31.3863C15.8996 31.3863 16.1038 31.3457 16.2943 31.2667C16.4848 31.1878 16.6578 31.072 16.8036 30.9261Z"
                fill={isFirstSlide ? "#FC8500" : "#FC8500"}
                style={{ opacity: isFirstSlide ? 0.5 : 1 }}
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="hover:opacity-75 transition-opacity"
            disabled={isLastSlide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="32"
              viewBox="0 0 39 32"
              fill="none"
            >
              <path
                d="M21.5246 30.9261C21.3787 30.7804 21.2629 30.6073 21.1839 30.4168C21.105 30.2263 21.0643 30.0221 21.0643 29.8159C21.0643 29.6097 21.105 29.4055 21.1839 29.215C21.2629 29.0245 21.3787 28.8514 21.5246 28.7057L32.97 17.2622L2.23502 17.2622C1.81884 17.2622 1.4197 17.0969 1.12542 16.8026C0.831136 16.5083 0.66581 16.1092 0.66581 15.693C0.66581 15.2768 0.831136 14.8777 1.12542 14.5834C1.4197 14.2891 1.81884 14.1238 2.23502 14.1238L32.97 14.1238L21.5246 2.6803C21.2301 2.38585 21.0647 1.9865 21.0647 1.57008C21.0647 1.15367 21.2301 0.754314 21.5246 0.459866C21.819 0.165418 22.2184 -7.01078e-07 22.6348 -6.85978e-07C23.0512 -6.70879e-07 23.4505 0.165418 23.745 0.459866L37.8679 14.5828C38.0138 14.7285 38.1295 14.9016 38.2084 15.0921C38.2874 15.2826 38.328 15.4868 38.328 15.693C38.328 15.8992 38.2874 16.1034 38.2084 16.2939C38.1295 16.4844 38.0138 16.6575 37.8679 16.8032L23.745 30.9261C23.5991 31.072 23.426 31.1878 23.2355 31.2667C23.045 31.3457 22.8408 31.3863 22.6346 31.3863C22.4284 31.3863 22.2242 31.3457 22.0337 31.2667C21.8432 31.1878 21.6702 31.072 21.5246 30.9261Z"
                fill={isLastSlide ? "#FC8500" : "#FC8500"}
                style={{ opacity: isLastSlide ? 0.5 : 1 }}
              />
            </svg>
          </button>
        </div> */}
      </div>
      <Image
        src={EclipseRobotimg}
        height={1000}
        width={1000}
        quality={100}
        alt="Eclipse Robot"
        className="block w-[84%] md:mr-[18%] md:w-[35%] self-start z-10 md:my-8"
      />
      {/* <div className="threeD-container block md:absolute left-[39%] w-11/12 md:w-[45%] self-start h-[50vh] top-0 z-10">
        <Canvas style={{ background: "transparent" }}>
          <EclipseRobot
            scale={[4, 4, 4]}
            position={
              window.innerWidth <= 768 ? [0.25, -1.75, 0] : [0, -1.75, 0]
            }
            rotation={[0, -0.4, 0]}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={false}
          />
          <ambientLight intensity={3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Canvas>
      </div> */}
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
}
