"use client";

import { motion } from "framer-motion";
import {
  easeOut,
  fadeUp,
  Stagger,
  StaggerItem,
  viewportOnce,
} from "./motion";

const SESSIONS = [
  {
    kicker: "SESSION 1",
    duration: "60 min",
    tone: "yellow" as const,
    title: "Using LLMs to Develop Software: SDLC in the Agentic Era",
    body: "An advanced, practitioner-level session - not an intro to prompting. Agentic coding workflows, AI-native CI/CD patterns, and how top startups are compressing ship cycles with LLM-driven development end-to-end.",
  },
  {
    kicker: "SESSION 2",
    duration: "90 min",
    tone: "yellow" as const,
    title: "Build and Deploy AI Agents at Scale",
    body: "Architecture and operations for production agents - multi-agent orchestration, guardrails, observability, and failure handling patterns that make agentic systems reliable enough to trust.",
  },
  {
    kicker: "Networking",
    duration: "Break",
    tone: "green" as const,
    title: "Lunch & 1:1 consultation slots",
    body: "Connect with peers solving the same scaling and AI-adoption challenges, and bring your architecture questions for direct, personalized guidance from AWS specialists.",
  },
];

export default function Agenda() {
  return (
    <section
      id="agenda"
      className="relative scroll-mt-[66px] overflow-hidden bg-[#0b1730] py-10 md:py-20"
      style={{
        backgroundImage: [
          "linear-gradient(90deg, rgb(10, 37, 83) 0%, rgb(10, 37, 83) 100%)",
          "radial-gradient(ellipse 480px 396px at 92% 0%, rgba(60,122,189,0.22) 0%, rgba(60,122,189,0) 55%)",
          "radial-gradient(ellipse 420px 347px at 18% 100%, rgba(237,0,130,0.12) 0%, rgba(237,0,130,0) 55%)",
          "linear-gradient(90deg, rgb(11, 23, 48) 0%, rgb(11, 23, 48) 100%)",
        ].join(", "),
      }}
    >
      <div
        className="pointer-events-none absolute -left-10 -top-[150px] size-[380px] rounded-[200px] md:size-[532px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,149,255,0.23) 0%, rgba(0,102,255,0) 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[190px] -right-[50px] size-[420px] rounded-[200px] md:size-[600px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,149,255,0.23) 0%, rgba(0,102,255,0) 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-387px] right-[-432px] hidden h-[714px] w-[944px] items-center justify-center md:flex"
        aria-hidden
      >
        <div className="-rotate-[154.04deg]">
          <img
            src="/assets/agenda-network.svg"
            alt=""
            width={869}
            height={372}
            className="h-[372px] w-[869px] max-w-none"
          />
        </div>
      </div>
      <img
        src="/assets/agenda-flourish.svg"
        alt=""
        width={109}
        height={116}
        className="pointer-events-none absolute right-0 top-0 hidden h-[90px] w-[84px] md:block md:h-[116px] md:w-[109px]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-6 px-5 md:gap-16 md:px-10 xl:px-[100px]">
        <motion.div
          className="flex flex-col items-start justify-between gap-1.5 md:flex-row md:items-end md:gap-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <h2 className="text-[28px] font-bold leading-tight tracking-[-1px] text-[#f6f4ee] md:text-[40px] md:leading-[48px]">
            What you&apos;ll explore
          </h2>
          <p className="text-[13px] text-white/80 md:text-[15px] md:text-white">
            Three sessions · Half day
          </p>
        </motion.div>

        <Stagger className="flex flex-col gap-3 md:gap-0">
          {SESSIONS.map((session, index) => {
            const isGreen = session.tone === "green";
            const accent = isGreen ? "#00c389" : "#fff4e0";
            const wash = isGreen
              ? "linear-gradient(90deg, rgba(0,195,137,0.08) 0%, transparent 55%)"
              : "linear-gradient(90deg, rgba(23,165,251,0.09) 0%, transparent 55%)";
            const dotGlowClass = isGreen
              ? "group-hover:shadow-[0_0_12px_rgba(0,195,137,0.5)]"
              : "group-hover:shadow-[0_0_12px_rgba(255,244,224,0.55)]";

            return (
              <StaggerItem key={session.title}>
                <article
                  className={`group relative flex cursor-default flex-col gap-2.5 rounded-xl border border-[rgba(246,244,238,0.08)] bg-white/[0.03] p-4 pl-[13px] transition-[background-color,border-color] duration-300 ease-out md:gap-4 md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-[rgba(246,244,238,0.05)] md:bg-transparent md:px-0 md:py-10 md:pl-[13px] md:flex-row md:gap-12 ${
                    index === SESSIONS.length - 1 ? "md:border-b" : ""
                  } hover:border-[rgba(246,244,238,0.14)] hover:bg-[rgba(255,255,255,0.04)] md:hover:border-[rgba(246,244,238,0.12)] md:hover:bg-[rgba(255,255,255,0.025)]`}
                >
                  <span
                    className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top scale-y-100 rounded-l-xl opacity-100 md:scale-y-0 md:rounded-none md:opacity-0 md:transition-all md:duration-300 md:ease-out md:group-hover:scale-y-100 md:group-hover:opacity-100"
                    style={{ backgroundColor: accent }}
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                    style={{ background: wash }}
                    aria-hidden
                  />

                  <div className="relative z-[1] flex w-auto shrink-0 flex-row items-center gap-3 transition-transform duration-300 ease-out group-hover:translate-x-1 md:w-[160px] md:flex-col md:items-start md:gap-2.5 md:group-hover:translate-x-1.5">
                    <p className="text-[12px] tracking-[1px] md:text-[14px]" style={{ color: accent }}>
                      {session.kicker}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-1.5 rounded-[4px] transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-[1.35] md:size-2 ${dotGlowClass}`}
                        style={{ backgroundColor: accent }}
                      />
                      <p className="text-[12px] md:text-[14px]" style={{ color: accent }}>
                        {session.duration}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-[1] flex min-w-0 flex-1 flex-col gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 md:gap-3 md:group-hover:translate-x-1">
                    <h3 className="text-[17px] font-medium leading-snug tracking-[-0.3px] text-[#f6f4ee] transition-colors duration-300 group-hover:text-white md:text-[24px] md:leading-8">
                      {session.title}
                    </h3>
                    <p className="text-[13px] leading-[1.5] text-[#8695af] transition-colors duration-300 group-hover:text-[#b7c4db] md:text-[16px] md:leading-[1.6]">
                      {session.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
