'use client'
import { useEffect, useState } from "react";
import TitleComponent from "../../ui/TitleComponent";
import Link from "next/link";

const TwitterPosts = () => {
  const [tweets] = useState([
    "1857399413515427876",
    "1859167766269595796",
    "1854137523892875658",
  ]);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="twitterposts" className="relative py-8 flex flex-col w-full">
      <TitleComponent title="Follow us" styles={"absolute"} />

      <div className="tweets-container w-[68%] pt-10 md:pt-0 md:mt-32 flex flex-wrap justify-around flex-col md:flex-row m-auto items-start">
        {tweets.map((tweetId) => (
          <div 
            key={tweetId} 
            className="tweet-wrapper h-auto overflow-hidden w-11/12 md:w-[30%] mx-auto"
          >
            <blockquote
              className="twitter-tweet w-full"
              data-theme="dark"
              data-align="center"
            >
              <Link
                href={`https://twitter.com/social_hardware/status/${tweetId}`}
              ></Link>
            </blockquote>
          </div>
        ))}
      </div>

      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
};

export default TwitterPosts;