'use client'
import React, { useState } from "react";
import TitleComponent from "../../ui/TitleComponent";

const faqData = [
  {
    question: "What is Eclipse Remote Systems?",
    answer: "Eclipse Remote Systems is an advanced telerobotic platform designed to perform complex operations in hazardous environments. Using augmented reality (AR) control, bio-inverse kinematics, and gesture-based technology, it offers operators superior precision, situational awareness, and safety while performing tasks from a remote location."
  },
  {
    question: "What industries can benefit from Eclipse Remote Systems?",
    answer: "Eclipse Remote Systems is designed for a wide range of industries that require safe, efficient operations in high-risk environments, including: Infrastructure and Construction, Utilities and Energy (Electricity, Water, Oil & Gas), Telecommunications, Environmental Monitoring and Regulation, Mining and Geology, Military and Defense, Transportation, Disaster Management, Manufacturing, and Hazardous Waste Management. These industries benefit from Eclipse's ability to handle dangerous tasks without compromising safety or efficiency."
  },
  {
    question: "How does Eclipse Remote Systems enhance safety?",
    answer: "Eclipse Remote Systems significantly enhances safety by enabling operators to work remotely, far from hazardous environments. The immersive augmented reality (AR) control system provides real-time audio and visual streams along with essential data, giving operators a precise understanding of the environment and live feedback to react quickly to potential threats."
  },
  {
    question: "What kinds of tasks can Eclipse Remote Systems perform?",
    answer: "Eclipse Remote Systems is highly versatile and can perform a variety of complex tasks, including but not limited to: Maintenance and repair operations, Structural and equipment inspections, Hazardous material handling, Bomb disposal, Emergency response tasks, Infrastructure monitoring and assessments, and Precision cutting, manipulation, and assembly. This adaptability makes it suitable for both routine maintenance and high-risk interventions."
  },
  {
    question: "How does the augmented reality (AR) control system work?",
    answer: "The AR control system provides operators with real-time audio and visual streams from the robot's surroundings, allowing them to control the system with precision. This detailed feed, combined with critical data overlays, ensures that operators can navigate and manipulate the environment safely, even in challenging conditions."
  },
  {
    question: "Can Eclipse Remote Systems be customized for different applications?",
    answer: "Yes, Eclipse Remote Systems offers a range of modular tool attachments that can be tailored to specific operational needs. Available attachments include: Metal detectors for identifying buried hazards or objects, Precision grippers for delicate handling, Bionic hands for detailed manipulation, and Cutting discs for slicing through materials. These modular tools enable the system to adapt to a wide variety of industrial, regulatory, and operational challenges."
  },
  {
    question: "What is the range of operation for Eclipse Remote Systems?",
    answer: "Eclipse Remote Systems has a range of 1.5 kilometers and can operate continuously for up to 90 minutes. Its robust mesh network technology allows for seamless communication even in environments without a direct line of sight, ensuring reliable performance across large or obstructed areas."
  },
  {
    question: "What are the key technologies integrated into Eclipse Remote Systems?",
    answer: "Eclipse Remote Systems incorporates several advanced technologies, including: Augmented Reality (AR) control for immersive, precise operation, Bio-inverse kinematics for smooth, responsive control of the system, Gesture-based control and depth perception for natural, intuitive handling of complex tasks, and Mesh network technology to maintain strong communication and operational reliability across vast areas. These technologies work together to deliver exceptional performance, safety, and control in high-risk environments."
  },
  {
    question: "How does Eclipse Remote Systems improve operational efficiency?",
    answer: "Eclipse Remote Systems enhances efficiency by allowing operators to complete tasks remotely, minimizing the risk to human personnel. The AR interface overlays real-time data directly onto the operator's view, while built-in AI analyzes sensor inputs, camera feeds, and environmental data. If a hazard is detected, it is flagged instantly on the AR display, enabling the operator to take immediate action. By removing people from dangerous environments, the likelihood of accidents is greatly reduced, preventing unexpected delays due to safety concerns. This allows work to continue without interruption, improving overall productivity and reducing operational downtime."
  },
  {
    question: "How can I schedule a demo or learn more about Eclipse Remote Systems?",
    answer: "To learn more about Eclipse Remote Systems, schedule a demo, or explore potential collaboration opportunities, please contact us via our contact form or WhatsApp. We're ready to discuss how our technology can enhance your operations."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative flex">
      <div className="left-container">
        <TitleComponent
          title="F.A.Q's"
          styles={"absolute"}
        />
      </div>
      <div className="center-container">
        <div className="flex items-center justify-center">
          <div className="w-1/2 pr-8 border-r border-[#353539]" />
          <div className="w-1/2 text-xs md:text-xl font-medium font-['VioletSans'] text-[#A5A5A5] center-container-right-block px-1 md:px-6 py-6 md:py-14 text-right justify-end">
            Can't find an answer to your question?
            <br />
            Feel free to &nbsp;
            <br className="md:hidden"/>
            <span
              className="cursor-pointer underline"
              onClick={scrollToContact}
            >
              contact us.
            </span>
          </div>
        </div>
        {faqData.map((faq, index) => (
          <div key={index} className="QnA-block">
            <p
              className="question flex items-center justify-between"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className={`transform transition-transform duration-250 opacity-50 hover:opacity-100 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
              >
                <path
                  d="M27.3281 14.2188C27.3281 14.5171 27.2096 14.8033 26.9986 15.0142C26.7876 15.2252 26.5015 15.3438 26.2031 15.3438H14.9531V26.5938C14.9531 26.8921 14.8346 27.1783 14.6236 27.3892C14.4126 27.6002 14.1265 27.7188 13.8281 27.7188C13.5298 27.7188 13.2436 27.6002 13.0326 27.3892C12.8217 27.1783 12.7031 26.8921 12.7031 26.5938V15.3438H1.45312C1.15476 15.3438 0.868609 15.2252 0.65763 15.0142C0.446652 14.8033 0.328125 14.5171 0.328125 14.2188C0.328125 13.9204 0.446652 13.6342 0.65763 13.4233C0.868609 13.2123 1.15476 13.0938 1.45312 13.0938H12.7031V1.84375C12.7031 1.54538 12.8217 1.25923 13.0326 1.04826C13.2436 0.837277 13.5298 0.71875 13.8281 0.71875C14.1265 0.71875 14.4126 0.837277 14.6236 1.04826C14.8346 1.25923 14.9531 1.54538 14.9531 1.84375V13.0938H26.2031C26.5015 13.0938 26.7876 13.2123 26.9986 13.4233C27.2096 13.6342 27.3281 13.9204 27.3281 14.2188Z"
                  fill="#FC8500"
                />
              </svg>
            </p>
            <div
              className={`answer overflow-hidden transition-all duration-250 ease-in-out ${
                openIndex === index
                  ? "max-h-96 opacity-100 pt-4 md:pt-10 px-2 md:px-4"
                  : "max-h-0 opacity-0 pt-0"
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="right-container" />
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
}
