'use client'
import React, { useState, useEffect } from 'react';
import loaderimg from '../../../../public/client/assets/images/loader.png';
import Image from 'next/image';
import './Loader.scss';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // 3000ms / 100 steps = 30ms per step

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container h-screen w-screen">
      <div className="loader-image-container">
        <Image
          src={loaderimg}
          alt="Loader"
          sizes='100%'
          className="loader-image w-32"
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">{progress}%</div>
    </div>
  );
}
