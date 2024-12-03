import React from "react";
import TitleComponent from "../../ui/TitleComponent";
import { AugmentedRealityControl } from "../../ThreeD/AugmentedRealityControl";
import { ModularToolAttachments } from "../../ThreeD/ModularToolAttachments";
import { MeshNetworkCommunication } from "../../ThreeD/MeshNetworkCommunication";
import Card1 from "../../../../../public/client/assets/images/features/card1.gif";
import Card2 from "../../../../../public/client/assets/images/features/card2.gif";
import Card3 from "../../../../../public/client/assets/images/features/card3.gif";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Image from "next/image";

export default function Features() {
  const cardData = [
    {
      index: "01",
      title: "Augmented Reality (AR) Control",
      description:
        "Operators control Eclipse through an AR interface that provides a real-time video feed from the robot's perspective, with key data seamlessly integrated into the display.<br/><br/> This combination of live video and information allows for precise control, making the system ideal for high-risk tasks where accuracy and quick decision-making are essential.",
      params: ["5MS LATENCY", "REAL-TIME DATA OVERLAY"],
      img: Card1,
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
        "Allows for quick adaptation to mission-specific requirements with minimal downtime and easy maintenance, ensuring long-term adaptability as your mission demands evolve.<br/><br/> Shipped with cutting disc, precision gripper, bionic hands, and metal detector, as standard, making Eclipse a cost-effective and efficient solution for diverse operational needs.",
      params: [" DUAL 10-DOF ARMS", "NO REBOOT NEEDED"],
      img: Card2,
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
        "The Eclipse uses advanced mesh networking technology, which enables operators to control the robots without needing a direct line of sight. <br/><br/> This ensures reliable communication in obstructed or confined environments, such as collapsed buildings or underground tunnels, where traditional methods might fail. ",
      params: ["UP TO 1.5 KM RANGE", "ROBUST  DATA TRANSMISSION"],
      img: Card3,
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
    <section id="features" className="relative flex">
      <TitleComponent title="Features" styles={"absolute h-fit"} />
      <div className="cards-parent-container relative flex flex-col w-full mt-10 md:mt-32">
        {cardData.map((card, index) => (
          <div className="cards-container py-8" key={index}>
            <div className="card w-[80%] ml-[4%] z-10 flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center pt-6 md:pt-0">
              <div className="card-left w-full md:w-1/2 flex flex-col gap-4 z-10">
                <p className="index w-fit">{card.index}</p>
                <p className="standard-title">{card.title}</p>
                <p
                  className="standard-description mt-4"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
              </div>
              <Image
                src={card.img}
                alt={card.title}
                width={1000}
                height={1000}
                className="z-10 w-full md:w-[45%]"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
}
