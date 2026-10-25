import type { JSX } from "react";
import { useMemo } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";

import fastoriaLogo from "@/assets/images/LOGO PNG.png";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import FooterSocialLink from "@/components/molecules/FooterSocialLink";
import { toEventSettingsValues } from "@/utils/eventSettings";
import { sanitizePhoneDigits } from "@/utils/phone";

import {
  DEFAULT_BRAND_INFO,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_VENUE_INFO,
} from "./Footer.constants";
import type { FooterProps } from "./Footer.types";

function getSocialIcon(platform?: string, url?: string): JSX.Element {
  const p = (platform || "").trim().toLowerCase();
  const u = (url || "").trim().toLowerCase();

  if (p.includes("instagram") || u.includes("instagram.com")) {
    return <FaInstagram className="w-4 h-4 shrink-0" />;
  }
  if (p.includes("tiktok") || u.includes("tiktok.com")) {
    return <FaTiktok className="w-4 h-4 shrink-0" />;
  }
  if (
    p.includes("youtube") ||
    u.includes("youtube.com") ||
    u.includes("youtu.be")
  ) {
    return <FaYoutube className="w-4 h-4 shrink-0" />;
  }
  if (
    p.includes("twitter") ||
    p.includes("x") ||
    u.includes("twitter.com") ||
    u.includes("x.com")
  ) {
    return <FaXTwitter className="w-4 h-4 shrink-0" />;
  }
  if (p.includes("facebook") || u.includes("facebook.com")) {
    return <FaFacebookF className="w-4 h-4 shrink-0" />;
  }
  return <FiGlobe className="w-4 h-4 shrink-0" />;
}

function getSocialHover(platform?: string, url?: string): string {
  const p = (platform || "").trim().toLowerCase();
  const u = (url || "").trim().toLowerCase();

  if (p.includes("instagram") || u.includes("instagram.com")) {
    return "hover:bg-punch-coral hover:text-surface-white";
  }
  if (p.includes("tiktok") || u.includes("tiktok.com")) {
    return "hover:bg-electric-cyan text-on-surface";
  }
  if (
    p.includes("youtube") ||
    u.includes("youtube.com") ||
    u.includes("youtu.be")
  ) {
    return "hover:bg-tertiary hover:text-surface-white";
  }
  if (
    p.includes("twitter") ||
    p.includes("x") ||
    u.includes("twitter.com") ||
    u.includes("x.com")
  ) {
    return "hover:bg-electric-yellow text-on-surface";
  }
  if (p.includes("facebook") || u.includes("facebook.com")) {
    return "hover:bg-primary-container text-on-surface";
  }
  return "hover:bg-electric-yellow text-on-surface";
}

export default function Footer({
  settings,
  className = "",
}: FooterProps): JSX.Element {
  const values = useMemo(
    () => (settings ? toEventSettingsValues(settings) : null),
    [settings],
  );

  const brandName = settings?.event_name || DEFAULT_BRAND_INFO.brandName;
  const brandDescription =
    settings?.event_description || DEFAULT_BRAND_INFO.description;
  const logoSrc = settings?.logo_url || fastoriaLogo;

  const venueName = settings?.venue_name || DEFAULT_VENUE_INFO.venueName;
  const address = settings?.address || DEFAULT_VENUE_INFO.address;

  const contacts = values?.contact ?? [];

  const socialMediaList = values?.social_media;
  const socialLinks = useMemo(() => {
    if (socialMediaList && socialMediaList.length > 0) {
      return socialMediaList.map((item, idx) => ({
        id: `social-${idx}-${item.platform || "link"}`,
        label: item.label || item.platform.toUpperCase() || "MEDIA SOSIAL",
        href: item.url,
        icon: getSocialIcon(item.platform, item.url),
        hoverColorClass: getSocialHover(item.platform, item.url),
      }));
    }
    return DEFAULT_SOCIAL_LINKS;
  }, [socialMediaList]);

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
                  src={logoSrc}
                  alt={brandName}
                  className="h-full w-auto object-contain block"
                />
              </div>

              <span className="font-headline-md text-xl sm:text-2xl font-black uppercase tracking-tight text-on-surface">
                THE<span className="text-tertiary">.</span>FASTORIA
              </span>
            </div>

            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed line-clamp-4">
              {brandDescription}
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
              {venueName}
            </h4>

            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
              {address}
            </p>

            {contacts.length > 0 ? (
              <div className="space-y-1.5 font-label-md text-xs sm:text-sm text-on-surface">
                {contacts.map((c, i) => {
                  const digits = sanitizePhoneDigits(c.value);
                  const isWa =
                    c.type.toLowerCase().includes("wa") ||
                    c.type.toLowerCase().includes("whatsapp");
                  const href = isWa
                    ? `https://wa.me/${digits.startsWith("62") ? digits : `62${digits.replace(/^0+/, "")}`}`
                    : c.type.toLowerCase().includes("email")
                      ? `mailto:${c.value}`
                      : c.value;

                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-on-surface-variant font-medium">
                        {c.label}:
                      </span>{" "}
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline hover:text-tertiary transition-colors"
                      >
                        {c.value.startsWith("+62")
                          ? c.value
                          : c.value.includes("@")
                            ? c.value
                            : `+62${c.value.replace(/^0+/, "")}`}
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
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
                  <span className="font-bold">
                    {DEFAULT_VENUE_INFO.hotline}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Official Social Media */}
          <div>
            <div className="mb-3">
              <Badge color="soft-lilac" size="sm">
                MEDIA SOSIAL RESMI
              </Badge>
            </div>

            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
              Ikuti perkembangan jadwal, info live streaming, dan update
              pemenang:
            </p>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => (
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
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
