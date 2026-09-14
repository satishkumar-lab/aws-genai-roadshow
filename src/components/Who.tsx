"use client";

import { motion } from "framer-motion";
import {
  easeOut,
  fadeUp,
  ScaleIn,
  Stagger,
  StaggerItem,
  viewportOnce,
} from "./motion";

const CARDS = [
  {
    title: "Technical Leaders",
    body: "CTOs, VPs of Engineering and infrastructure leads driving the move to AI-native stack.",
    iconBg: "#e7f6ff",
    icon: "/assets/ic-users.svg",
    iconSize: "size-[21px]",
    hoverBorder: "hover:border-[#17a5fb]/40",
    hoverGlow: "group-hover:shadow-[0px_16px_32px_rgba(23,165,251,0.14)]",
  },
  {
    title: "Engineers & Builders",
    body: "Developers evaluating, building, or scaling GenAI capabilities in production.",
    iconBg: "#ffecf6",
    icon: "/assets/ic-terminal.svg",
    iconSize: "h-6 w-[26px]",
    hoverBorder: "hover:border-[#e80584]/35",
    hoverGlow: "group-hover:shadow-[0px_16px_32px_rgba(232,5,132,0.14)]",
  },
  {
    title: "Heads of Engineering",
    body: "Drive team strategy; learn how to evaluate AI platforms and tools in practice.",
    iconBg: "rgba(62,207,158,0.1)",
    icon: "/assets/ic-layers-who.svg",
    iconSize: "size-[22px]",
    hoverBorder: "hover:border-[#00c389]/40",
    hoverGlow: "group-hover:shadow-[0px_16px_32px_rgba(0,195,137,0.14)]",
  },
  {
    title: "Engineers in the Stack",
    body: "Bring your curiosity. Walk away with patterns you can implement the next day.",
    iconBg: "rgba(154,75,255,0.1)",
    icon: "/assets/ic-bulb.svg",
    iconSize: "size-[25px]",
    hoverBorder: "hover:border-[#9a4bff]/40",
    hoverGlow: "group-hover:shadow-[0px_16px_32px_rgba(154,75,255,0.14)]",
  },
];

export default function Who() {
  return (
    <section
      id="audience"
      className="scroll-mt-[66px] overflow-x-hidden bg-[#fafaf8] py-10 md:py-[90px]"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-7 px-5 md:gap-12 md:px-10 xl:px-[80px]">
        <motion.div
          className="flex flex-col gap-2 md:gap-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <h2 className="text-[28px] font-bold text-[#0e1526] md:text-[40px]">
            Who should attend
          </h2>
          <p className="max-w-full text-[14px] leading-[22px] text-black md:text-[18px] md:leading-[26px]">
            Come as a working team if you can - the person who decides, and the
            people who will build it.
          </p>
        </motion.div>

        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {CARDS.map((card) => (
            <StaggerItem key={card.title} className="h-full">
              <article
                className={`group relative flex min-h-0 min-w-0 cursor-default flex-row items-start gap-3.5 overflow-hidden rounded-2xl border border-[#e6ecf1] bg-white p-4 shadow-[0px_4px_10px_rgba(14,21,38,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 sm:min-h-[215px] sm:flex-col sm:gap-4 sm:p-6 sm:hover:-translate-y-2 md:p-8 ${card.hoverBorder} ${card.hoverGlow}`}
              >
                <div
                  className="relative flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-4deg] sm:size-11"
                  style={{ backgroundColor: card.iconBg }}
                >
                  <img src={card.icon} alt="" className={card.iconSize} />
                </div>
                <div className="relative flex min-w-0 flex-1 flex-col gap-1 sm:gap-2">
                  <h3 className="text-[16px] font-medium text-black transition-colors duration-300 sm:text-[20px]">
                    {card.title}
                  </h3>
                  <p className="text-[13px] leading-[1.45] text-black/90 transition-colors duration-300 group-hover:text-black sm:text-[14px] sm:leading-[1.5]">
                    {card.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <ScaleIn delay={0.08}>
          <div className="flex min-w-0 flex-col items-start justify-center gap-4 overflow-hidden rounded-tl-[4px] rounded-tr-xl rounded-br-xl rounded-bl-[4px] border-l-[3px] border-l-[#17a5fb] border-r-[3px] border-r-[#e80584] bg-white px-4 py-5 shadow-[0px_4px_7px_rgba(14,21,38,0.02)] sm:items-center sm:gap-6 sm:px-6 sm:py-8 md:flex-row md:gap-9 md:px-8 md:py-8">
            <div className="flex items-center gap-2.5 sm:gap-[13px]">
              <img
                src="/assets/ic-tick.svg"
                alt=""
                width={28}
                height={28}
                className="size-6 sm:size-7"
              />
              <p className="text-[17px] font-semibold text-[#0e1526] sm:text-[20px] md:text-[24px]">
                Prerequisites:
              </p>
            </div>
            <div className="flex min-w-0 flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:gap-[50px]">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#edf9ff] text-[11px] font-medium text-[#17a5fb] opacity-90 sm:size-7 sm:text-[12px]">
                  01
                </span>
                <p className="min-w-0 flex-1 text-[14px] text-[#0e1526] sm:text-[16px] md:text-[18px]">
                  AWS Builder ID (free, can be created at sign-up)
                </p>
              </div>
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#ffecf0] text-[11px] font-medium text-[#e80584] opacity-90 sm:size-7 sm:text-[12px]">
                  02
                </span>
                <p className="min-w-0 flex-1 text-[14px] text-[#0e1526] sm:text-[16px] md:text-[18px]">
                  Laptop with a browser access
                </p>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
