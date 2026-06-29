"use client";
import { Send } from "lucide-react";
import { motion, Variants, Easing } from "motion/react";
import { scrollToSection } from "@/lib/utils";

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
      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-[#000]/30  to-[#000]/60 pointer-events-none"
      />
      {/* <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-[#0B1F3B]/75 via-[#0B1F3B]/50 to-[#0B1F3B]/70 pointer-events-none"
      /> */}

      <div className="relative z-10 mx-auto w-11/12 max-w-[1280px] flex flex-col items-center max-lg:justify-center flex-1 py-32 lg:py-40">

        {/* Eyebrow */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="mb-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2596be]/40 bg-[#2596be]/15 px-4 py-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-[#fff]/70 animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#fff]/60 font-[Manrope]">
              Trusted by 500+ global partners
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="font-[Manrope] font-black tracking-[-0.02em] leading-[1.06] text-center text-white max-w-3xl mb-5 text-4xl md:text-5xl lg:text-[60px]"
        >
          Smarter logistics for a{" "}
          <em className="not-italic text-[#2596be]">moving world</em>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="max-w-lg text-[16px] md:text-[18px] text-center leading-[1.7] text-white/75 font-[Manrope] font-normal mb-10"
        >
          Moving goods, connecting markets, and creating opportunities across
          borders — from Africa to the world.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={(e) => scrollToSection(e, "#contact")}
            className="inline-flex items-center gap-2 rounded-xl bg-[#8E6E53] hover:bg-[#7a5e45] text-white text-[14px] font-bold font-[Manrope] tracking-wide px-7 py-3.5 transition-colors duration-200"
          >
            <span>Get in touch</span>
            <Send size={15} strokeWidth={2.2} />
          </button>

          <button
            onClick={(e) => scrollToSection(e, "#about")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 hover:border-white/55 text-white text-[14px] font-semibold font-[Manrope] px-7 py-3.5 transition-colors duration-200 bg-white/6 hover:bg-white/12"
          >
            Learn more
          </button>
        </motion.div>

        {/* Stats bar
        <motion.div
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
          className="mt-16 inline-grid grid-cols-3 rounded-2xl overflow-hidden border border-white/15 bg-white/8 backdrop-blur-sm"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-5 px-8 text-center ${
                i < stats.length - 1 ? "border-r border-white/15" : ""
              }`}
            >
              <p className="text-[26px] font-extrabold font-[Manrope] text-white leading-none tracking-tight">
                {stat.value}
              </p>
              <p className="text-[11px] text-white/50 mt-1.5 font-[Manrope] font-semibold tracking-[0.13em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div> */}

      </div>
    </section>
  );
};

export default Hero;