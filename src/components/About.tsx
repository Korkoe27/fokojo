"use client";
import { motion, Variants, Easing } from "motion/react";

const aboutContent = {
  mission:
    "To simplify global trade by providing reliable, transparent, and innovative logistics solutions that empower businesses to reach new markets with confidence.",
  vision:
    "A world where every business — regardless of size — has seamless access to international trade opportunities and cross-border supply chains.",
  stats: [
    { value: "50+", label: "Countries" },
    { value: "500+", label: "Partnerships" },
    { value: "10yr", label: "Experience" },
  ],
  values: [
    {
      title: "Integrity",
      description:
        "We uphold the highest standards of honesty and transparency in every partnership.",
      iconSrc: "/assets/icons/shield.png",
      icon: "🛡️",
    },
    {
      title: "Global Reach",
      description:
        "Our network spans 50+ countries, giving you access to markets worldwide.",
      iconSrc: "/assets/icons/world.png",
      icon: "🌍",
    },
    {
      title: "Partnership",
      description:
        "We treat every client as a true partner, investing in their success as if it were our own.",
      iconSrc: "/assets/icons/partnership.png",
      icon: "🤝",
    },
    {
      title: "Innovation",
      description:
        "We use technology to optimize supply chains and deliver real-time visibility.",
      iconSrc: "/assets/icons/trend.png",
      icon: "💡",
    },
  ],
  timeline: [
    {
      year: "2015",
      title: "Founded in Accra",
      description:
        "FoKojo was established with a vision to bridge African markets with global trade partners.",
    },
    {
      year: "2017",
      title: "Expanded to 10 Countries",
      description:
        "Opened offices in Nigeria, Kenya, and South Africa, extending our logistics network across the continent.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description:
        "Launched our real-time tracking platform, giving clients full visibility into their supply chain.",
    },
    {
      year: "2023",
      title: "Global Milestone",
      description:
        "Surpassed 500 active partnerships and expanded operations into Europe and Southeast Asia.",
    },
    {
      year: "2025",
      title: "Industry Leader",
      description:
        "Recognized as a top 10 logistics provider in emerging markets with a presence in 50+ countries.",
      isCurrent: true,
    },
  ],
};

// Fix: use typed Easing constant and Variants type
const EASE: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  }),
};

