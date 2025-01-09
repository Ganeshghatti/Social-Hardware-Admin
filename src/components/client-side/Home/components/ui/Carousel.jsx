//JSX code
"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { GoDot } from "react-icons/go";
import Autoplay from "embla-carousel-autoplay";
import { HiOutlineChevronRight } from "react-icons/hi";
import Image from "next/image";

const CarouselNavigation = ({
  roleClick,
  role,
  className,
  disabled
}) => {
  
  return (
    <button
      type="button"
      className={`text-2xl ${disabled && "opacity-30"} text-oranges hover:text-oranges/80 ${className}`}
      onClick={roleClick}
      disabled={disabled}
    >
      <HiOutlineChevronRight className={`${role === "prev" && "rotate-180"}`} />
    </button>
  );
};

const CarouselSlides = ({ carouselData, perView }) => {
  return (
    <div className="w-full flex gap-6">
      {carouselData.map(({ id, title, image, alt }, index) => (
        <div
          className="flex flex-col gap-12 w-full md:w-1/2 text-[16px] md:text-[20px]"
          key={`slide-${index}`}
          style={{ flex: `0 0 ${100 / perView}%` }}
        >
          <div className="w-full border border-white grid grid-cols-3 overflow-hidden">
            <div className="p-2 md:p-6 border-r border-white max-w-[80px] text-center w-full">
              {id}
            </div>
            <div className="p-2 md:p-6">{title}</div>
          </div>
          <div className="flex justify-center items-center relative">
            <Image
              src={image}
              alt={alt}
              width={1000}
              height={1000}
              className="max-w-[500px] w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
const CarouselDots = ({ slides, selectedIndex, onDotClick }) => (
  <span className="flex z-10 items-center justify-center absolute left-1/2 transform -translate-x-1/2 bottom-3">
    {Array.from({ length: slides }).map((_, index) => (
      <GoDot
        onClick={() => onDotClick(index)}
        key={index}
        className={`cursor-pointer transition-all duration-500 hover:text-oranges 
         ${
           index === selectedIndex
             ? " text-oranges text-lg"
             : " text-oranges/40 text-base"
         }
       `}
      />
    ))}
  </span>
);

const Carousel = ({ carouselData, perView = 1 }) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "keepSnaps",
    slidesToScroll: 1,
  });
  const scrollTo = (index) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const logSlidesInView = useCallback((emblaApi) => {
    if (!emblaApi) return;
    setSelectedSlideIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", logSlidesInView).on("reInit", logSlidesInView);
    }
  }, [emblaApi, logSlidesInView]);

  return (
    <div
      className=" w-full p-1 h-full overflow-hidden relative rounded-lg"
      ref={emblaRef}
    >
      <CarouselSlides carouselData={carouselData} perView={perView} />
      <CarouselNavigation
        roleClick={scrollPrev}
        disabled={selectedSlideIndex === 0}
        role="prev"
        className="absolute top-1/2 -translate-y-1/2 left-2"
      />
      <CarouselNavigation
        roleClick={scrollNext}
        disabled={selectedSlideIndex === carouselData.length - 1}
        role="next"
        className="absolute top-1/2 -translate-y-1/2 right-2 z-50"
      />
      {/* <CarouselDots
        slides={carouselData.length}
        selectedIndex={selectedSlideIndex}
        onDotClick={scrollTo}
      /> */}
    </div>
  );
};

export default Carousel;
