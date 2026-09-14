"use client";

import { motion } from "framer-motion";
import RegistrationForm from "./RegistrationForm";
import {
  easeOut,
  fadeUp,
  ScaleIn,
  Stagger,
  StaggerItem,
  viewportOnce,
} from "./motion";

const INFO = [
  {
    icon: "/assets/ic-calendar.svg",
    label: "Date & Time",
    value: "Sept 30th, 10AM - 2:30 PM",
  },
  {
    icon: "/assets/ic-map-pin.svg",
    label: "Venue",
    value: "JW Marriott Mumbai Sahar",
  },
  {
    icon: "/assets/ic-layers.svg",
    label: "Level",
    value: "200 - Intermediate",
  },
  {
    icon: "/assets/ic-globe.svg",
    label: "Language",
    value: "English",
  },
];

export default function Hero() {
  return (
    <section
      id="register"
      className="relative isolate scroll-mt-[66px] overflow-hidden bg-[#0a2553]"
    >
      <img
        src="/assets/hero-abstract.svg"
        alt=""
        width={239}
        height={127}
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[90px] w-[170px] xl:h-[127px] xl:w-[239px]"
      />
      <div
        className="pointer-events-none absolute right-[-90px] top-[-100px] z-0 size-[420px] rounded-full opacity-90 xl:size-[600px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200,0,232,0.32) 0%, rgba(200,0,232,0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-[444px] top-[366px] z-0 hidden size-[532px] rounded-full xl:block"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,149,255,0.16) 0%, rgba(0,102,255,0) 70%)",
        }}
      />
      <img
        src="/assets/hero-corner.svg"
        alt=""
        width={115}
        height={157}
        className="pointer-events-none absolute -right-[21px] bottom-0 z-[1] hidden h-[157px] w-[115px] xl:block"
      />
      <div className="pointer-events-none absolute bottom-0 left-[-40px] z-[1] h-[120px] w-[min(720px,70%)] opacity-50">
        <img
          src="/assets/hero-skyline.svg"
          alt=""
          width={720}
          height={120}
          className="h-full w-full object-contain object-left"
        />
      </div>

      <div className="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-5 py-10 md:px-10 md:py-14 xl:flex-row xl:gap-[90px] xl:px-20 xl:py-20">
        <div className="relative mx-auto w-full max-w-[666px] xl:mx-0 xl:-ml-5 xl:h-[666px] xl:w-[666px] xl:shrink-0">
          <motion.div
            className="agentic-day mb-8 flex items-center justify-center gap-2.5 xl:absolute xl:left-[179px] xl:top-[25px] xl:mb-0 xl:w-[314px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <img
              src="/assets/chip-line-left.svg"
              alt=""
              width={65}
              height={3}
              className="h-[3px] w-[48px] md:w-[65px]"
            />
            <div className="relative">
              <p className="agentic-day-text font-[family-name:var(--font-bitter)] text-[14px] font-medium tracking-[2px] md:text-[18px]">
                AGENTIC DAY
              </p>
            </div>
            <img
              src="/assets/chip-line-right.svg"
              alt=""
              width={65}
              height={3}
              className="h-[3px] w-[48px] md:w-[65px]"
            />
          </motion.div>

          <motion.div
            className="mx-auto flex w-full max-w-[448px] flex-col items-center gap-[30px] xl:absolute xl:left-[112px] xl:top-[94px] xl:mx-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
          >
            <div className="flex w-full flex-col items-center gap-[11px]">
              <img
                src="/assets/logo-aws-white.svg"
                alt="AWS"
                width={89}
                height={53}
                className="h-[53px] w-[89px]"
              />
              <h1 className="w-full text-center text-[32px] font-medium leading-none text-white sm:text-[36px] md:text-[56px]">
                GenAI Roadshow
              </h1>
            </div>
            <div className="flex h-auto w-full flex-col items-center justify-center gap-2 whitespace-nowrap sm:h-[37px] sm:flex-row sm:gap-3">
              <p className="text-[16px] leading-none text-white sm:text-[18px] md:text-[26px]">
                In collaboration with
              </p>
              <img
                src="/assets/logo-ck-white.svg"
                alt="CloudKeeper"
                width={168}
                height={37}
                className="h-[30px] w-auto sm:h-[37px] sm:w-[168px]"
              />
            </div>
          </motion.div>

          <div className="mx-auto mt-8 w-full max-w-[596px] xl:absolute xl:left-[38px] xl:top-[324px] xl:mx-0 xl:mt-0 xl:w-[596px]">
            <Stagger className="grid h-auto grid-cols-2 overflow-hidden border-y border-[#2b426a] sm:h-[158px] sm:grid-rows-2">
              {INFO.map((item, index) => (
                <StaggerItem
                  key={item.label}
                  className={`group/info relative flex min-h-[72px] cursor-default flex-col items-start justify-center gap-1.5 px-3 py-3 transition-colors duration-300 ease-out hover:bg-[rgba(23,165,251,0.1)] sm:min-h-0 sm:gap-[11px] sm:px-[30px] sm:py-0 ${
                    index < 2 ? "border-b border-[#2b426a]" : ""
                  } ${index % 2 === 0 ? "border-r border-[#2b426a]" : ""}`}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/info:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(23,165,251,0.18) 0%, rgba(23,165,251,0) 70%)",
                    }}
                    aria-hidden
                  />
                  <div className="relative flex items-center gap-1.5 sm:gap-2">
                    <img
                      src={item.icon}
                      alt=""
                      width={16}
                      height={16}
                      className="size-3.5 shrink-0 transition-transform duration-300 ease-out group-hover/info:scale-110 sm:size-4"
                    />
                    <span className="text-[12px] leading-none text-[#8695af] transition-colors duration-300 group-hover/info:text-[#b8c7e0] sm:text-[16px]">
                      {item.label}
                    </span>
                  </div>
                  <p className="relative text-[13px] font-medium leading-snug text-white transition-transform duration-300 ease-out group-hover/info:translate-x-0.5 sm:text-[16px] sm:leading-none md:text-[18px]">
                    {item.value}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            <motion.p
              className="mt-6 max-w-[596px] text-center text-[15px] leading-[1.55] text-white sm:mt-[38px] sm:text-left sm:text-[16px] sm:leading-[1.7] md:text-[20px]"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.28 }}
            >
              A hands-on GenAI workshop for technical founders & engineering
              teams taking AI to production.
            </motion.p>
          </div>

          <img
            src="/assets/hero-dot-1.svg"
            alt=""
            width={14}
            height={14}
            className="pointer-events-none absolute left-[503px] top-[89px] hidden size-[14px] xl:block"
          />
          <img
            src="/assets/hero-dot-2.svg"
            alt=""
            width={14}
            height={14}
            className="pointer-events-none absolute left-[306px] top-[683px] hidden size-[14px] xl:block"
          />
        </div>

        <ScaleIn className="mx-auto w-full max-w-[554px] xl:mx-0" delay={0.15}>
          <RegistrationForm />
        </ScaleIn>
      </div>
    </section>
  );
}
