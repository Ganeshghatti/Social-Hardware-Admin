import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Cust1 from "../../../../../../public/client/assets/images/product/cust1.png";
import Cust2 from "../../../../../../public/client/assets/images/product/cust2.png";
import Image from "next/image";

const Customization = () => {
  return (
    <section id="customization" className="relative flex py-12 px-[4%] flex-col md:flex-row">
      <TitleComponent title="Customization" styles={"absolute h-fit"} />
      <div className="w-full mt-10 md:mt-32 flex gap-6 w-full flex-col md:flex-row">
        <div className="flex flex-col gap-8 w-full md:w-[55%] text-[16px] md:text-[20px]">
          <p>
            Eclipse supports{" "}
            <span className="text-oranges">fully tailored solutions</span>,
            allowing you to request custom sensors and tool attachments designed
            specifically for your{" "}
            <span className="text-oranges">unique applications</span>. This
            ensures seamless integration into your workflows, maximizing
            efficiency and delivering measurable results.
          </p>
          <p>
            <span className="text-oranges">Contact us today</span> to discuss
            how we can customize the Eclipse to optimize your operations.
          </p>
        </div>
        <div className="relative flex flex-col md:flex-row justify-around items-center w-full md:w-[45%]">
          <Image
            src={Cust1}
            height={500}
            width={500}
            alt="Robot"
            loading="lazy"
            className="w-auto md:w-1/4 md:h-auto h-[300px]"
          />
          <Image
            src={Cust2}
            width={554}
            height={310}
            alt="Robot"
            loading="lazy"
            className="w-auto md:w-1/4 md:h-auto h-[300px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Customization;
