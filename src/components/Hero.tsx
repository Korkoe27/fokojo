"use client";
import { Send } from "lucide-react";
import { motion, Variants, Easing } from "motion/react";

const EASE: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.1 },
  }),
};

const stats = [
  { value: "50+", label: "Countries" },
  { value: "500+", label: "Partnerships" },
  { value: "10yr", label: "Experience" },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-[url('/hero-bg-mobile.png')] md:bg-[url('/hero-bg.png')] bg-cover bg-center flex flex-col overflow-hidden"
    >
      {/* Overlay — ensures legibility over any background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-[#0B1F3B]/60 via-[#0B1F3B]/30 to-[#0B1F3B]/10 pointer-events-none"
      />

      <div className="relative z-10 mx-auto w-11/12 items-center max-w-[1280px] flex flex-col flex-1 py-32 lg:py-40">

        {/* ── Eyebrow label ── */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="mb-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#8E6E53]/40 bg-[#8E6E53]/15 px-4 py-1.5">
            <span className="h-[6px] w-[6px] rounded-full bg-[#8E6E53] animate-pulse" />
            <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#d4b49a] font-[Manrope]">
              Trusted by 500+ global partners
            </span>
          </span>
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="font-[Manrope] font-extrabold tracking-tight leading-[1.08] text-center text-white max-w-3xl mb-6 text-4xl md:text-5xl lg:text-[58px]"
        >
          Smarter logistics for a{" "}
          <em className="not-italic text-[#C49A72]">moving world</em>
        </motion.h1>

        {/* ── Sub-copy ── */}
        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="max-w-xl text-[15px] md:text-[17px] text-center leading-relaxed text-white/80 font-[Manrope] mb-10"
        >
          Moving goods, connecting markets, and creating opportunities across
          borders — from Africa to the world.
        </motion.p>

        {/* ── CTA ── */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="flex flex-wrap items-center gap-4"
        >
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#8E6E53] hover:bg-[#7a5e45] text-white text-[14px] font-bold font-[Manrope] tracking-wide px-6 py-3 transition-colors duration-200">
            <span>Get in touch</span>
            <Send size={16} strokeWidth={2.2} />
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 hover:border-white/60 text-white text-[14px] font-semibold font-[Manrope] px-6 py-3 transition-colors duration-200 bg-white/5 hover:bg-white/10">
            Learn more
          </button>
        </motion.div>

        {/* ── Stats bar ── */}
        {/* <motion.div
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
          className="mt-16 inline-grid grid-cols-3 rounded-xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm max-w-sm"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-4 px-5 text-center ${
                i < stats.length - 1 ? "border-r border-white/15" : ""
              }`}
            >
              <p className="text-2xl font-extrabold font-[Manrope] text-white leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] text-white/55 mt-1 font-[Manrope] tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div> */}

      </div>

      {/* ── Bottom fade into next section ── */}
      {/* <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#e1e2e2] to-transparent pointer-events-none"
      /> */}
    </section>
  );
};

export default Hero;