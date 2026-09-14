const SPEAKERS = [
  {
    name: "Ishaan S.",
    role: "AI Engineering",
    image: "/assets/speaker-ishaan.png",
    company: "aws" as const,
    linkedin: "https://www.linkedin.com/in/ishaansutaria/",
  },
  {
    name: "Aditya Srivastava",
    role: "Solutions Architect, AWS",
    image: "/assets/speaker-aditya.png",
    company: "aws" as const,
    linkedin: "https://www.linkedin.com/in/aditya-srivastava-5885b1103/",
  },
  {
    name: "Ayush Agrawal",
    role: "Tech Entrepreneur | Startup Mentor",
    image: "/assets/speaker-ayush.png",
    company: "aws" as const,
    linkedin: "https://www.linkedin.com/in/agrlayush/",
  },
  {
    name: "Satyam Kotyal",
    role: "Associate Director - Sales, CloudKeeper",
    image: "/assets/speaker-satyam.png",
    company: "ck" as const,
    linkedin: "https://www.linkedin.com/in/satyamkotiyal/",
  },
];

export default function AboutSpeakers() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-white pb-[72px] pt-12 md:pb-[100px] md:pt-20"
    >
      <img
        src="/assets/blob-blue.svg"
        alt=""
        width={400}
        height={400}
        className="pointer-events-none absolute -left-[150px] -top-[193px] hidden size-[280px] md:block md:size-[400px]"
        aria-hidden
      />
      <img
        src="/assets/blob-pink.svg"
        alt=""
        width={354}
        height={354}
        className="pointer-events-none absolute -right-[80px] top-[278px] hidden size-[240px] md:block md:size-[354px]"
        aria-hidden
      />

      {/* About the event — Figma: 360 title + 800 body, gap 80 */}
      <div className="relative mx-auto grid w-full min-w-0 max-w-[1440px] gap-8 px-5 md:px-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20 xl:px-[100px]">
        <h2 className="text-[32px] font-bold leading-[44px] text-[#292929] md:text-[44px] md:leading-[50px]">
          About the event
        </h2>
        <div className="flex min-w-0 flex-col gap-4 md:gap-0">
          <p className="w-full text-[16px] leading-[27px] text-black">
            A curated half-day technical event for engineering teams in Gurugram
            who are actively building - or planning to build - with Generative AI
            on AWS. This is not a sales pitch or a keynote. It is a working
            session designed around the real challenges of deploying agentic AI
            systems in production.
          </p>
          <div className="my-4 h-px w-full bg-[#e3e7ed] md:my-[18px]" />
          <p className="w-full text-[16px] leading-[25px] text-black">
            Hosted by AWS and CloudKeeper, the day brings together practitioners
            and architects to share battle-tested patterns, live architecture
            walkthroughs, and direct consultation time.
          </p>
        </div>
      </div>

      {/* Meet the speakers */}
      <div className="relative mx-auto mt-[60px] w-full min-w-0 max-w-[1440px] px-5 md:px-10 xl:px-[100px]">
        <h2 className="mb-[30px] text-[32px] font-bold leading-[48px] text-black md:text-[40px]">
          Meet the speakers
        </h2>

        {/* Figma speaker-card: 290×300, p-32, gap-20 (137:4619 / hover 137:4621) */}
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SPEAKERS.map((speaker) => (
            <article
              key={speaker.name}
              className="group relative mx-auto w-full max-w-[292px] rounded-[20px] bg-[#e6ecf1] p-px shadow-[0px_4px_12px_rgba(14,21,38,0.06)] transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-gradient-to-br hover:from-[#17a5fb] hover:to-[#ed0082] hover:shadow-[0px_14px_28px_rgba(14,21,38,0.12)] xl:mx-0 xl:max-w-none"
            >
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

                {/* Variant2: soft blue→pink fill + #80cfff ring */}
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
                  <p className="whitespace-nowrap text-[13px] leading-normal text-[#5b6478]">
                    {speaker.role}
                  </p>
                </div>

                {speaker.company === "aws" ? (
                  <img
                    src="/assets/logo-aws-smile.svg"
                    alt="AWS"
                    width={40}
                    height={24}
                    className="h-6 w-[40px] shrink-0"
                  />
                ) : (
                  <img
                    src="/assets/logo-ck-color.png"
                    alt="CloudKeeper"
                    width={98}
                    height={24}
                    className="h-6 w-auto shrink-0"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
