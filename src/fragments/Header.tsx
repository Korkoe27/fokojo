"use client";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useActiveSection from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/utils";
import { Menu, X, Globe, Moon, Sun, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <button className="">
        <Moon className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-2 py-2 rounded-full bg-black/50 backdrop-blur-md text-black/70 hover:text-[#1F919C] transition-colors duration-200"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
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
    { href: "#process", title: "Process" },
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
      {/* Desktop Header */}

      {/* bg-white/50 backdrop-blur-md  */}
      <header 
      className="max-lg:hidden
      fixed z-20 w-full">
        <div className="w-11/12 mx-auto max-w-[1280px] h-20 lg:py-4">
          <div className="flex items-center  w-full h-full justify-between">
            <Link href="/" className="">
              <img
                src="/logo-blue.svg"
                alt="FoKojo"
                className="max-h-[64px] w-full h-full"
              />
            </Link>

            <nav className="flex items-center space-x-8">
              {nav_links.map((link) => (
                <button
                  key={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`text-xs bg-white/50 hover:bg-black/10 backdrop-blur-md  rounded-[50px] font-[Manrope] font-normal px-3 py-2 cursor-pointer transition-colors duration-200 ${
                    activeSection === link.href.slice(1)
                      ? "text-[#F56E0F] bg-[#2596be]"
                      : "text-black"
                  }`}
                >
                  {link.title}
                </button>
              ))}
            </nav>

            {/* <ThemeToggle /> */}
            <Link
              href="/contact"
              className="rounded-xl px-6 py-2 font-normal text-white font-[Manrope] capitalize bg-[#2596be] cursor-pointer no-underline"
            >
              Schedule a call
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`lg:hidden w-[95%] max-w-[1428px] fixed top-3 left-1/2 -translate-x-1/2 bg-white/40 border-b border-white/30 p-2 pl-5 overflow-hidden z-50 rounded-full
          transition-[height,border-radius] ease-in-out
          ${
            menuOpen
              ? "h-screen rounded-lg duration-[500ms,0ms] delay-[0ms,0ms] backdrop-blur-sm"
              : "h-14 duration-[500ms,700ms] delay-[0ms,500ms] backdrop-blur-xs"
          }`}
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="text-[#2596be] relative z-50"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo-blue.svg" alt="ReblSoft" className="h-6" />
          </Link>

          <Link
            href="/contact"
            className="bg-[#2596be] text-white flex items-center justify-center w-10 h-10 rounded-full no-underline"
          >
            <ArrowRight size={15} />
          </Link>
        </div>

        <nav
          className={`p-6 w-full transition-all ease-in-out text-center ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col gap-5 ">
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
              <Link
                href="/contact"
                className="block rounded-[50px] bg-[#05A0AF] py-2.5 text-base font-semibold text-white no-underline"
                onClick={() => setMenuOpen(false)}
              >
                Schedule a Call
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 lg:hidden ${
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