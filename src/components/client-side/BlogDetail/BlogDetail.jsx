'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Content from "./components/Content";
import { ClipLoader } from "react-spinners";
import "./BlogDetail.scss";
import RelatedPost from "./components/RelatedPost";

export default function BlogDetail({id}) {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchBlog = async () => {
    setLoading(true);
    const res = await axios.get(
      `/api/blogs/${id}`
    );
    setBlog(res.data);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <ClipLoader loading={loading} size={75} color={"#FC8500"} />
        </div>
      ) : (
        <>
          <Content blog={blog} />
          <RelatedPost currentBlogId={blog._id} />
        </>
      )}
    </>
  );
}
