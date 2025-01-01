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
      <section
        className="h-16 md:h-full w-full relative py-10"
        id="BlockComponent"
      >
        <div className="max-w-[1100px] gap-20 md:flex-nowrap flex-wrap w-full relative flex justify-between items-center mx-auto">
          <p>
            State-of-the-art{" "}
            <span className="text-oranges">mesh networking technology</span>{" "}
            enables seamless and reliable data transfer between devices, even in
            challenging environments without a direct line of sight.
          </p>
          <p>
            These robust, self-healing networks provide seamless data transfer
            between the robot and its operator, automatically adapting to
            disruptions to ensure smoooth operations.
          </p>
        </div>
      </section>
      <div className="mt-12">
      <Footer />
      </div>
    </main>
  );
};

export default page;
