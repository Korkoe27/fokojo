"use client";
import Link from 'next/link'
import React from 'react'
import { footerLinks, socialLinks } from '@/lib/data'
import { scrollToSection } from '@/lib/utils'

const footerGroups = [
  { title: "company", links: footerLinks.company },
  { title: "services", links: footerLinks.services },
  { title: "resources", links: footerLinks.resources },
  { title: "social", links: socialLinks },
]

const Footer = () => {
  return (
    <footer className="bg-[#0E0E0E] w-full">
      <div className="font-[Manrope] w-11/12 max-w-[1280px] mx-auto py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">

          <div className="flex flex-col items-start justify-start gap-5 lg:col-span-4">
            <Link href="/">
              <img src="/logo-blue.svg" alt="" className="w-full min-w-32  max-w-44 h-full " />
            </Link>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Connecting manufacturers, distributors, and brands through global
              trade partnerships and strategic market entry solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:col-span-8">
            {footerGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-5">
                <h4 className="text-white font-black uppercase text-[13px] tracking-wider">{group.title}</h4>
                <ul className="flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("#") ? (
                        <button
                          onClick={(e) => scrollToSection(e, link.href)}
                          className="text-[#6B7280] uppercase font-bold text-sm hover:text-white transition-colors text-left"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link href={link.href} className="text-[#6B7280] uppercase font-bold text-sm hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="border-t border-[#1F2937]">
        <p className="text-[#6B7280] py-6 text-lg font-[DarkerGrotesque] font-bold text-center">
          &copy; {new Date().getFullYear()} FoKojo
        </p>
      </div>
    </footer>
  )
}

export default Footer
