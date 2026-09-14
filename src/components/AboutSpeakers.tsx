"use client";

import { motion } from "framer-motion";
import {
  easeOut,
  fadeUp,
  Stagger,
  StaggerItem,
  viewportOnce,
} from "./motion";

const SPEAKERS = [
  {
    name: "Ishaan S.",
    role: "AI Specialist Solution Architect",
    image: "/assets/speaker-ishaan.png",
    company: "aws" as const,
    linkedin: "https://www.linkedin.com/in/ishaansutaria/",
  },
  {
    name: "Aditya Srivastava",
    role: "Solutions Architect",
    image: "/assets/speaker-aditya.png",
    company: "aws" as const,
    linkedin: "https://www.linkedin.com/in/aditya-srivastava-5885b1103/",
  },
  {
    name: "Ayush Agrawal",
    role: "Solution Architect",
    image: "/assets/speaker-ayush.png",
    company: "aws" as const,
    linkedin: "https://www.linkedin.com/in/agrlayush/",
  },
  {
    name: "Satyam Kotyal",
    role: "Associate Director - Sales",
    image: "/assets/speaker-satyam.png",
    company: "ck" as const,
    linkedin: "https://www.linkedin.com/in/satyamkotiyal/",
  },
];

function CompanyLogo({
  company,
  className,
}: {
  company: "aws" | "ck";
  className?: string;
}) {
  if (company === "aws") {
    return (
      <img
        src="/assets/logo-aws-smile.svg"
        alt="AWS"
        width={40}
        height={24}
        className={className ?? "h-6 w-[40px] shrink-0"}
      />
    );
  }
  return (
    <img
      src="/assets/logo-ck-color.svg"
      alt="CloudKeeper"
      width={98}
      height={24}
      className={className ?? "h-6 w-auto shrink-0"}
    />
  );
}

