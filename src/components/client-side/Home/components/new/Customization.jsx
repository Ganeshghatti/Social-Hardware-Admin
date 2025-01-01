import React from "react";
import TitleComponent from "@/components/client-side/ui/TitleComponent";
import Cust1 from "../../../../../../public/client/assets/images/new/cust1.png";
import Cust2 from "../../../../../../public/client/assets/images/new/cust2.png";
import Image from "next/image";

const Customization = () => {
  return (
    <section id="customization" className="relative flex">
      <TitleComponent title="Customization" styles={"absolute h-fit"} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 z-10 mt-40 px-20">
        <div className="flex flex-col gap-8">
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
        <div className="relative overflow-hidden">
          <Image
            src={Cust1}
            height={500}
            width={500}
            alt="Robot"
            loading="lazy"
            className="max-w-[416px] w-full h-[464px] -mt-28 object-cover z-10"
          />
          <Image
            src={Cust2}
            width={554}
            height={310}
            alt="Robot"
            loading="lazy"
            className="max-w-[554px] w-full h-[310px] object-cover absolute left-36 -top-6 z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Customization;
