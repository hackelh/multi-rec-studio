"use client";

import { useLang } from "@/contexts/LanguageContext";

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#about", label: t.nav.about },
  ];

  return (
    <footer
      className="text-white pt-16 pb-8"
      style={{
        background: "linear-gradient(135deg, #020818 0%, #0c1a3a 60%, #0a0f1e 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black">M</span>
              </div>
              <div>
                <p className="font-black text-white text-lg leading-none">Multi Rec Studio</p>
                <p className="text-blue-400 text-xs font-medium">{t.footer.tagline}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
              {lang === "fr"
                ? "Studio de production audiovisuelle premium à Laval. Concept Plug & Play pour créateurs et entreprises."
                : "Premium audiovisual production studio in Laval. Plug & Play concept for creators and businesses."}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>📍</span>
              <span>Laval, Québec, Canada</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-bold text-white text-sm mb-4 uppercase tracking-widest">{t.footer.navTitle}</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <p className="font-bold text-white text-sm mb-4 uppercase tracking-widest">{t.footer.contactTitle}</p>
            <div className="space-y-2.5 mb-6">
              <a
                href="mailto:contact@multirec.studio"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors group"
              >
                <span className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors text-xs">
                  ✉️
                </span>
                contact@multirec.studio
              </a>
              <a
                href="tel:+15140000000"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors group"
              >
                <span className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors text-xs">
                  📞
                </span>
                +1 (514) 000-0000
              </a>
            </div>
            <p className="font-bold text-white text-sm mb-3 uppercase tracking-widest">{t.footer.followTitle}</p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {year} Multi Rec Studio. {t.footer.rights}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">
              {lang === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              {lang === "fr" ? "Conditions d'utilisation" : "Terms of Use"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
