import React from "react";
import Link from "next/link";

export default function ButtonComponentv1({ text, link, styles }) {
  return (
    <Link href={link}>
      <button className={`relative ${styles}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={113}
          height={38}
          fill="none"
          className="absolute -mt-1 ml-2"
        >
          <path
            stroke="#F6F6F6"
            strokeWidth={1.145}
            d="M108.983 1H4.075A3.434 3.434 0 0 0 .64 4.434v21.681c0 1.434.89 2.718 2.234 3.218l20.138 7.507c.383.143.79.216 1.2.216h77.42a3.434 3.434 0 0 0 3.33-2.595l7.351-29.188A3.435 3.435 0 0 0 108.983 1Z"
          />
        </svg>
        <div className="flex relative">
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
              stroke-width="1.41406"
            />
          </svg>
          <div className="flex items-center justify-center gap-2 absolute mt-2 mr-1 inset-0 transform -translate-y-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <circle cx="5.16406" cy="4.86718" r="4.24218" fill="#E7A349" />
            </svg>
            <p className="text-sm font-medium text-white">{text}</p>
          </div>
        </div>
      </button>
    </Link>
  );
}
