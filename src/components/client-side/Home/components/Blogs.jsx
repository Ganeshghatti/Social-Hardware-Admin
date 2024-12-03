'use client'
import React, { useEffect, useState } from "react";
import TitleComponent from "../../ui/TitleComponent";
import axios from "axios";
import BlogCard from "../../ui/BlogCard";
import Link from "next/link";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get(
      `https://social-hardware-admin.vercel.app/api/public/blogs`
    );
    setBlogs(res.data);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <section id="blogs" className="relative flex">
      <div className="left-container">
        <TitleComponent title="Our Blogs" styles={"absolute h-fit"} />
      </div>
      <div className="center-container">
        <div className=" flex flex-wrap gap-6 justify-center w-full mt-24 px-2 md:px-0 md:mt-32 mb-5">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog._id}`} key={blog._id}>
              <BlogCard key={blog._id} {...blog} />
            </Link>
          ))}
        </div>
        <Link href="/our-blogs" className="flex justify-center mb-5 md:mb-10">
          <button className="relative transition-colors duration-300 w-fit px-4 self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="114"
              height="39"
              viewBox="0 0 114 39"
              fill="none"
            >
              <path
                d="M109.458 1.25391H4.97331C3.07663 1.25391 1.53906 2.79147 1.53906 4.68815V25.8606C1.53906 27.0838 2.18967 28.2147 3.24713 28.8295L18.4733 37.6824C18.9975 37.9871 19.5931 38.1477 20.1995 38.1477H99.0199C100.482 38.1477 101.784 37.2221 102.264 35.8412L112.702 5.81587C113.478 3.58424 111.821 1.25391 109.458 1.25391Z"
                fill="black"
                stroke="#E7A349"
                strokeWidth="1.41406"
              />
            </svg>
            <p
              className="flex items-center justify-center text-sm font-medium text-white absolute px-4 inset-0"
              style={{ transform: "translate(-1px, -1px)" }}
            >
              View All
            </p>
          </button>
        </Link>
      </div>
      <div className="right-container"></div>
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
}
