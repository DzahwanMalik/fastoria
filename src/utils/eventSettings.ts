import type {
  ContactItemValues,
  EventInfoValues,
  SocialMediaItemValues,
  TimelineItemValues,
} from "@/components/molecules/EventSettingsForms";
import type { Json, Tables, TablesInsert, TablesUpdate } from "@/types/database";
import { isPhoneContactType, toInternationalPhone, toLocalPhone } from "@/utils/phone";
import { toSocialMediaPlatform } from "@/utils/socialMedia";
import { toStoredImageUrl } from "@/utils/storage";

/** Normalized shape used by the summary view and the per-section modals. */
export interface EventSettingsValues {
  info: EventInfoValues;
  contact: ContactItemValues[];
  timeline: TimelineItemValues[];
  social_media: SocialMediaItemValues[];
}

/**
 * `contact` / `timeline` / `social_media` are `jsonb[]`, so every element comes
 * back as untyped `Json`. These guards narrow each element defensively instead
 * of casting, so a malformed row degrades to an empty input rather than a crash.
 */
const asRecord = (value: Json): Record<string, Json | undefined> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, Json | undefined>)
    : null;

const asText = (value: Json | undefined): string =>
  typeof value === "string" ? value : "";

const asNumberText = (value: Json | undefined): string =>
  typeof value === "number" ? String(value) : "";

export const toEventSettingsValues = (
  settings: Tables<"event_settings">,
): EventSettingsValues => ({
  info: {
    event_name: settings.event_name,
    event_description: settings.event_description,
    prize_pool: String(settings.prize_pool),
    venue_name: settings.venue_name,
    address: settings.address,
    logo_url: settings.logo_url ?? "",
  },
  contact: settings.contact.flatMap((item) => {
    const record = asRecord(item);

    if (!record) {
      return [];
    }

    const type = asText(record.type);

    return [
      {
        type,
        label: asText(record.label),
        // Phone rows are edited as the local part; the `+62` prefix lives in
        // the input and is re-added by `toContactUpdate`.
        value: isPhoneContactType(type)
          ? toLocalPhone(asText(record.value))
          : asText(record.value),
      },
    ];
  }),
  timeline: settings.timeline.flatMap((item) => {
    const record = asRecord(item);

    return record
      ? [
          {
            step: asNumberText(record.step),
            title: asText(record.title),
            start_date: asText(record.start_date),
            end_date: asText(record.end_date),
            description: asText(record.description),
          },
        ]
      : [];
  }),
  social_media: settings.social_media.flatMap((item) => {
    const record = asRecord(item);

    return record
      ? [
          {
            platform: toSocialMediaPlatform(asText(record.platform)),
            label: asText(record.label),
            url: asText(record.url),
          },
        ]
      : [];
  }),
});

/**
 * Every builder stamps `updated_at` explicitly because the auto-update trigger
 * documented in `docs/ERD.md` is optional and not installed on the database.
 */
const withTimestamp = <T extends object>(payload: T): T & { updated_at: string } => ({
  ...payload,
  updated_at: new Date().toISOString(),
});

/**
 * Insert payload for a section save when the singleton row does not exist yet.
 * `event_name`, `event_description`, `venue_name`, `address` and `prize_pool`
 * are `not null` without a default, so they start empty and are filled in
 * later from the info card.
 */
const EVENT_SETTINGS_INSERT_FALLBACK = {
  event_name: "",
  event_description: "",
  prize_pool: 0,
  venue_name: "",
  address: "",
  logo_url: null,
};

export const toEventSettingsInsert = (
  payload: TablesUpdate<"event_settings">,
): TablesInsert<"event_settings"> =>
  withTimestamp({
    ...EVENT_SETTINGS_INSERT_FALLBACK,
    contact: [],
    timeline: [],
    social_media: [],
    ...payload,
  });

export const toEventInfoUpdate = (
  values: EventInfoValues,
): TablesUpdate<"event_settings"> =>
  withTimestamp({
    event_name: values.event_name,
    event_description: values.event_description,
    prize_pool: Number(values.prize_pool),
    venue_name: values.venue_name,
    address: values.address,
    logo_url: toStoredImageUrl(values.logo_url),
  });

export const toContactUpdate = (
  items: ContactItemValues[],
): TablesUpdate<"event_settings"> =>
  withTimestamp({
    contact: items.map((item) => ({
      type: item.type,
      label: item.label,
      // Stored in international format, e.g. `+6285693415051`.
      value: isPhoneContactType(item.type)
        ? toInternationalPhone(item.value)
        : item.value,
    })),
  });

export const toTimelineUpdate = (
  items: TimelineItemValues[],
): TablesUpdate<"event_settings"> =>
  withTimestamp({
    timeline: items.map((item) => ({
      step: Number(item.step),
      title: item.title,
      start_date: item.start_date,
      end_date: item.end_date === "" ? null : item.end_date,
      description: item.description,
    })),
  });

export const toSocialMediaUpdate = (
  items: SocialMediaItemValues[],
): TablesUpdate<"event_settings"> =>
  withTimestamp({
    social_media: items.map((item) => ({
      platform: item.platform,
      label: item.label,
      url: item.url,
    })),
  });
