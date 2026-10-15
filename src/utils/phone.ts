export const PHONE_COUNTRY_CODE = "+62";

/**
 * Contact `type` values that carry a phone number. Everything else (e.g.
 * "email") is treated as free text and never gets the country-code prefix.
 */
const PHONE_CONTACT_TYPES = [
  "whatsapp",
  "wa",
  "phone",
  "telepon",
  "tel",
  "hp",
  "handphone",
  "mobile",
];

/** Local part of an Indonesian number, excluding the `+62` country code. */
export const PHONE_LOCAL_PATTERN = /^\d{8,13}$/;

export function isPhoneContactType(type: string): boolean {
  return PHONE_CONTACT_TYPES.includes(type.trim().toLowerCase());
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
