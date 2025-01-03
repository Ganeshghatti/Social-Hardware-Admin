import React from "react";
import System from "@/components/client-side/Home/components/product/System";
import Attachments from "@/components/client-side/Home/components/product/Attachments";
import Capabilities from "@/components/client-side/Home/components/product/Capabilities";
import Customization from "@/components/client-side/Home/components/product/Customization";
import Eclipse from "@/components/client-side/Home/components/product/Eclipse";
import "../../components/client-side/Home/Home.scss";
import "./Product.scss";
import Navbar from "@/components/client-side/ui/Navbar/Navbar";
import Footer from "@/components/client-side/ui/Footer/Footer";
import BlockComponentNoVline from "@/components/client-side/Home/components/BlockComponentNoVline";

const page = () => {
  return (
    <main>
      <Navbar />
      <Eclipse />
      <BlockComponentNoVline />
      <System />
      <BlockComponentNoVline />
      <Attachments />
      <BlockComponentNoVline />
      <Capabilities />
      <BlockComponentNoVline />
      <Customization />
      <BlockComponentNoVline />
      <Footer />
    </main>
  );
};

export default page;
