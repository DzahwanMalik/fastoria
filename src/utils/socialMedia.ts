import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

/**
 * Platforms a social media link can point to. The value is stored verbatim
 * inside the `event_settings.social_media` `jsonb[]`, so it doubles as the
 * persisted contract — never rename an entry without a data migration.
 */
export const SOCIAL_MEDIA_PLATFORMS = [
  "instagram",
  "facebook",
  "youtube",
  "twitter",
  "tiktok",
] as const;

export type SocialMediaPlatform = (typeof SOCIAL_MEDIA_PLATFORMS)[number];

export interface SocialMediaPlatformMeta {
  label: string;
  icon: IconType;
}

export const SOCIAL_MEDIA_PLATFORM_META: Record<
  SocialMediaPlatform,
  SocialMediaPlatformMeta
> = {
  instagram: { label: "Instagram", icon: FaInstagram },
  facebook: { label: "Facebook", icon: FaFacebookF },
  youtube: { label: "YouTube", icon: FaYoutube },
  twitter: { label: "X (Twitter)", icon: FaXTwitter },
  tiktok: { label: "TikTok", icon: FaTiktok },
};

export function isSocialMediaPlatform(
  value: string,
): value is SocialMediaPlatform {
  return (SOCIAL_MEDIA_PLATFORMS as readonly string[]).includes(
    value.trim().toLowerCase(),
  );
}

export function getSocialMediaPlatformMeta(
  value: string,
): SocialMediaPlatformMeta | null {
  const normalized = value.trim().toLowerCase();
  return (SOCIAL_MEDIA_PLATFORMS as readonly string[]).includes(normalized)
    ? SOCIAL_MEDIA_PLATFORM_META[normalized as SocialMediaPlatform]
    : null;
}

/** Narrows a stored (untrusted) platform, degrading unknown values to blank. */
export function toSocialMediaPlatform(
  value: string,
): SocialMediaPlatform | "" {
  const normalized = value.trim().toLowerCase();
  return (SOCIAL_MEDIA_PLATFORMS as readonly string[]).includes(normalized)
    ? (normalized as SocialMediaPlatform)
    : "";
}
