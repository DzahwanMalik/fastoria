import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  ContactListValues,
  EventInfoValues,
  SocialMediaListValues,
  TimelineListValues,
} from "./EventSettingsForms.schema";

/** One modal per property of the singleton `event_settings` row. */
export type EventSettingsSection =
  | "info"
  | "contact"
  | "timeline"
  | "social_media";

interface SectionFormProps<TValues> {
  defaultValues: TValues;
  onSubmit: (values: TValues) => void | Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  className?: string;
}

export interface EventInfoFormProps extends SectionFormProps<EventInfoValues> {
  submitLabel?: string;
}

export type ContactFormProps = SectionFormProps<ContactListValues>;
export type TimelineFormProps = SectionFormProps<TimelineListValues>;
export type SocialMediaFormProps = SectionFormProps<SocialMediaListValues>;

/**
 * Shared contract for the repeatable list sections. Each only needs the field
 * keys (`fields`) plus callbacks to add or remove a row.
 */
export interface FieldListBaseProps {
  fields: { id: string }[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
  className?: string;
}

export interface ContactFieldsProps extends FieldListBaseProps {
  register: UseFormRegister<ContactListValues>;
  errors?: FieldErrors<ContactListValues>["contact"];
  /** Row `type` values, in field order, to pick the phone input per row. */
  types?: string[];
}

export interface TimelineFieldsProps extends FieldListBaseProps {
  register: UseFormRegister<TimelineListValues>;
  errors?: FieldErrors<TimelineListValues>["timeline"];
}

export interface SocialMediaFieldsProps extends FieldListBaseProps {
  register: UseFormRegister<SocialMediaListValues>;
  errors?: FieldErrors<SocialMediaListValues>["social_media"];
  /** Row `platform` values, in field order, to pick the brand icon per row. */
  platforms?: string[];
}
