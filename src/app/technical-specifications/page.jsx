import React from "react";
import BlockComponent from "@/components/client-side/Home/components/BlockComponent";
import BlockComponentNoVline from "@/components/client-side/Home/components/BlockComponentNoVline";
import EclipseControl from "@/components/client-side/Home/components/technical-specifications/EclipseControl";
import "../../components/client-side/Home/Home.scss";
import "./TechnicalSpecification.scss";
import Navbar from "@/components/client-side/ui/Navbar/Navbar";
import Footer from "@/components/client-side/ui/Footer/Footer";
import TechSpecs from "@/components/client-side/Home/components/technical-specifications/TechSpecs";
import Teleoperation from "@/components/client-side/Home/components/technical-specifications/Teleoperation";
import HeadMountedDisplay from "@/components/client-side/Home/components/technical-specifications/HeadMountedDisplay";
import RangeNetwork from "@/components/client-side/Home/components/technical-specifications/RangeNetwork";

const page = () => {
  return (
    <main>
      <Navbar />
      <EclipseControl />
      <BlockComponentNoVline />
      <TechSpecs />
      <BlockComponentNoVline />
      <Teleoperation />
      <BlockComponentNoVline />
      <HeadMountedDisplay />
      <BlockComponentNoVline />
      <RangeNetwork />
      {/* <section
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
      </section> */}
      <Footer />
    </main>
  );
};

export default page;
