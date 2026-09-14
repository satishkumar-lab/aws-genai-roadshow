const SOCIAL = [
  {
    href: "https://www.linkedin.com/company/cloudkeeper/",
    src: "/assets/social-linkedin.svg",
    label: "LinkedIn",
  },
  {
    href: "https://x.com/CloudKeeperInc",
    src: "/assets/social-x.svg",
    label: "X",
  },
  {
    href: "https://www.youtube.com/@CloudKeeper",
    src: "/assets/social-youtube.svg",
    label: "YouTube",
  },
  {
    href: "https://medium.com/cloudkeeper",
    src: "/assets/social-medium.svg",
    label: "Medium",
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#e6ecf1] bg-white">
      <div className="mx-auto flex min-h-[90px] w-full min-w-0 max-w-[1440px] flex-col items-center justify-between gap-6 px-5 py-6 md:flex-row md:px-[60px]">
        <div className="flex max-w-full flex-wrap items-center justify-center gap-[19px]">
          <p className="font-[family-name:var(--font-roboto)] text-[14px] text-black">
            Connect with us
          </p>
          <div className="flex items-center gap-3 sm:gap-[30px]">
            {SOCIAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="relative block size-8 shrink-0"
              >
                {item.label === "X" ? (
                  <>
                    <img
                      src="/assets/social-x-bg.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="absolute inset-0 size-8"
                    />
                    <img
                      src={item.src}
                      alt=""
                      width={24}
                      height={22}
                      className="absolute inset-[15.63%_12.07%]"
                    />
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-[family-name:var(--font-roboto)] text-[14px] font-medium leading-normal text-[#253e66] md:gap-[51px]">
          <a
            href="https://www.cloudkeeper.io/privacy-policy"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.cloudkeeper.io/responsible-disclosure"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Responsible Disclosure
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <img
            src="/assets/logo-ck-color.png"
            alt="CloudKeeper"
            width={174}
            height={38}
            className="h-[38px] w-auto"
          />
          <p className="mt-1 text-[14.7px] font-medium text-[#253e66]">
            Copyright © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
