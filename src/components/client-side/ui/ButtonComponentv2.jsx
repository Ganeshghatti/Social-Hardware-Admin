import React from "react";
import Link from "next/link";

export default function ButtonComponentv2({ text, link, styles }) {
  return (
    <Link href={link}>
      <button className={`relative ${styles}`}>
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
          className="flex items-center justify-center text-sm font-medium text-white absolute inset-0"
          style={{ transform: "translate(-1px, -1px)" }}
        >
          {text}
        </p>
      </button>
    </Link>
  );
}
