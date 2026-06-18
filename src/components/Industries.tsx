'use client'

import React from "react";
import { motion } from "motion/react";
import { industries } from '@/lib/data'

const Industries = () => {
  return (
    <div
      id="industries"
      className="w-full bg-linear-to-b to-[#e1e2e2] from-[#fcfcfc] py-16 lg:py-24"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        {/* Header */}
        <div className="space-y-1 mb-16">
          <h2 className="tracking-tighter text-balance text-3xl font-extrabold md:text-4xl lg:text-5xl text-[#0B1F3B]">
            INDUSTRIES
          </h2>
          <span className="text-[10px] font-medium text-[#8E6E53] uppercase tracking-[0.3em] block ml-0.5">
            Deep expertise across sectors that power global commerce
          </span>
        </div>

        {/* Row 1: 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          {industries.slice(0, 2).map((industry, i) => (
            <IndustryCard key={industry.title} industry={industry} index={i} />
          ))}
        </div>

        {/* Row 2: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.slice(2, 5).map((industry, i) => (
            <IndustryCard key={industry.title} industry={industry} index={i + 2} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ODD_BG = "bg-[#EEF1F6]";   // soft navy-tinted white  — indices 0, 2, 4
const EVEN_BG = "bg-[#F5F0EB]";  // warm sand               — indices 1, 3

const IndustryCard = ({
  industry,
  index,
}: {
  industry: { title: string; description: string; icon?: string };
  index: number;
}) => {
  const isOdd = index % 2 === 0; // 0-based: "odd" visually = even index

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      className={`
        group relative rounded-3xl overflow-hidden p-7 md:p-8
        flex flex-col justify-end min-h-[220px] md:min-h-[260px]
        ${isOdd ? ODD_BG : EVEN_BG}
      `}
    >
      {/* Faint watermark icon top-right */}
      {industry.icon && (
        <div className="absolute top-5 right-5 opacity-30 pointer-events-none select-none">
          <img
            src={industry.icon}
            alt=""
            className="h-20 w-20 object-contain"
          />
        </div>
      )}

      {/* Content pinned to bottom */}
      <div className="relative z-10">
        {/* Icon + title row */}
        <div className="flex items-center gap-2.5 mb-2">
          {/* {industry.icon && (
            <div
              className={`
                flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                ${isOdd ? "bg-[#0B1F3B]/8" : "bg-[#8E6E53]/10"}
              `}
            >
              <img src={industry.icon} alt={industry.title} className="h-4 w-4" />
            </div>
          )} */}
          <h3
            className={`
              font-semibold text-base md:text-lg tracking-tight
              ${isOdd ? "text-[#0B1F3B]" : "text-[#6B4C2A]"}
            `}
          >
            {industry.title}
          </h3>
        </div>

        <p className="text-[#878787] text-sm leading-relaxed max-w-xs">
          {industry.description}
        </p>
      </div>
    </motion.div>
  );
};

export default Industries;