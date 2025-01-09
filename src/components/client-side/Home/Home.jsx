"use client";
import React, { useEffect } from "react";
import Hero from "./components/Hero";
import "./Home.scss";
import BlockComponent from "./components/BlockComponent";
import Features from "./components/Features";
import Features1 from "./components/Features1";
import Partnerships from "./components/Partnerships";
import FAQs from "./components/FAQs";
import SectionIndicator from "../ui/SectionIndicator";
import Functionalities from "./components/Functionalities";
import Contact from "./components/Contact";
import Technology from "./components/Technology";
import Video from "./components/Video";
import WhatsappCTA from "./components/WhatsappCTA";
import TwitterPosts from "./components/TwitterPosts";
import Partners from "./components/Parnters";
import Blogs from "./components/Blogs";
import System from "./components/product/System";
import Attachments from "./components/product/Attachments";
import Capabilities from "./components/product/Capabilities";
import Customization from "./components/product/Customization";
import Eclipes from "./components/product/Eclipse";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <main>
      <Hero />
      <BlockComponent />
      <Technology />
      <BlockComponent />
      {/* <Video />
      <BlockComponent /> */}
      <Features />
      <BlockComponent />
      {/* <Partners />
    <BlockComponent /> */}
      {/* <Functionalities />
    <BlockComponent /> */}
      <FAQs />
      <BlockComponent />
      <Partnerships />
      <BlockComponent />
      <Contact />
      <BlockComponent />
      <Blogs />
      <BlockComponent />
      <TwitterPosts />
      <BlockComponent />
      {/* <WhatsappCTA /> */}
      <SectionIndicator />
    </main>
  );
}