export default function AboutSpeakers() {
  return (
    <section
      id="about"
      className="relative w-full scroll-mt-[66px] overflow-hidden bg-white pb-12 pt-10 md:pb-[100px] md:pt-20"
    >
      <img
        src="/assets/blob-blue.svg"
        alt=""
        width={400}
        height={400}
        className="pointer-events-none absolute -left-[120px] -top-[140px] size-[220px] opacity-40 md:left-[-150px] md:top-[-193px] md:size-[400px] md:opacity-100"
        aria-hidden
      />
      <img
        src="/assets/blob-pink.svg"
        alt=""
        width={354}
        height={354}
        className="pointer-events-none absolute -right-[90px] top-[180px] size-[180px] opacity-35 md:right-[-80px] md:top-[278px] md:size-[354px] md:opacity-100"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full min-w-0 max-w-[1440px] gap-4 px-5 md:gap-8 md:px-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20 xl:px-[100px]">
        <motion.h2
          className="text-[28px] font-bold leading-tight text-[#292929] md:text-[44px] md:leading-[50px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          About the event
        </motion.h2>
        <motion.div
          className="flex min-w-0 flex-col gap-3 md:gap-0"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
        >
          <p className="w-full text-[14px] leading-[1.55] text-black md:text-[16px] md:leading-[27px]">
            A curated half-day technical event for engineering teams in Gurugram
            who are actively building - or planning to build - with Generative AI
            on AWS. This is not a sales pitch or a keynote. It is a working
            session designed around the real challenges of deploying agentic AI
            systems in production.
          </p>
          <div className="my-1 h-px w-full bg-[#e3e7ed] md:my-[18px]" />
          <p className="w-full text-[14px] leading-[1.55] text-black md:text-[16px] md:leading-[25px]">
            Hosted by AWS and CloudKeeper, the day brings together practitioners
            and architects to share battle-tested patterns, live architecture
            walkthroughs, and direct consultation time.
          </p>
          <div className="mt-1 flex items-center gap-4 md:mt-5">
            <img
              src="/assets/logo-aws-smile.svg"
              alt="AWS"
              width={48}
              height={28}
              className="h-6 w-auto opacity-90 md:h-7"
            />
            <span className="h-4 w-px bg-[#e3e7ed]" aria-hidden />
            <img
              src="/assets/logo-ck-color.svg"
              alt="CloudKeeper"
              width={110}
              height={28}
              className="h-5 w-auto opacity-90 md:h-6"
            />
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-10 w-full min-w-0 max-w-[1440px] px-5 md:mt-[60px] md:px-10 xl:px-[100px]">
        <motion.h2
          className="mb-5 text-[28px] font-bold leading-tight text-black md:mb-[30px] md:text-[40px] md:leading-[48px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          Meet the speakers
        </motion.h2>

        {/* Mobile: compact horizontal rows */}
        <Stagger className="flex flex-col gap-3 sm:hidden">
          {SPEAKERS.map((speaker) => (
            <StaggerItem key={speaker.name} className="w-full">
              <article className="group relative flex w-full items-center gap-3.5 overflow-hidden rounded-2xl border border-[#e6ecf1] bg-white p-3.5 shadow-[0px_4px_12px_rgba(14,21,38,0.05)] transition-all duration-300 ease-out active:scale-[0.99]">
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-2.5 top-2.5 z-[1] flex items-center justify-center rounded-[6px] bg-[rgba(23,165,251,0.08)] p-1"
                  aria-label={`${speaker.name} on LinkedIn`}
                >
                  <img
                    src="/assets/ic-linkedin.svg"
                    alt=""
                    width={18}
                    height={17}
                    className="h-[17px] w-[18px]"
                  />
                </a>

                <div className="relative size-[72px] shrink-0 overflow-hidden rounded-full border border-[#e6ecf1] bg-white">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    width={72}
                    height={72}
                    className="size-full object-cover object-center"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 pr-7">
                  <div className="flex w-full flex-col items-start gap-0.5">
                    <h3 className="w-full truncate text-[15px] font-bold leading-snug text-[#0e1526]">
                      {speaker.name}
                    </h3>
                    <p className="w-full text-left text-[12px] leading-[1.35] text-[#5b6478]">
                      {speaker.role}
                    </p>
                  </div>
                  <CompanyLogo
                    company={speaker.company}
                    className={
                      speaker.company === "aws"
                        ? "mt-0.5 block h-5 w-[34px] shrink-0 self-start"
                        : "mt-0.5 block h-[18px] w-auto shrink-0 self-start"
                    }
                  />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* sm+: original vertical cards */}
        <Stagger className="hidden grid-cols-1 items-start gap-6 sm:grid sm:grid-cols-2 xl:grid-cols-4">
          {SPEAKERS.map((speaker) => (
            <StaggerItem key={speaker.name} className="w-full">
              <article className="group relative mx-auto w-full max-w-[292px] rounded-[20px] bg-[#e6ecf1] p-px shadow-[0px_4px_12px_rgba(14,21,38,0.06)] transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-gradient-to-br hover:from-[#17a5fb] hover:to-[#ed0082] hover:shadow-[0px_14px_28px_rgba(14,21,38,0.12)] xl:mx-0 xl:max-w-none">
                <div className="relative flex h-[300px] w-full flex-col items-center gap-5 rounded-[19px] bg-white p-8">
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-[9px] top-[9px] z-[1] flex items-center justify-center rounded-[6px] bg-[rgba(23,165,251,0.08)] p-1"
                    aria-label={`${speaker.name} on LinkedIn`}
                  >
                    <img
                      src="/assets/ic-linkedin.svg"
                      alt=""
                      width={23}
                      height={22}
                      className="h-[22px] w-[23px]"
                    />
                  </a>

                  <div className="relative size-[120px] shrink-0 overflow-hidden rounded-full border-[1.3px] border-[#e6ecf1] bg-white transition-[border-width,border-color,background] duration-300 group-hover:border-2 group-hover:border-[#80cfff] group-hover:bg-gradient-to-r group-hover:from-[#e2f0ff] group-hover:to-[#ffe9f5]">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      width={120}
                      height={120}
                      className="size-full object-cover object-center"
                    />
                  </div>

                  <div className="flex w-full shrink-0 flex-col items-center gap-2 text-center">
                    <h3 className="text-[17px] font-bold leading-normal text-[#0e1526]">
                      {speaker.name}
                    </h3>
                    <p className="text-[13px] leading-normal text-[#5b6478]">
                      {speaker.role}
                    </p>
                  </div>

                  <CompanyLogo company={speaker.company} />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
