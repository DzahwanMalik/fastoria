import type { JSX } from "react";

import fastoriaLogo from "@/assets/images/LOGO PNG.png";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import FooterSocialLink from "@/components/molecules/FooterSocialLink";

import {
  DEFAULT_BRAND_INFO,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_VENUE_INFO,
} from "./Footer.constants";
import type { FooterProps } from "./Footer.types";

export default function Footer({ className = "" }: FooterProps): JSX.Element {
  return (
    <footer
      aria-label="Footer"
      className={`w-full bg-surface-white border-t-[3px] border-black py-12 sm:py-16 select-none ${className}`.trim()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b-[2.5px] border-black">
          {/* Column 1: Brand & Terms */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Logo Frame Plate */}
              <div className="h-10 border-[2.5px] border-black px-2 py-0.5 shadow-neo-xs flex items-center justify-center bg-surface-white">
                <img
                  src={fastoriaLogo}
                  alt="Fastoria Logo"
                  className="h-full w-auto object-contain block"
                />
              </div>

              <span className="font-headline-md text-xl sm:text-2xl font-black uppercase tracking-tight text-on-surface">
                THE<span className="text-tertiary">.</span>FASTORIA
              </span>

              <Badge color="electric-yellow" size="sm" rotate="left">
                {DEFAULT_BRAND_INFO.tagYear}
              </Badge>
            </div>

            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
              {DEFAULT_BRAND_INFO.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {DEFAULT_BRAND_INFO.legalLinks.map((link) => (
                <Button
                  key={link.label}
                  href={link.href}
                  size="sm"
                  variant="secondary"
                  className="hover:bg-electric-yellow font-normal"
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Column 2: Secretariat & Venue */}
          <div>
            <div className="mb-3">
              <Badge color="surface-container" size="sm">
                {DEFAULT_VENUE_INFO.badgeLabel}
              </Badge>
            </div>

            <h4 className="font-headline-sm text-sm sm:text-base uppercase text-on-surface mb-2 font-bold">
              {DEFAULT_VENUE_INFO.venueName}
            </h4>

            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
              {DEFAULT_VENUE_INFO.address}
            </p>

            <div className="space-y-1.5 font-label-md text-xs sm:text-sm text-on-surface">
              <div>
                Email:{" "}
                <a
                  href={`mailto:${DEFAULT_VENUE_INFO.email}`}
                  className="font-bold underline hover:text-tertiary transition-colors"
                >
                  {DEFAULT_VENUE_INFO.email}
                </a>
              </div>
              <div>
                Hotline:{" "}
                <span className="font-bold">{DEFAULT_VENUE_INFO.hotline}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Official Social Media */}
          <div>
            <div className="mb-3">
              <Badge color="soft-lilac" size="sm">
                MEDIA SOSIAL RESMI
              </Badge>
            </div>

            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
              Ikuti perkembangan jadwal, info live streaming, dan update pemenang:
            </p>

            <div className="flex flex-wrap gap-2">
              {DEFAULT_SOCIAL_LINKS.map((item) => (
                <FooterSocialLink
                  key={item.id}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  hoverColorClass={item.hoverColorClass}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span className="font-headline-sm text-sm sm:text-base text-on-surface uppercase font-black tracking-tight">
              THE.FASTORIA
            </span>
            <span className="font-label-md text-xs sm:text-sm text-on-surface-variant font-bold tracking-wider">
              // NATIONAL CREATIVE &amp; TECH COMP
            </span>
          </div>

          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant text-center md:text-right">
            &copy; {new Date().getFullYear()} THE.FASTORIA. Built for relentless
            creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