const About = () => {
  return (
    <section
      id="about"
      className="w-full min-h-screen my-16 lg:my-24 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2596be 1px, transparent 1px),
            linear-gradient(to bottom, #2596be 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="mx-auto w-11/12 max-w-[1280px] z-10">

        {/* ── Hero intro ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 mb-20 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#8E6E53] font-[Manrope] mb-4">
              About Fokojo
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-[Manrope] leading-[1.08] tracking-tight text-[#0B1F3B] mb-5">
              A decade of bridging{" "}
              <em className="not-italic text-[#8E6E53]">global markets</em>
            </h2>
            <p className="text-[15px] leading-relaxed text-[#444] mb-3">
              Since 2015, Fokojo has been at the forefront of international trade
              facilitation, connecting businesses across continents and creating
              pathways for sustainable growth in emerging markets.
            </p>
            <p className="text-[15px] leading-relaxed text-[#444]">
              Our deep understanding of local markets, combined with global
              expertise, allows us to create partnerships that drive real results —
              from market entry to full-scale distribution networks.
            </p>

<div className="grid md:grid-cols-2 gap-3 mt-8">
  {[
    {
      label: "Our Mission",
      text: aboutContent.mission,
      icon: "/assets/icons/goal.png",
      emoji: "🎯",
    },
    {
      label: "Our Vision",
      text: aboutContent.vision,
      icon: "/assets/icons/spaceship.png",
      emoji: "🚀",
    },
  ].map((card) => (
    <div
      key={card.label}
      className="group relative rounded-2xl bg-white/60 border border-[#0B1F3B]/[0.07] p-6 overflow-hidden transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(11,31,59,0.07)]"
    >
      {/* Subtle left accent bar */}
      <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-[#8E6E53]/40 group-hover:bg-[#8E6E53] transition-colors duration-300" />

      <div className="pl-4">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={card.icon}
            alt=""
            className="h-5 w-5 object-contain opacity-80"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <p className="text-[10px] font-bold font-[Manrope] tracking-[0.16em] uppercase text-[#8E6E53]">
            {card.label}
          </p>
        </div>
        <p className="text-[13px] leading-[1.75] text-[#4A4A4A] font-[Manrope]">
          {card.text}
        </p>
      </div>
    </div>
  ))}
</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="rounded-2xl overflow-hidden shadow-md border border-border">
              <img
                src="assets/images/collaborate.png"
                alt="Fokojo team of international business professionals"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Stats bar */}
            <div className="mt-4 grid grid-cols-3 rounded-xl overflow-hidden border border-[#8E6E53]/15 bg-white/60">
              {aboutContent.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-4 px-3 text-center ${
                    i < aboutContent.stats.length - 1
                      ? "border-r border-[#8E6E53]/15"
                      : ""
                  }`}
                >
                  <p className="text-2xl font-extrabold font-[Manrope] text-[#0B1F3B] leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-[#888] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Values ────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-9"
          >
            <h3 className="text-3xl font-extrabold font-[Manrope] tracking-tight text-[#0B1F3B] mb-1">
              Core values
            </h3>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#8E6E53] font-[Manrope] mb-2">
              What we stand for
            </p>
            <p className="text-sm text-[#888]">
              The principles that shape every partnership and decision we make.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aboutContent.values.map((value, i) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-[#0B1F3B]/10 bg-white/65 p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(11,31,59,0.08)] relative overflow-hidden"
              >
                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8E6E53] to-[#0B1F3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-fit h-fit rounded-[10px] bg-[#8E6E53]/10 flex items-center justify-center mb-4">
                  <img
                    src={value.iconSrc}
                    alt=""
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove("hidden");
                    }}
                  />
                  <span className="hidden text-lg">{value.icon}</span>
                </div>
                <h4 className="text-[15px] font-bold font-[Manrope] text-[#0B1F3B] mb-2">
                  {value.title}
                </h4>
                <p className="text-[13px] leading-relaxed text-[#666]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Timeline ──────────────────────────────────────── */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <h3 className="text-3xl font-extrabold font-[Manrope] tracking-tight text-[#0B1F3B] mb-1">
              Our journey
            </h3>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#8E6E53] font-[Manrope] mb-2">
              Ten years of growth
            </p>
            <p className="text-sm text-[#888]">
              Key milestones that define who we are today.
            </p>
          </motion.div>

          {/* Desktop: alternating side-by-side. Mobile: single column. */}
          <div className="relative">

            {/* Centre spine — hidden on mobile */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-1/2 -translate-x-px top-3 bottom-3 w-px bg-gradient-to-b from-[#8E6E53] via-[#8E6E53]/50 to-[#8E6E53]/10"
            />

            {/* Mobile spine */}
            <div
              aria-hidden="true"
              className="md:hidden absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-[#8E6E53] to-[#8E6E53]/10"
            />

            <div className="space-y-10">
              {aboutContent.timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    className="relative grid grid-cols-[40px_1fr] md:grid-cols-[1fr_72px_1fr] items-center gap-x-4 md:gap-x-0"
                  >
                    {/* ── LEFT CARD (desktop only, even items) ── */}
                    <div
                      className={`hidden md:flex justify-end pr-6 ${
                        isLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      {isLeft && (
                        <TimelineCard item={item} align="right" />
                      )}
                    </div>

                    {/* ── DOT (desktop centred, mobile left) ── */}
                    <div className="flex flex-col items-center relative z-10 md:w-[72px]">
                      <div
                        className={`w-4 h-4 rounded-full border-[3px] border-white ${
                          item.isCurrent ? "bg-[#0B1F3B]" : "bg-[#8E6E53]"
                        } shadow-[0_0_0_2px_${item.isCurrent ? "#0B1F3B" : "#8E6E53"}]`}
                      />
                      <span
                        className={`text-[11px] font-extrabold font-[Manrope] mt-1.5 ${
                          item.isCurrent ? "text-[#0B1F3B]" : "text-[#8E6E53]"
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>

                    {/* ── RIGHT CARD (desktop: odd items | mobile: always) ── */}
                    <div
                      className={`${
                        isLeft
                          ? "md:opacity-0 md:pointer-events-none md:pl-6"
                          : "md:pl-6"
                      }`}
                    >
                      {/* Mobile always shows; desktop shows only odd */}
                      <div className="md:hidden">
                        <TimelineCard item={item} align="left" />
                      </div>
                      {!isLeft && (
                        <div className="hidden md:block">
                          <TimelineCard item={item} align="left" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ── Small sub-component to avoid repeating card markup ── */
type TimelineItem = {
  year: string;
  title: string;
  description: string;
  isCurrent?: boolean;
};

const TimelineCard = ({
  item,
  align,
}: {
  item: TimelineItem;
  align: "left" | "right";
}) => (
  <div
    className={`rounded-xl p-5 border max-w-[340px] transition-shadow hover:shadow-md ${
      item.isCurrent
        ? "bg-[#0B1F3B]/[0.04] border-[#0B1F3B]/20"
        : "bg-white/65 border-[#0B1F3B]/[0.08]"
    } ${align === "right" ? "text-right" : "text-left"}`}
  >
    <p className="text-[15px] font-bold font-[Manrope] text-[#0B1F3B] mb-1.5">
      {item.title}
    </p>
    <p className="text-[13px] leading-relaxed text-[#666]">{item.description}</p>
  </div>
);

export default About;