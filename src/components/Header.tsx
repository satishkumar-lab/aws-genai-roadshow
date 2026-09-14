"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV = [
  { href: "#register", id: "register", label: "Registration" },
  { href: "#about", id: "about", label: "About Event" },
  { href: "#agenda", id: "agenda", label: "Agenda" },
  { href: "#audience", id: "audience", label: "Audience" },
] as const;

const SECTION_IDS = NAV.map((item) => item.id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("register");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function updateActive() {
      const headerOffset = 90;
      let current = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top;
        if (top - headerOffset <= 0) {
          current = id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 48;
      if (nearBottom) {
        current = SECTION_IDS[SECTION_IDS.length - 1];
      }

      setActive((prev) => (prev === current ? prev : current));
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onResize() {
      if (window.innerWidth >= 1024) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function handleNavClick(id: string) {
    setActive(id);
    setOpen(false);
  }

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        className={`fixed inset-0 z-[100] bg-white transition-[opacity,visibility] duration-200 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-[100dvh] w-screen max-w-[100vw] flex-col bg-white">
          <div className="flex h-[66px] w-full shrink-0 items-center justify-between border-b border-[#e6ecf1] px-5">
            <a
              href="#register"
              className="shrink-0"
              onClick={() => handleNavClick("register")}
            >
              <img
                src="/assets/logo-header.png?v=2"
                alt="AWS x CloudKeeper"
                width={247}
                height={38}
                className="h-[28px] w-auto max-w-[190px] bg-transparent sm:h-[32px]"
              />
            </a>
            <button
              type="button"
              className="relative inline-flex size-9 items-center justify-center rounded-lg border border-[#e6ecf1]"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span className="relative block size-4">
                <span className="absolute left-0 top-[7px] block h-0.5 w-4 rotate-45 rounded-full bg-black" />
                <span className="absolute left-0 top-[7px] block h-0.5 w-4 -rotate-45 rounded-full bg-black" />
              </span>
            </button>
          </div>

          <nav className="flex min-h-0 w-full flex-1 flex-col gap-1 overflow-y-auto px-5 py-5">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`w-full rounded-xl px-4 py-3.5 text-[17px] font-medium transition-colors duration-200 ${
                  active === item.id
                    ? "bg-[#edf9ff] text-[#17a5fb]"
                    : "text-black"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="w-full shrink-0 border-t border-[#e6ecf1] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a
              href="#register"
              onClick={() => handleNavClick("register")}
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#17a5fb] text-[15px] font-semibold text-white"
            >
              Request to Attend
            </a>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#e6ecf1] bg-white/95 backdrop-blur-[9px]">
        <div className="flex h-[66px] w-full items-center justify-between px-5 md:px-10 xl:px-20">
          <a
            href="#register"
            className="shrink-0"
            onClick={() => handleNavClick("register")}
          >
            <img
              src="/assets/logo-header.png?v=2"
              alt="AWS x CloudKeeper"
              width={247}
              height={38}
              className="h-[28px] w-auto max-w-[190px] bg-transparent sm:h-[32px] sm:max-w-none md:h-[38px]"
            />
          </a>

          <nav className="hidden items-center gap-[30px] lg:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`rounded-full px-[14px] py-2 text-[16px] font-medium transition-colors duration-200 ${
                  active === item.id
                    ? "bg-[#edf9ff] text-[#17a5fb]"
                    : "bg-transparent text-black hover:bg-[#edf9ff]/70"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#register"
              onClick={() => handleNavClick("register")}
              className="hidden h-9 items-center justify-center rounded-lg bg-[#17a5fb] px-[17px] text-[14px] font-semibold text-white hover:bg-[#0f96ea] sm:inline-flex"
            >
              Request to Attend
            </a>
            <button
              type="button"
              className="relative inline-flex size-9 items-center justify-center rounded-lg border border-[#e6ecf1] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">
                {open ? "Close menu" : "Open menu"}
              </span>
              <span className="relative block size-4">
                <span
                  className={`absolute left-0 top-[3px] block h-0.5 w-4 rounded-full bg-black transition-all duration-200 ease-out ${
                    open ? "top-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-0.5 w-4 rounded-full bg-black transition-all duration-200 ease-out ${
                    open ? "scale-x-0 opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[11px] block h-0.5 w-4 rounded-full bg-black transition-all duration-200 ease-out ${
                    open ? "top-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
