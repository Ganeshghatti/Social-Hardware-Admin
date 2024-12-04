'use client'
import React, { useEffect, useState } from "react";
import CategoryBlog from "./components/CategoryBlog";
import "./OurBlogs.scss";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Subscription from "./components/Subscription";

const OurBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [blogsResponse, categoriesResponse] = await Promise.all([
        axios.get("/api/public/blogs"),
        axios.get(
          "/api/public/category"
        ),
      ]);

      setBlogs(blogsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <ClipLoader loading={loading} size={75} color={"#FC8500"} />
        </div>
      ) : (
        <>
          <Subscription />
          <CategoryBlog blogs={blogs} categories={categories} />
        </>
      )}
    </>
  );
};

export default OurBlogs;
