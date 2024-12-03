"use client";
import Image from "next/image";
import Home from "@/components/client-side/Home/Home";


export default function page() {
  return (
    <>
      {/* <Image
      src={"/client/assets/images/card1.png"}
      alt="image"
      height={100}
      width={100}
    /> */}
      <Navbar />
      <Home />
    </>
  );
}
