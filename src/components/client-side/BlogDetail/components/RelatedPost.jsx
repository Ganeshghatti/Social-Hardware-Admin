'use client'
import React, { useState, useEffect } from "react";
import BlogCard from "../../ui/BlogCard";
import axios from "axios";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

const RelatedPost = ({ currentBlogId }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/blogs`
      );
      setBlogs(res?.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed href fetch blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <section id="blog-detail-content" className="py-10 w-full px-8 relative">
      <h2 className="text-[45px] text-white font-semibold text-center">
        Related Articles
      </h2>
      <div className="flex mt-24 px-2 md:px-0 md:mt-22 mb-5 md:mb-10">
        <div className="left-container z-10"></div>
        <div className="center-container flex flex-wrap gap-6 justify-start">
          {blogs.length > 0 ? (
            blogs.map(
              (blog) =>
                blog._id !== currentBlogId && (
                  <Link href={`/blogs/${blog._id}`} key={blog._id}>
                    <BlogCard key={blog._id} {...blog} />
                  </Link>
                )
            )
          ) : (
            <p className="opacity-50 text-xl font-semibold">No Related Post</p>
          )}

          {loading && (
            <ClipLoader loading={loading} size={25} color={"#FC8500"} />
          )}
        </div>
      </div>
      <div className="right-container"/>
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
};

export default RelatedPost;
