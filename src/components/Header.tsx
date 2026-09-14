"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const NAV = [
  { href: "#register", id: "register", label: "Registration" },
  { href: "#about", id: "about", label: "About Event" },
  { href: "#agenda", id: "agenda", label: "Agenda" },
  { href: "#audience", id: "audience", label: "Audience" },
] as const;

const SECTION_IDS = NAV.map((item) => item.id);

const iconSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.7,
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-4" aria-hidden>
      <motion.span
        className="absolute left-0 block h-[2px] w-4 origin-center rounded-full bg-black"
        initial={false}
        animate={
          open
            ? { top: 7, rotate: 45, width: 16 }
            : { top: 2, rotate: 0, width: 16 }
        }
        transition={iconSpring}
      />
      <motion.span
        className="absolute left-0 top-[7px] block h-[2px] w-4 origin-center rounded-full bg-black"
        initial={false}
        animate={
          open
            ? { opacity: 0, scaleX: 0.2 }
            : { opacity: 1, scaleX: 1 }
        }
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-0 block h-[2px] w-4 origin-center rounded-full bg-black"
        initial={false}
        animate={
          open
            ? { top: 7, rotate: -45, width: 16 }
            : { top: 12, rotate: 0, width: 16 }
        }
        transition={iconSpring}
      />
    </span>
  );
}

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
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[200] flex flex-col bg-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Top bar */}
            <div className="relative z-[1] flex h-[66px] w-full shrink-0 items-center justify-between border-b border-[#e6ecf1] bg-white px-5">
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
              <motion.button
                type="button"
                className="relative inline-flex size-10 items-center justify-center rounded-full border border-[#e6ecf1] bg-[#f8fafc]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <MenuIcon open />
              </motion.button>
            </div>

            {/* Links */}
            <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-6">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,_rgba(23,165,251,0.07),_transparent_70%)]"
                aria-hidden
              />

              <p className="relative mb-5 px-1 text-[12px] font-medium uppercase tracking-[1.4px] text-[#8695af]">
                Menu
              </p>

              <motion.nav
                className="relative flex w-full flex-col gap-2"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                  },
                }}
              >
                {NAV.map((item, index) => {
                  const isActive = active === item.id;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => handleNavClick(item.id)}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`group flex w-full items-center gap-3.5 rounded-2xl border px-4 py-4 transition-colors duration-200 ${
                        isActive
                          ? "border-[#cfeeff] bg-[#edf9ff] shadow-[0_6px_18px_rgba(23,165,251,0.08)]"
                          : "border-transparent bg-[#f7f9fb] active:border-[#e6ecf1] active:bg-[#eef2f6]"
                      }`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-semibold ${
                          isActive
                            ? "bg-[#17a5fb] text-white"
                            : "bg-white text-[#8695af]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-[17px] font-semibold tracking-[-0.2px] ${
                          isActive ? "text-[#17a5fb]" : "text-[#0e1526]"
                        }`}
                      >
                        {item.label}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                        className={`shrink-0 transition-transform duration-200 ${
                          isActive
                            ? "translate-x-0.5 text-[#17a5fb]"
                            : "text-[#b4becd]"
                        }`}
                      >
                        <path
                          d="M6 3.5L10.5 8L6 12.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.a>
                  );
                })}
              </motion.nav>
            </div>

            {/* CTA pinned bottom */}
            <motion.div
              className="relative z-[1] w-full shrink-0 border-t border-[#e6ecf1] bg-white px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.18,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href="#register"
                onClick={() => handleNavClick("register")}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#17a5fb] text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(23,165,251,0.28)] active:bg-[#0f96ea]"
              >
                Request to Attend
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  aria-hidden
                  className="shrink-0"
                >
                  <path
                    d="M3.5 8.5H13.5M13.5 8.5L9.25 4.25M13.5 8.5L9.25 12.75"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <header className="sticky top-0 z-[110] w-full border-b border-[#e6ecf1] bg-white/95 backdrop-blur-[9px]">
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
            <motion.button
              type="button"
              className="relative inline-flex size-9 items-center justify-center rounded-lg border border-[#e6ecf1] lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <span className="sr-only">Open menu</span>
              <MenuIcon open={false} />
            </motion.button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
