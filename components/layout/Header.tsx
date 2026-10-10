
"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Expertises", href: "#expertises" },
  { label: "Réalisations", href: "#realisations" },
  { label: "À propos", href: "#apropos" },
  { label: "Formations", href: "#formations" },
  { label: "ressources", href: "/ressources" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.12] bg-[#1A1A1A]/75 shadow-[0_8px_35px_rgba(0,0,0,0.16)] backdrop-blur-2xl"
          : "border-b border-transparent bg-[#1A1A1A]/20 backdrop-blur-sm"
      }`}
    >
      <div className="container-site flex h-[76px] items-center justify-between gap-5">
        {/* LOGO */}
        <a
          href="/"
          aria-label="DavCréativ, accueil"
          className="group shrink-0"
        >
          <span className="font-display text-[25px] tracking-tight transition-colors duration-300 group-hover:text-[#FFD700]">
            DavCréativ
            <span className="text-[#FFD700]">®</span>
          </span>
        </a>

        {/* NAVIGATION DESKTOP */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link relative py-2 text-xs font-medium text-white/70 transition-colors duration-300 hover:text-[#FFD700]"
            >
              <span className="nav-link-label inline-block">
                {link.label}
              </span>
              <span className="nav-link-line" aria-hidden="true" />
            </a>
          ))}
        </nav>

        {/* BOUTON CONTACT */}
        <a
          href="/contact"
          className="header-cta hidden items-center gap-3 rounded-full border border-[#FFD700]/50 px-5 py-3 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A1A1A] lg:inline-flex"
        >
          Parlons de votre projet
          <span
            className="inline-block text-base transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>

        {/* BOUTON MOBILE */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#FFD700]/60 hover:text-[#FFD700] lg:hidden"
        >
          <span className="text-xl">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {/* NAVIGATION MOBILE */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open
            ? "grid-rows-[1fr] border-t border-white/10 opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0 overflow-hidden bg-[#1A1A1A]/95 px-[18px] backdrop-blur-2xl">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }}
              className={`mobile-nav-link block border-b border-white/[0.08] py-4 text-sm text-white/75 transition-all duration-300 hover:pl-2 hover:text-[#FFD700] ${
                open
                  ? "translate-x-0 opacity-100"
                  : "translate-x-2 opacity-0"
              }`}
            >
              <span className="flex items-center justify-between">
                {link.label}
                <span className="text-[#FFD700]/70">↗</span>
              </span>
            </a>
          ))}

          <a
            href="#contact"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="my-5 flex items-center justify-between rounded-full bg-[#FFD700] px-5 py-4 text-sm font-bold text-[#1A1A1A] transition-transform hover:scale-[1.01]"
          >
            Démarrer un projet
            <span>↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
