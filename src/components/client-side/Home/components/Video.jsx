"use client";
import React, { useState } from "react";
import TitleComponent from "../../ui/TitleComponent";
import thumbnail from "../../../../../public/client/assets/images/thumbnail.jpeg"
import Image from "next/image";


const videoResolutions = [
  { resolution: "480p", src: "/client/assets/video/video480p.mp4" },
  { resolution: "720p", src: "/client/assets/video/video720p.mp4" },
  { resolution: "1080p", src: "/client/assets/video/video1080p.mp4" },
];

const Video = () => {
  const [resolution, setResolution] = useState("720p");

  const handleResolutionChange = (e) => {
    setResolution(e.target.value);
  };

  return (
    <section id="video" className="relative py-4 md:py-8 flex w-full">
      <TitleComponent title="Tech Demo" styles={"absolute"} />


      <div className="video-container flex md:justify-center w-full pt-16 md:pt-24 z-10">
        <video
          controls
          poster={"/client/assets/images/thumbnail.jpeg"}
          className="rounded-lg shadow-lg video-mp4 w-4/5 ml-[4%] md:ml-0 md:w-[65%]"
        >
          {videoResolutions.map((video) => (
            <source key={video.resolution} src={video.src} type="video/mp4" />
          ))}
          Your browser does not support the video tag.
          <Image
            src={thumbnail}
            height={1000}
            width={1000}
            alt="Video Thumbnail"
            loading="lazy"
          />
        </video>
      </div>

      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
};

export default Video;
