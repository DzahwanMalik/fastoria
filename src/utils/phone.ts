export const PHONE_COUNTRY_CODE = "+62";

/**
 * Strict contact types supported for event contacts.
 */
export const CONTACT_TYPES = ["Whatsapp", "Email"] as const;
export type ContactType = (typeof CONTACT_TYPES)[number];

/** Local part of an Indonesian number, excluding the `+62` country code. */
export const PHONE_LOCAL_PATTERN = /^\d{8,13}$/;

/**
 * Normalizes untrusted or legacy contact types to a strict ContactType ("Whatsapp" | "Email"),
 * or returns empty string if unselected/unrecognized.
 */
export function toContactType(value: string): ContactType | "" {
  const normalized = value.trim().toLowerCase();

  if (
    normalized === "whatsapp" ||
    normalized === "wa" ||
    normalized === "phone" ||
    normalized === "telepon" ||
    normalized === "tel" ||
    normalized === "hp" ||
    normalized === "handphone" ||
    normalized === "mobile"
  ) {
    return "Whatsapp";
  }

  if (
    normalized === "email" ||
    normalized === "e-mail" ||
    normalized === "mail" ||
    normalized === "surel"
  ) {
    return "Email";
  }

  return "";
}

/**
 * Checks if a contact type represents a WhatsApp contact.
 */
export function isPhoneContactType(type: string): boolean {
  return toContactType(type) === "Whatsapp";
}

export function isContactType(value: string): value is ContactType {
  return (CONTACT_TYPES as readonly string[]).includes(value);
}

export function sanitizePhoneDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * Normalizes stored values for the input, which only shows the local part:
 * `+62 812-3456-7890` and `0812-3456-7890` both become `81234567890`.
 */
export function toLocalPhone(input: string): string {
  const digits = sanitizePhoneDigits(input);

  if (digits.startsWith("62")) {
    return digits.slice(2);
  }

  if (digits.startsWith("0")) {
    return digits.replace(/^0+/, "");
  }

  return digits;
}

/**
 * Expands a local number into the stored international format:
 * `81234567890`, `081234567890` and `+62 812-3456-7890` all become
 * `+6281234567890`.
 */
export function toInternationalPhone(input: string): string {
  const digits = sanitizePhoneDigits(input);

  if (digits === "") {
    return "";
  }

  if (digits.startsWith("62")) {
    return `${PHONE_COUNTRY_CODE}${digits.slice(2)}`;
  }

  return `${PHONE_COUNTRY_CODE}${digits.replace(/^0+/, "")}`;
}
