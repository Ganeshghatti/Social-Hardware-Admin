'use client'
import React from "react";
import CategoryBlog from "../components/CategoryBlog";

const OurBlogs = () => {
  return (
    <section id="blog-detail-content" className="mt-[54px] py-24 relative px-4">
      <h2 className="text-center text-white text-[70px] font-medium">
        Connect to the Loop
      </h2>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-md mt-8 rounded-[9px] flex gap-2 bg-[#1A1A1A] mx-auto overflow-hidden h-fit"
      >
        <input
          type="email"
          className="outline-none border-none w-full h-full bg-transparent px-4 py-3  text-white "
          name="email"
          required
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="text-orange tracking-wide px-8 py-3 border-l-2 border-l-black bg-transparent"
        >
          Subscribe
        </button>
      </form>

      <div className="mx-auto center-container mt-20 ">
        <div className="left-container z-10"></div>
        <CategoryBlog />
        <div className="right-container"></div>
      </div>
    </section>
  );
};

export default OurBlogs;
