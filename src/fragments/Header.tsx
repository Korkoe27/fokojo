"use client";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useActiveSection from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (scrollRef.current !== isScrolled) {
        scrollRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav_links = [
    { href: "#home", title: "Home" },
    { href: "#about", title: "About" },
    { href: "#services", title: "Services" },
    { href: "#industries", title: "Industries" },
    { href: "#partners", title: "Partners" },
    { href: "#contact", title: "Contact" },
  ];

  const sectionIds = nav_links
    .filter((link) => link.href.startsWith("#"))
    .map((link) => link.href.slice(1));

  const activeSection = useActiveSection(sectionIds);

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    if (pathname === "/") {
      scrollToSection(e, href);
    } else {
      router.push("/" + href);
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Header — visible at 1280px and above */}
      <header className="hidden xl:block fixed z-20 w-full">
        <div className="w-11/12 mx-auto max-w-[1280px] h-20 lg:py-4">
          <div className="flex items-center w-full h-full justify-between">
            <Link href="/">
              <img
                src="/logo-blue.svg"
                alt="FoKojo"
                className="max-h-[64px] w-full h-full"
              />
            </Link>

            <nav className="flex items-center space-x-2 xl:space-x-8">
              {nav_links.map((link) => (
                <button
                  key={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`text-xs bg-white/50 hover:bg-black/10 backdrop-blur-md rounded-[50px] font-[Manrope] font-normal px-3 py-2 cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                    activeSection === link.href.slice(1)
                      ? "text-[#F56E0F] bg-[#2596be]"
                      : "text-black"
                  }`}
                >
                  {link.title}
                </button>
              ))}
            </nav>

            <button
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="rounded-xl px-6 py-2 font-normal text-white font-[Manrope] capitalize bg-[#2596be] cursor-pointer no-underline whitespace-nowrap"
            >
              Schedule a call
            </button>
          </div>
        </div>
      </header>

      {/* Tablet + Mobile Header — visible below 1280px */}
      <header
        className={`xl:hidden w-[95%] max-w-[1428px] fixed top-3 left-1/2 -translate-x-1/2 bg-white/40 border-b border-white/30 p-2 pl-5 overflow-hidden z-50 rounded-full
          transition-[height,border-radius] ease-in-out
          ${
            menuOpen
              ? "h-screen flex flex-col rounded-lg duration-[500ms,0ms] delay-[0ms,0ms] backdrop-blur-sm"
              : "h-14 duration-[500ms,700ms] delay-[0ms,500ms] backdrop-blur-xs"
          }`}
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="text-[#2596be] relative z-50"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo-blue.svg" alt="FoKojo" className="h-6" />
          </Link>

          <button
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="bg-[#2596be] text-white flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
          >
            <ArrowRight size={15} />
          </button>
        </div>

        <nav
          className={`p-6 w-full transition-all ease-in-out h-full text-center ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col justify-center h-full gap-15">
            {nav_links.map((link) => {
              const isActive = link.href.slice(1) === activeSection;
              return (
                <li key={link.href}>
                  <button
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`block text-lg font-semibold transition-colors duration-200 w-full ${
                      isActive ? "text-[#1F919C]" : "text-black/70"
                    }`}
                  >
                    {link.title}
                  </button>
                </li>
              );
            })}
            <li className="mt-4">
              <button
                onClick={(e) => {
                  handleSmoothScroll(e, "#contact");
                }}
                className="block w-full rounded-[50px] bg-[#05A0AF] py-2.5 text-base font-semibold text-white cursor-pointer"
              >
                Schedule a Call
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 xl:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none hidden"
        }`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
};

export default Header;