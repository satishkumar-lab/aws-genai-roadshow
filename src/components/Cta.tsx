"use client";

import { useEffect, useRef, useState } from "react";

export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shimmerKey, setShimmerKey] = useState(0);
  const [shimmering, setShimmering] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let wasIntersecting = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasIntersecting) {
          setShimmerKey((key) => key + 1);
          setShimmering(true);
        }
        wasIntersecting = entry.isIntersecting;
      },
      { threshold: 0.45 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#0a2553] px-5 py-[60px] text-center md:py-[72px]"
    >
      {/* Layered atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 540px 270px at 8% 12%, rgba(23,165,251,0.2), transparent 58%)",
            "radial-gradient(ellipse 480px 230px at 92% 0%, rgba(60,122,189,0.28), transparent 55%)",
            "radial-gradient(ellipse 420px 200px at 18% 100%, rgba(237,0,130,0.14), transparent 55%)",
            "radial-gradient(ellipse 70% 80% at 50% 55%, rgba(17,40,90,0.35), transparent 70%)",
          ].join(", "),
        }}
        aria-hidden
      />

      {/* Soft vignette so edges feel cinematic */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(5,14,36,0.55) 100%)",
        }}
        aria-hidden
      />

      {/* Center pink / magenta glow */}
      <img
        src="/assets/cta-glow.svg"
        alt=""
        width={700}
        height={700}
        className="cta-glow-pulse pointer-events-none absolute left-[calc(50%+50px)] top-[calc(50%+50px)] hidden size-[520px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70 md:block lg:size-[700px]"
        aria-hidden
      />
      {/* Center blue glow */}
      <img
        src="/assets/cta-glow-blue.svg"
        alt=""
        width={500}
        height={500}
        className="cta-glow-pulse-delayed pointer-events-none absolute left-[calc(50%-200px)] top-[calc(50%+80px)] hidden size-[380px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80 md:block lg:size-[500px]"
        aria-hidden
      />

      {/* Neural network graphic — left (Figma Layer_1, rotated) */}
      <div
        className="cta-network-drift pointer-events-none absolute left-[-84px] top-[-24px] hidden h-[673px] w-[701px] items-center justify-center md:flex"
        aria-hidden
      >
        <div className="-rotate-[137.91deg]">
          <img
            src="/assets/cta-network.svg"
            alt=""
            width={681}
            height={291}
            className="h-[291px] w-[681px] max-w-none opacity-90"
          />
        </div>
      </div>

      {/* Extra soft blue orb — left, for depth without the noisy PNG */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 hidden size-[320px] rounded-full blur-3xl md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(23,165,251,0.22) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Orange AWS-style flourish — bottom right, nudged 20px down */}
      <img
        src="/assets/cta-corner.svg"
        alt=""
        width={142}
        height={134}
        className="pointer-events-none absolute -bottom-[50px] -right-[24px] hidden h-[120px] w-[128px] sm:block md:h-[148px] md:w-[156px]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[720px] flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-[25px]">
          <div className="flex flex-col items-center gap-2 md:gap-2.5">
            <div className="flex flex-col items-center gap-[11px]">
              <img
                src="/assets/logo-aws-white.png"
                alt="AWS"
                width={89}
                height={53}
                className="h-[53px] w-[89px]"
              />
              <p className="text-[32px] font-medium text-white md:text-[56px]">
                GenAI Roadshow
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-x-3 gap-y-2 sm:flex-row">
              <p className="text-[20px] text-white md:text-[26px]">
                In collaboration with
              </p>
              <img
                src="/assets/logo-ck-white.png"
                alt="CloudKeeper"
                width={168}
                height={37}
                className="h-[32px] w-auto md:h-[36px]"
              />
            </div>
          </div>
          <div className="w-full border-y border-[#414678] px-2 py-1.5">
            <p
              key={shimmerKey || "idle"}
              className={`w-full text-center text-[14px] leading-[26px] md:text-[16px] ${
                shimmering ? "cta-tagline-shimmer" : "text-white"
              }`}
              onAnimationEnd={() => setShimmering(false)}
            >
              Limited seats. Built for technical teams who are building AI in
              production on AWS.
            </p>
          </div>
        </div>

        <a
          href="#register"
          className="group/cta inline-flex h-[46px] w-[211px] items-center justify-center gap-2 rounded-lg bg-[#17a5fb] px-5 text-[16px] font-semibold text-white shadow-none transition-[background-color,box-shadow] duration-200 hover:bg-[#0f96ea] hover:shadow-[0_10px_28px_rgba(23,165,251,0.35)]"
        >
          Apply to Attend
          <span className="relative size-[16.67px] shrink-0 overflow-visible">
            <img
              src="/assets/ic-arrow.svg"
              alt=""
              width={17}
              height={17}
              className="size-[16.67px] transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
