import React from "react";
import Link from "next/link";
export default function Content({ blog }) {
  return (
    <section id="blog-detail-content" className="relative flex mt-[85px] py-10">
      <div className="left-container"></div>
      <div className="center-container flex flex-col gap-2">
        <div className="w-full flex gap-2 standard-description cursor-pointer px-4 mb-8">
          <Link href="/">
            <span>&larr;</span> <span className=" underline"> Back</span>
          </Link>
        </div>
        <ul className="flex gap-4 px-4 items-center text-white list-none">
          {/* @AASU currently blog api fetches only category ID, modify api href also fetch category details. Also on clicking this, it should take user href our-blog page with clicked category selected */}

          {/* <li className="list-none">
            {blog.category.map((item) => {
              <button className="bg-[#353232] py-1 rounded-full px-3 font-semibold text-white shadow-md shadow-black">
                CATEGORY
              </button>
            })}
          </li> */}
          <li className="opacity-65 text-sm">&#x2022; November 12, 2024</li>
          <li className="opacity-65 text-sm">&#x2022; 9 min read</li>
        </ul>
        {/* <div className="w-full flex gap-2 px-4">
          <p>{new Date(blog.updatedAt).toLocaleDateString('en-GB')}</p>
        </div> */}
        <h1 className="title mt-8 px-4">{blog.title}</h1>
        <div className="mt-4 flex gap-4 items-center text-md px-4">
          <img
            src="/assets/images/favicon.png"
            className="h-[50px] aspect-square w-[50px] object-cover rounded-full"
          />
          <div className="text-white">
            <p>Cameron Norris</p>
            <p className="opacity-65 text-sm">Co- Founder @Social Hardware</p>
          </div>
        </div>
        <p className="standard-description px-4 mt-4">{blog.description}</p>
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-auto md:h-[600px] object-cover mt-4 px-4"
        />
        <p
          className="standard-description px-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <div className="right-container"></div>
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
}
