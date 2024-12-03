"use client";
import Image from "next/image";
import Navbar from "@/components/client-side/Navbar/Navbar";
import Home from "@/components/client-side/Home/Home";
import Footer from "@/components/client-side/Footer/Footer";

export default function page() {
  return (
    <>
      <Navbar />
      <Home />

      <Footer/>
    </>
  );
}
