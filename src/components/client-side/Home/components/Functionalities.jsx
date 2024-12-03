'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card1 from "../../../../../public/client/assets/images/functionalities/section-1-tech.gif";
import Card2 from "../../../../../public/client/assets/images/functionalities/section-2-tech.gif";
import Card3 from "../../../../../public/client/assets/images/functionalities/section-3-tech.gif";
import Card4 from "../../../../../public/client/assets/images/functionalities/section-4-tech.gif";
import Card5 from "../../../../../public/client/assets/images/functionalities/section-5-tech.gif";

const cardsData = [
  {
    text: "We build AR-controlled telerobots to enhance workplace safety and efficiency in high-risk environments. Eclipse reduces human risk with advanced sensors and delivers precise, actionable insights.",
    image: Card1,
  },
  {
    text: "Equipped with gesture-based sensory tech, Eclipse minimizes human risk by enabling precise teleoperation. The feedback system allows real-time interaction for accurate and safe operations in critical tasks.",
    image: Card2,
  },
  {
    text: "Eclipse Remote Systems use mesh networking for stable communication in hazardous areas. Each node relays data, ensuring reliable control and coverage over large or obstructed environments.",
    image: Card3,
  },
  {
    text: "Operators can use quick-change attachments tailored to mission needs, including biomechanical hands, precision grippers, disc cutters, and metal detectors for handling delicate or hazardous tasks.",
    image: Card4,
  },
  {
    text: "Eclipse Remote Systems adapt to diverse environments, from disaster zones to industrial sites. Their intuitive interface reduces training time, enabling quick deployment and seamless integration into existing workflows.",
    image: Card5,
  },
];

export default function Functionalities() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cardsData.length) % cardsData.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevIndex = (currentIndex - 1 + cardsData.length) % cardsData.length;
  const nextIndex = (currentIndex + 1) % cardsData.length;

  return (
    <section
      id="functionalities"
      className="relative flex flex-col gap-8 md:gap-16 py-4 md:py-8"
    >
      <div className="carousel z-10 px-0 w-full md:w-11/12 self-center flex items-center gap-4 md:gap-8 overflow-hidden">
        <div className="card card-prev flex-col gap-6 transition-all duration-750 opacity-25 hidden md:flex">
          <Image
            src={cardsData[prevIndex].image}
            alt={cardsData[prevIndex].text}
            sizes="100%"
            className="img w-full transition-opacity duration-750"
          />
          <p className="standard-title transition-opacity duration-750">
            {cardsData[prevIndex].text}
          </p>
        </div>
        <div className="card card-active flex flex-col gap-6 transition-all duration-750 opacity-100">
          <Image
            src={cardsData[currentIndex].image}
            alt={cardsData[currentIndex].text}
            sizes="100%"
            className="img w-full transition-opacity duration-750"
            loading="lazy" // Added lazy loading
          />
          <p className="standard-title transition-opacity duration-750">
            {cardsData[currentIndex].text}
          </p>
        </div>
        <div className="card card-next flex-col gap-6 transition-all duration-750 opacity-25 hidden md:flex">
          <Image
            src={cardsData[nextIndex].image}
            alt={cardsData[nextIndex].text}
            sizes="100%"
            className="img w-full transition-opacity duration-750"
          />
          <p className="standard-title transition-opacity duration-750">
            {cardsData[nextIndex].text}
          </p>
        </div>
      </div>
      <div className="arrow-block flex md:self-center gap-4 px-[4%] md:px-[16%] w-fit">
        <button
          onClick={prevSlide}
          className="hover:opacity-75 transition-opacity"
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
              fill="white"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="hover:opacity-75 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39"
            height="32"
            viewBox="0 0 39 32"
            fill="none"
          >
            <path
              d="M21.5246 30.9261C21.3787 30.7804 21.2629 30.6073 21.1839 30.4168C21.105 30.2263 21.0643 30.0221 21.0643 29.8159C21.0643 29.6097 21.105 29.4055 21.1839 29.215C21.2629 29.0245 21.3787 28.8514 21.5246 28.7057L32.97 17.2622L2.23502 17.2622C1.81884 17.2622 1.4197 17.0969 1.12542 16.8026C0.831136 16.5083 0.66581 16.1092 0.66581 15.693C0.66581 15.2768 0.831136 14.8777 1.12542 14.5834C1.4197 14.2891 1.81884 14.1238 2.23502 14.1238L32.97 14.1238L21.5246 2.6803C21.2301 2.38585 21.0647 1.9865 21.0647 1.57008C21.0647 1.15367 21.2301 0.754314 21.5246 0.459866C21.819 0.165418 22.2184 -7.01078e-07 22.6348 -6.85978e-07C23.0512 -6.70879e-07 23.4505 0.165418 23.745 0.459866L37.8679 14.5828C38.0138 14.7285 38.1295 14.9016 38.2085 15.0921C38.2875 15.2826 38.3281 15.4868 38.3281 15.693C38.3281 15.8992 38.2875 16.1034 38.2085 16.2939C38.1295 16.4844 38.0138 16.6575 37.8679 16.8032L23.745 30.9261C23.5993 31.072 23.4262 31.1878 23.2357 31.2667C23.0452 31.3457 22.841 31.3863 22.6348 31.3863C22.4286 31.3863 22.2244 31.3457 22.0339 31.2667C21.8434 31.1878 21.6703 31.072 21.5246 30.9261Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="line-v-1" />
      <div className="line-v-2" />
      <div className="line-v-3" />
    </section>
  );
}
