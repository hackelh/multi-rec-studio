"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/contexts/LanguageContext";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const solid = scrolled || !isHome;

  const navLinks = [
    { href: isHome ? "#home" : "/#home", label: t.nav.home },
    { href: isHome ? "#services" : "/#services", label: t.nav.services },
    { href: isHome ? "#pricing" : "/#pricing", label: t.nav.pricing },
    { href: isHome ? "#contact" : "/#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={`transition-all duration-300 ${solid ? "bg-transparent" : "bg-white/10 backdrop-blur-sm rounded-xl px-1 py-1"}`}>
              <Image
                src="/Logo.png"
                alt="Multi Rec Studio"
                width={solid ? 130 : 110}
                height={solid ? 52 : 44}
                className="object-contain h-10 lg:h-12 w-auto transition-all duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  solid ? "text-slate-700" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all hover:scale-105 ${
                solid
                  ? "border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600"
                  : "border-white/40 text-white hover:border-white hover:bg-white/10"
              }`}
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>

            {/* CTA */}
            <Link
              href="/reservation"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-lg hover:shadow-red-700/30 hover:scale-105 active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t.nav.book}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className={`lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg transition-colors ${
                solid ? "hover:bg-slate-100" : "hover:bg-white/10"
              }`}
            >
              <span className={`w-5 h-0.5 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""} ${solid ? "bg-slate-800" : "bg-white"}`} />
              <span className={`w-5 h-0.5 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""} ${solid ? "bg-slate-800" : "bg-white"}`} />
              <span className={`w-5 h-0.5 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""} ${solid ? "bg-slate-800" : "bg-white"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80" : "max-h-0"
        } bg-white border-t border-slate-100 shadow-xl`}
      >
        <div className="px-4 py-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-700 font-medium py-2.5 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 mt-3">
            <Link
              href="/reservation"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-4 py-3 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t.nav.book}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
