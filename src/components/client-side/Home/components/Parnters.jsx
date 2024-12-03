'use client'
import React, { useState } from "react";
import ISRO from "../../../../public/client-side/assets/images/partners/ISRO.png";
import NSIL from "../../../../public/client-side/assets/images/partners/NSIL.png";
import MOD from "../../../../public/client-side/assets/images/partners/MOD.png";

const images = [ISRO, NSIL, MOD];

const Partners = () => {
  return (
    <section id="partners" className="relative py-4 md:py-8 flex w-full">
      <div className="left-container" />
      <div className="center-container px-0 md:px-6 flex flex-col gap-6 md:gap-12 items-center">
        <h2 className="standard-title">PROUDLY WORKING WITH</h2>
        <div className="images-container flex flex-row justify-around">
          {images.map((image, index) => (
            <div
              className="w-1/3 py-3 px-8 bg-white image-block rounded flex items-center justify-center mx-4 border-[#fc8500] border-1"
              key={index}
            >
              <img src={image} alt={`Partner ${index + 1}`} className="w-48" />
            </div>
          ))}
        </div>
      </div>
      <div className="right-container" />

      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
};

export default Partners;
