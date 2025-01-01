import React from "react";
import BlockComponent from "@/components/client-side/Home/components/BlockComponent";
import EclipseControl from "@/components/client-side/Home/components/new1/EclipseControl";
import "../../components/client-side/Home/Home.scss";
import Navbar from "@/components/client-side/ui/Navbar/Navbar";
import Footer from "@/components/client-side/ui/Footer/Footer";
import TechSpecs from "@/components/client-side/Home/components/new1/TechSpecs";
import Teleoperation from "@/components/client-side/Home/components/new1/Teleoperation";
import Head from "@/components/client-side/Home/components/new1/Head";
import HeadDis from "@/components/client-side/Home/components/new1/HeadDis";

const page = () => {
  return (
    <main className="">
      <Navbar />
      <div className="mt-12">
        <BlockComponent />
      </div>
      <EclipseControl />
      <BlockComponent />
        <TechSpecs />
        <Teleoperation />
        <BlockComponent />
        <Head />
        <BlockComponent />
        <HeadDis />
        <BlockComponent />
      <Footer />
    </main>
  );
};

export default page;
