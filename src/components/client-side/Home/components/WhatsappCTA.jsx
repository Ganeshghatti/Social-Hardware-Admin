'use client'
import React from "react";
import WhatsappCTAimg from "../../../../public/client-side/assets/images/WhatsappCTA.png";

export default function WhatsappCTA() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "9353586240";
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section
      id="whatsappCTA"
      className="relative flex flex-col md:flex-row justify-center items-center w-full gap-6 md:gap-0 py-8"
    >
      <div className="standard-title px-[5%] w-[68%] md:w-auto flex-col flex justify-center items-start z-10">
        No matter the environment.
        <br />
        No matter the challenge.
        <br />
        Eclipse has you covered.
        <button 
          className="bg-[#46C756] text-white flex gap-1 md:gap-2 items-center font-['VioletSans'] px-2 md:px-4 py-1 md:py-2 rounded-md text-sm w-full md:w-auto md:text-2xl mt-4"
          onClick={handleWhatsAppClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
          >
            <g clip-path="url(#clip0_846_277)">
              <g filter="url(#filter0_f_846_277)">
                <path
                  d="M12.1385 30.7573L12.636 31.0514C14.7254 32.289 17.121 32.9437 19.5641 32.9448H19.5692C27.0718 32.9448 33.1777 26.852 33.1808 19.3633C33.1821 15.7344 31.7676 12.3218 29.1977 9.75483C27.9372 8.48885 26.4376 7.48498 24.7858 6.80133C23.134 6.11767 21.3627 5.76782 19.5745 5.77201C12.0662 5.77201 5.96006 11.8642 5.95738 19.3524C5.95369 21.9094 6.67513 24.4153 8.03831 26.5803L8.36217 27.0939L6.98683 32.1053L12.1385 30.7573ZM3.05469 35.9877L5.37823 27.5205C3.94524 25.0425 3.19135 22.2314 3.19224 19.3513C3.19603 10.3415 10.5421 3.01172 19.5694 3.01172C23.9501 3.01394 28.0618 4.71544 31.1542 7.80408C34.2465 10.8927 35.9479 14.9982 35.9464 19.3644C35.9424 28.3735 28.5951 35.7047 19.5692 35.7047H19.5621C16.8214 35.7036 14.1284 35.0173 11.7363 33.7155L3.05469 35.9877Z"
                  fill="#B3B3B3"
                />
              </g>
              <path
                d="M2.88281 35.8198L5.20635 27.3525C3.7709 24.8686 3.0169 22.0508 3.02037 19.1834C3.02415 10.1736 10.3703 2.84375 19.3975 2.84375C23.7782 2.84597 27.8899 4.54747 30.9823 7.63611C34.0746 10.7247 35.776 14.8302 35.7745 19.1965C35.7705 28.2056 28.4233 35.5367 19.3973 35.5367H19.3902C16.6495 35.5356 13.9565 34.8494 11.5644 33.5475L2.88281 35.8198Z"
                fill="white"
              />
              <path
                d="M19.4062 5.60551C11.8978 5.60551 5.79175 11.6977 5.78908 19.1859C5.78538 21.7429 6.50682 24.2488 7.87 26.4138L8.19386 26.9276L6.81852 31.939L11.9704 30.5908L12.4679 30.8849C14.5573 32.1225 16.9529 32.777 19.396 32.7783H19.4011C26.9037 32.7783 33.0098 26.6855 33.0127 19.1968C33.0183 17.4119 32.6692 15.6436 31.9855 13.9943C31.3018 12.345 30.2971 10.8474 29.0296 9.58833C27.7691 8.32232 26.2695 7.31843 24.6176 6.63478C22.9658 5.95112 21.1945 5.60128 19.4062 5.60551Z"
                fill="url(#paint0_linear_846_277)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.3067 12.3518C15 11.6718 14.6773 11.658 14.3859 11.6463L13.6015 11.6367C13.3287 11.6367 12.8853 11.7389 12.5104 12.1477C12.1356 12.5564 11.0781 13.5444 11.0781 15.5538C11.0781 17.5632 12.5445 19.5048 12.7488 19.7776C12.9532 20.0504 15.5796 24.3054 19.739 25.9425C23.1955 27.303 23.8989 27.0324 24.6494 26.9644C25.4 26.8964 27.0704 25.9765 27.4112 25.0228C27.752 24.069 27.7522 23.2519 27.6501 23.0811C27.5479 22.9103 27.275 22.8087 26.8655 22.6044C26.4559 22.4 24.4444 21.412 24.0694 21.2756C23.6943 21.1392 23.4217 21.0715 23.1485 21.4802C22.8754 21.889 22.0922 22.8085 21.8533 23.0811C21.6145 23.3537 21.3761 23.3879 20.9666 23.1837C20.557 22.9796 19.2393 22.5482 17.6759 21.1568C16.4595 20.0742 15.6384 18.7373 15.3993 18.3287C15.1603 17.9202 15.374 17.6989 15.5792 17.4954C15.7628 17.3124 15.9883 17.0185 16.1933 16.7801C16.3983 16.5417 16.4657 16.3713 16.602 16.0992C16.7382 15.827 16.6703 15.588 16.5679 15.3838C16.4655 15.1797 15.6704 13.1596 15.3067 12.3518Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_846_277"
                x="-4.00731"
                y="-4.05028"
                width="47.0146"
                height="47.1006"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="3.531"
                  result="effect1_foregroundBlur_846_277"
                />
              </filter>
              <linearGradient
                id="paint0_linear_846_277"
                x1="19.1238"
                y1="7.23613"
                x2="19.2612"
                y2="30.457"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#57D163" />
                <stop offset="1" stop-color="#23B33A" />
              </linearGradient>
              <clipPath id="clip0_846_277">
                <rect width="39" height="39" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Message us on WhatsApp
        </button>
      </div>
      <img
        src={WhatsappCTAimg}
        alt="Eclipse Remote Systems"
        className="w-[68%] md:w-1/3 z-10"
      />
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
}
