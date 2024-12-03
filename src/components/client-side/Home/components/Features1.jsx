'use client'
import React from "react";
import TitleComponent from "../../ui/TitleComponent";
import { AugmentedRealityControl } from "../../ThreeD/AugmentedRealityControl";
import { ModularToolAttachments } from "../../ThreeD/ModularToolAttachments";
import { MeshNetworkCommunication } from "../../ThreeD/MeshNetworkCommunication";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Features1() {
  const cardData = [
    {
      index: "01",
      title: "Augmented Reality Control",
      description:
        "Operators use an AR interface for immersive, real-time control, enhancing situational awareness and precision.",
      params: ["5MS LATENCY", "REAL-TIME DATA OVERLAY"],
      model: {
        component: AugmentedRealityControl,
        scale: [5.5, 5.5, 5.5],
        position: [0.25, -1, 0],
        rotation: [0, 0, 0],
      },
    },
    {
      index: "02",
      title: "Modular Tool Attachments",
      description:
        "Eclipse's modular tool system allows quick adaptation to diverse industrial tasks, from handling hazardous materials to complex operations, offering versatile solutions.",
      params: [" DUAL 10-DOF ARMS", "NO REBOOT NEEDED"],
      model: {
        component: ModularToolAttachments,
        scale: [8, 8, 8],
        position: [0.25, -2.5, 0],
        rotation: [0, 0, 0],
      },
    },
    {
      index: "03",
      title: "Mesh Network Communication",
      description:
        "Advanced mesh networking technology allows operators to control the system without direct line of sight. This ensures reliable communication in confined or obstructed environments.",
      params: ["UP TO 1.5 KM RANGE", "ROBUST  DATA TRANSMISSION"],
      model: {
        component: MeshNetworkCommunication,
        scale: [3, 3, 3],
        position: [0.25, -2.25, 0],
        rotation: [0, 0, 0],
      },
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="features1" className="relative flex">
      <TitleComponent
        title="Features"
        styles={"absolute left-[4vw] h-fit top-[2vh]"}
      />
      <div className="cards-parent-container relative flex flex-col w-full mt-16 md:mt-32">
        {cardData.map((card, index) => (
          <div className="cards-container" key={index}>
            <div className="card w-[80%] ml-[4%] relative z-10 flex flex-col md:flex-row justify-end items-center pt-6 md:pt-0">
              <div className="card-left  w-full md:w-1/3 flex flex-col gap-4 md:absolute left-0">
                <p className="index w-fit">{card.index}</p>
                <p className="standard-title">{card.title}</p>
                <p className="standard-description">{card.description}</p>
              </div>
              <div className="card-right w-full pl-[15%] md:pl-0 md:w-[85%] flex flex-col md:flex-row items-end md:items-center relative justify-center mt-6 md:mt-0">
                <div className="params-container md:absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 flex flex-col h-full justify-start md:justify-center self-end w-1/2">
                  {card.params.map((param, index) => (
                    <p key={index} className="standard-description param">
                      {param}
                    </p>
                  ))}
                </div>
                {/* <img
                  src={card.image}
                  alt={card.title}
                  className="w-full md:w-1/2 z-10"
                  loading="lazy" // Added lazy loading
                /> */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-[50vh] z-50">
                  <Canvas style={{ background: "transparent" }}>
                    <card.model.component
                      scale={card.model.scale}
                      position={card.model.position}
                      rotation={card.model.rotation}
                    />
                    <OrbitControls enableZoom={false} enablePan={false} enableDamping={false}/>
                    <ambientLight intensity={5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                  </Canvas>
                </div>
                {index === cardData.length - 1 && (
                  <div
                    className="flex gap-4 right-0 standard-description get-a-trial block md:absolute justify-center md:justify-end bottom-0 w-1/2 cursor-pointer"
                    onClick={scrollToContact}
                  >
                    Book a Demo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <path
                        d="M17.1212 14.7816C16.9898 14.7816 16.8596 14.7558 16.7382 14.7055C16.6168 14.6553 16.5065 14.5816 16.4136 14.4887C16.3206 14.3958 16.247 14.2854 16.1967 14.164C16.1464 14.0426 16.1206 13.9125 16.1207 13.7811L16.1216 3.46772L2.27294 17.3164C2.08541 17.5039 1.83108 17.6092 1.56588 17.6092C1.30068 17.6092 1.04634 17.5039 0.858819 17.3164C0.671295 17.1288 0.565945 16.8745 0.565945 16.6093C0.565945 16.3441 0.671295 16.0898 0.858819 15.9022L14.7075 2.0536L4.39411 2.05448C4.12877 2.05448 3.87429 1.94907 3.68666 1.76145C3.49903 1.57382 3.39363 1.31934 3.39363 1.05399C3.39363 0.788647 3.49903 0.534169 3.68666 0.34654C3.87429 0.158912 4.12877 0.0535036 4.39412 0.0535036L17.1212 0.0535031C17.2526 0.05343 17.3827 0.079259 17.5041 0.129512C17.6256 0.179766 17.7359 0.253458 17.8288 0.346377C17.9217 0.439295 17.9954 0.549617 18.0457 0.671035C18.0959 0.792453 18.1217 0.922586 18.1217 1.05399L18.1217 13.7811C18.1217 13.9125 18.0959 14.0426 18.0457 14.164C17.9954 14.2854 17.9217 14.3958 17.8288 14.4887C17.7359 14.5816 17.6256 14.6553 17.5041 14.7055C17.3827 14.7558 17.2526 14.7816 17.1212 14.7816Z"
                        fill="#FD8600"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="line-v-1" />
      <div className="line-v-2" />
      <div className="line-v-3" />
    </section>
  );
}
