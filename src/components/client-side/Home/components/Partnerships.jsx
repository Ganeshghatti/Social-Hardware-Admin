
import React from "react";
import TitleComponent from "../../ui/TitleComponent";

export default function Partnerships() {
  return (
    <section id="partnerships" className="relative flex">
      <div className="left-container">
        <TitleComponent
          title="Partnership"
          styles={"absolute "}
        />
      </div>
      <div className="center-container">
        <h2 className="flex items-center justify-center standard-title pb-[25px] md:pb-[75px] py-[75px]">
        Why Collaborate With Us?
        </h2>
        <table>
          <tr>
            <td className="table-title">Workplace Safety</td>
            <td className="table-content">
              Prioritizing safety is both a moral duty and a smart business
              decision. A safe workforce is more engaged and productive,
              reducing disruptions and improving performance.
            </td>
          </tr>
          <tr>
            <td className="table-title">Operational Efficiency</td>
            <td className="table-content">
              Providing workers with remote operation capabilities and real-time
              data analysis leads to faster decision-making, reduced errors, and
              improved overall efficiency in critical tasks.
            </td>
          </tr>
          <tr>
            <td className="table-title">Regulatory Complaince</td>
            <td className="table-content">
              Real-time video, AI hazard detection, and sensor data allow
              operators to remotely inspect and quickly identify risks,
              preventing accidents. Data storage ensures compliance for audits
              and reports.
            </td>
          </tr>
        </table>
        <div className="cta flex flex-col gap-4">
          <p className="cta-text">
          Get in touch below to explore collaboration opportunities and our tailored system development solutions.
          </p>
          {/* <ButtonComponentv2 text="Contact Us" link="/#contact" styles="w-fit" /> */}
        </div>
      </div>
      <div className="right-container" />
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
}
