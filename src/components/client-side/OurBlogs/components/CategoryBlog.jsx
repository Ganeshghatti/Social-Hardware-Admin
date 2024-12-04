"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BlogCard from "../../ui/BlogCard";
import { useSearchParams } from "next/navigation";

const CategoryBlog = ({ blogs, categories }) => {
  const [activeCategory, setActiveCategory] = useState("All Category");
  const searchParams = useSearchParams();
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const handleActiveCategory = (category) => {
    setActiveCategory(category);
    if (category === "All Category") {
      setFilteredBlogs(blogs);
    } else {
      const selectedCategoryObj = categories.find(
        (cat) => cat.name === category
      );

      if (selectedCategoryObj) {
        const filtered = blogs.filter((blog) =>
          blog.category.some(
            (blogCategory) => blogCategory._id === selectedCategoryObj._id
          )
        );
        setFilteredBlogs(filtered);
      }
    }
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const getCategoryData = categories.find((cat) => cat.slug === category);
      setActiveCategory(getCategoryData.name);
      const selectedCategoryObj = categories.find(
        (cat) => cat.name === getCategoryData.name
      );
      if (selectedCategoryObj) {
        const filtered = blogs.filter((blog) =>
          blog.category.some(
            (blogCategory) => blogCategory._id === selectedCategoryObj._id // Ensure this matches the correct property
          )
        );
        setFilteredBlogs(filtered);
      }
    } else {
      setFilteredBlogs(blogs);
    }
  }, [blogs, searchParams]);

  return (
    <section className="relative flex py-4 md:py-8" id="category-blog">
      <div className="left-container" />
      <div className="center-container flex flex-col items-center px-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-4 justify-center">
          <button
            onClick={() => handleActiveCategory("All Category")}
            className={`px-8 rounded-full py-2 text-xs md:text-[16px] ${
              activeCategory === "All Category"
                ? "bg-[#D4D4D4] text-black"
                : "bg-[#1B1B1B] text-white"
            }`}
          >
            All
          </button>
          {categories.length > 0 &&
            categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleActiveCategory(cat.name)}
                className={`px-8 rounded-full py-2 text-xs md:text-[16px] ${
                  activeCategory === cat.name
                    ? "bg-[#D4D4D4] text-black" // Selected category styles
                    : "bg-[#1B1B1B] text-white" // Unselected category styles
                }`}
              >
                {cat.name}
              </button>
            ))}
        </div>

        <div className="flex flex-row flex-wrap gap-4 mt-10">
          {filteredBlogs.map((blog) => (
            <Link href={`/blogs/${blog._id}`} key={blog._id}>
              <BlogCard key={blog._id} {...blog} />
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <p className="text-white">No blogs found.</p>
        )}
      </div>

      <div className="right-container" />
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
};

export default CategoryBlog;
