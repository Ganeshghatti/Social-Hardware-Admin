'use client'
import React, { useState, useEffect } from "react";
import BlogCard from "../../ui/BlogCard";
import axios from "axios";
import Link from "next/link";

const CategoryBlog = () => {
  const [activeCategory, setActiveCategory] = useState("All Category");
  const [category, setCategory] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const handleActiveCategory = (category) => {
    setActiveCategory(category);
    if (category === "All Category") {
      setFilteredBlogs(blogs);
    } else {
      const selectedCategoryObj = category.find((cat) => cat.name === category);

      if (selectedCategoryObj) {
        const filtered = blogs.filter((blog) =>
          blog.category.some(
            (blogCategory) =>
              blogCategory._id === selectedCategoryObj._id ||
              blogCategory === selectedCategoryObj._id
          )
        );
        setFilteredBlogs(filtered);
      }
    }
  };

  const fetchCategory = async () => {
    try {
      setCategoryLoading(true);
      const res = await axios.get(
        `https://social-hardware-admin.vercel.app/api/category`
      );
      setCategory(res?.data);
      setCategoryLoading(false);
    } catch (error) {
      console.error("Failed href fetch Category:", error);
      setCategory([]);
    } finally {
      setCategoryLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      setBlogLoading(true);
      const res = await axios.get(
        `https://social-hardware-admin.vercel.app/api/public/blogs`
      );
      setBlogs(res?.data);
      setFilteredBlogs(res?.data);
      setBlogLoading(false);
    } catch (error) {
      console.error("Failed href fetch blogs:", error);
      setBlogs([]);
      setFilteredBlogs([]);
    } finally {
      setBlogLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      await fetchCategory();
      await fetchBlogs();
    })();
  }, []);

  return (
    <section className="mx-auto">
      <div className="flex flex-wrap items-center gap-6 ">
        <button
          onClick={() => handleActiveCategory("All Category")}
          className={`px-8 rounded-full py-2 ${
            activeCategory == "All Category"
              ? "bg-[#D4D4D4] text-black"
              : "bg-[#1B1B1B] text-white"
          }`}
        >
          All Category
        </button>
        {category.length > 0 &&
          category.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleActiveCategory(cat.name)}
              className={`px-8 rounded-full py-2 ${
                activeCategory == cat.name
                  ? "bg-[#D4D4D4] text-black"
                  : "bg-[#1B1B1B] text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
      </div>

      {categoryLoading && <p className="text-white">Loading Category...</p>}

      {/* Render filtered blogs */}
      <div className="flex flex-row flex-wrap gap-4 mt-10">
        {filteredBlogs.map((blog) => (
          <Link href={`/blogs/${blog._id}`} key={blog._id}>
            <BlogCard key={blog._id} {...blog} />
          </Link>
        ))}
      </div>

      {/* Loading and empty state handling */}
      {blogLoading && <p className="text-white">Loading blogs...</p>}
      {!blogLoading && filteredBlogs.length === 0 && (
        <p className="text-white">No blogs found.</p>
      )}
    </section>
  );
};

export default CategoryBlog;
