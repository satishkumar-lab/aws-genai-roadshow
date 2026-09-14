"use client";

import { useState } from "react";

const NAV = [
  { href: "#register", label: "Registration", active: true },
  { href: "#about", label: "About Event" },
  { href: "#agenda", label: "Agenda" },
  { href: "#audience", label: "Audience" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-white/90 backdrop-blur-[9px]">
      <div className="flex h-[66px] items-center justify-between px-5 md:px-10 xl:px-20">
        <a href="#register" className="shrink-0">
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
              className={`rounded-full px-[14px] py-2 text-[16px] font-medium text-black ${
                item.active
                  ? "bg-[#edf9ff]"
                  : "bg-transparent hover:bg-[#edf9ff]/70"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="hidden h-9 items-center justify-center rounded-lg bg-[#17a5fb] px-[17px] text-[14px] font-semibold text-white hover:bg-[#0f96ea] sm:inline-flex"
          >
            Request to Attend
          </a>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-[#e6ecf1] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-black" />
              <span className="block h-px w-4 bg-black" />
              <span className="block h-px w-4 bg-black" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-[#e6ecf1] bg-white px-5 py-4 lg:hidden">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-full px-[14px] py-2 text-[16px] font-medium text-black ${
                item.active ? "bg-[#edf9ff]" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex h-9 items-center justify-center rounded-lg bg-[#17a5fb] px-[17px] text-[14px] font-semibold text-white sm:hidden"
          >
            Request to Attend
          </a>
        </nav>
      ) : null}
    </header>
  );
}
