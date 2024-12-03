import React from "react";
import Link from "next/link";
import Image from "next/image";
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
          <li className="opacity-65 text-sm">&#x2022; November 12, 2024</li>
          <li className="opacity-65 text-sm">&#x2022; 9 min read</li>
        </ul>
        <h1 className="title mt-8 px-4">{blog.title}</h1>
        <div className="mt-4 flex gap-4 items-center text-md px-4">
          <Image
            src="/client/assets/images/favicon.png"
            alt="Cameron Norris"
            height={1000}
            width={1000}
            quality={100}
            className="h-[50px] aspect-square w-[50px] object-cover rounded-full"
          />
          <div className="text-white">
            <p>Cameron Norris</p>
            <p className="opacity-65 text-sm">Co- Founder @Social Hardware</p>
          </div>
        </div>
        <p className="standard-description px-4 mt-4">{blog.description}</p>
        <Image
          src={blog.coverImage}
          alt={blog.title}
          width={1200}
          height={600}
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
