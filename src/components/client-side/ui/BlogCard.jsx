import React from "react";
import Image from "next/image";

export default function BlogCard({ thumbnailImage, title }) {
  return (
    <div className="h-64 w-full md:w-80 md:h-96 bg-[#0D0D0D] rounded-xl relative">
      <Image
        src={thumbnailImage}
        alt={title}
        height={1000}
        width={1000}
        className="w-full h-44 md:h-60 object-cover rounded-t-xl"
      />
      <div className="p-4 bg-[#353232]  absolute bottom-0 w-full h-28 md:h-40 rounded-xl flex flex-col gap-4">
        <h3 className="standard-description">{title}</h3>
        <button className="font-bold text-xs md:text-[16px] w-fit underline text-[#D4D4D4]">
          Read More
        </button>
      </div>
    </div>
  );
}
