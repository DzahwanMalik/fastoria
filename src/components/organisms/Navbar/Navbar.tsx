import type { JSX } from "react";
import { useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

import fastoriaLogo from "@/assets/images/LOGO PNG.png";
import Button from "@/components/atoms/Button";

export default function Navbar(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Beranda", href: "#hero" },
    { label: "Kategori Lomba", href: "#kategori" },
    { label: "Alur Pendaftaran", href: "#alur" },
    { label: "Hadiah & Benefit", href: "#hadiah" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-white border-b-[3px] border-black shadow-neo-md">
      <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-gutter">
        {/* Brand Logo & Neo-Brutalist Decorative Badges */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 sm:gap-3 group select-none cursor-pointer"
          aria-label="Fastoria Home"
        >
          {/* Logo Frame Plate */}
          <div className="h-12 border-[2.5px] border-black px-2.5 py-1 shadow-neo-sm flex items-center justify-center group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-neo-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-xs transition-all">
            <img
              src={fastoriaLogo}
              alt="Fastoria Logo"
              className="h-full w-auto object-contain block"
            />
          </div>

          {/* Typography Brand: ARENA.FEST */}
          <span className="font-headline-md text-xl sm:text-2xl font-black uppercase tracking-tight text-on-surface">
            THE<span className="text-tertiary">.</span>FASTORIA
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-headline-sm text-sm uppercase tracking-wide text-on-surface hover:text-tertiary hover:underline underline-offset-4 decoration-2 transition-colors font-bold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button Atom */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-0! w-11 h-11 shrink-0"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </Button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-white border-t-[3px] border-black px-margin-mobile py-6 shadow-neo-lg">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-headline-sm text-base uppercase tracking-wider text-on-surface py-2 border-b-2 border-surface-container flex items-center justify-between hover:text-tertiary font-bold"
              >
                <span>{link.label}</span>
                <FiArrowUpRight className="text-on-surface-variant" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
