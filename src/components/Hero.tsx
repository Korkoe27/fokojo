"use client";
import { Send } from 'lucide-react'
import React from 'react'
import { motion, Easing } from "motion/react";

const EASE: Easing = "easeOut";

const Hero = () => {
  return (
    <div id="home" className="min-h-screen w-full bg-[url('/hero-bg-mobile.png')] md:bg-[url('/hero-bg.png')] flex flex-col items-center  relative bg-[#FBFBFB] justify-start bg-cover bg-center">

    
        <div className="mx-auto mt-50 w-11/12 max-w-[1280px] flex flex-col justify-start  items-center h-full">
         <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="
            inline-flex items-center gap-2 mb-8
            rounded-full border border-[#258FB5]/30
            bg-[#258FB5]/08
            px-4 py-1.5
          "
        >
          <span className="h-[7px] w-[7px] rounded-full bg-[#258FB5] animate-pulse" />
          <span className="text-[13px] font-semibold tracking-wide text-[#1a7fa8]">
            Trusted by 500+ global partners
          </span>
        </motion.div>
        <div className="lg:w-2/3  flex  h-full flex-col m-auto items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="
            font-[Manrope] font-extrabold tracking-tight leading-[1.08]
            text-[#8E6E53] text-center
            text-4xl md:text-5xl lg:text-[58px]
            mb-5 max-w-2xl
          "
        >
          Smarter logistics for a moving world
        </motion.h1>

            <p className="text-center opacity-70 text-[#1B1B1E] lg:w-2/3 text-base font-[Manrope] md:text-lg lg:text-xl">
                Moving goods, connecting markets, and creating opportunities across borders.
            </p>

            <button className="bg-[#2596be] text-white py-3 px-6 rounded-xl mt-10 transition-colors capitalize duration-300 flex items-center justify-center space-x-2">
                <span>get in touch</span>
                <Send />
            </button>
        </div>
        </div>
    </div>
  )
}

export default Hero
