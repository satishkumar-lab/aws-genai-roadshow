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
      className="overflow-x-hidden bg-[#fafaf8] py-12 md:py-[90px]"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[1440px] flex-col gap-12 px-5 md:px-10 xl:px-[80px]">
        <div className="flex flex-col gap-3">
          <h2 className="text-[32px] font-bold text-[#0e1526] md:text-[40px]">
            Who should attend
          </h2>
          <p className="max-w-full text-[16px] leading-[26px] text-black md:text-[18px]">
            Come as a working team if you can - the person who decides, and the
            people who will build it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className={`group relative flex min-h-[215px] min-w-0 cursor-default flex-col gap-4 overflow-hidden rounded-2xl border border-[#e6ecf1] bg-white p-6 shadow-[0px_4px_10px_rgba(14,21,38,0.03)] transition-all duration-300 ease-out hover:-translate-y-2 md:p-8 ${card.hoverBorder} ${card.hoverGlow}`}
            >
              <div
                className="relative flex size-11 items-center justify-center rounded-xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-4deg]"
                style={{ backgroundColor: card.iconBg }}
              >
                <img src={card.icon} alt="" className={card.iconSize} />
              </div>
              <div className="relative flex flex-col gap-2">
                <h3 className="text-[20px] font-medium text-black transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[1.5] text-black/90 transition-colors duration-300 group-hover:text-black">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex min-w-0 flex-col items-center justify-center gap-6 overflow-hidden rounded-tl-[4px] rounded-tr-xl rounded-br-xl rounded-bl-[4px] border-l-[3px] border-l-[#17a5fb] border-r-[3px] border-r-[#e80584] bg-white px-6 py-8 shadow-[0px_4px_7px_rgba(14,21,38,0.02)] md:flex-row md:gap-9 md:px-8 md:py-8">
          <div className="flex items-center gap-[13px]">
            <img
              src="/assets/ic-tick.svg"
              alt=""
              width={28}
              height={28}
              className="size-7"
            />
            <p className="text-[20px] font-semibold text-[#0e1526] md:text-[24px]">
              Prerequisites:
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:gap-[50px]">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#edf9ff] text-[12px] font-medium text-[#17a5fb] opacity-90">
                01
              </span>
              <p className="min-w-0 flex-1 text-[16px] text-[#0e1526] md:text-[18px]">
                AWS Builder ID (free, can be created at sign-up)
              </p>
            </div>
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ffecf0] text-[12px] font-medium text-[#e80584] opacity-90">
                02
              </span>
              <p className="min-w-0 flex-1 text-[16px] text-[#0e1526] md:text-[18px]">
                Laptop with a browser access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
