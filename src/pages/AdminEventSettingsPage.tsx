import type { JSX } from "react";
import { useMemo, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import type { PostgrestError } from "@supabase/supabase-js";
import { toast } from "sonner";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import type {
  ContactListValues,
  EventInfoValues,
  EventSettingsSection,
  SocialMediaListValues,
  TimelineListValues,
} from "@/components/molecules/EventSettingsForms";
import {
  ContactForm,
  EventInfoForm,
  SocialMediaForm,
  TimelineForm,
} from "@/components/molecules/EventSettingsForms";
import EventSettingsSummary from "@/components/molecules/EventSettingsSummary";
import Modal from "@/components/molecules/Modal";
import { useEventSettings } from "@/hooks/useEventSettings";
import type { TablesUpdate } from "@/types/database";
import { formatDateTime } from "@/utils/date";
import {
  toContactUpdate,
  toEventInfoUpdate,
  toEventSettingsInsert,
  toEventSettingsValues,
  toSocialMediaUpdate,
  toTimelineUpdate,
} from "@/utils/eventSettings";
import { removeMediaByUrl, toStoredImageUrl } from "@/utils/storage";
import { supabase } from "@/utils/supabase";

import {
  EMPTY_EVENT_SETTINGS_VALUES,
  EVENT_SETTINGS_SECTION_META,
} from "./AdminEventSettingsPage.constants";

export default function AdminEventSettingsPage(): JSX.Element {
  const { settings, isLoading, error, refetch } = useEventSettings();
  const [activeSection, setActiveSection] =
    useState<EventSettingsSection | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const values = useMemo(
    () =>
      settings
        ? toEventSettingsValues(settings)
        : EMPTY_EVENT_SETTINGS_VALUES,
    [settings],
  );

  const lastUpdated = formatDateTime(settings?.updated_at);
  const activeMeta = activeSection
    ? EVENT_SETTINGS_SECTION_META[activeSection]
    : null;

  const closeForm = () => setActiveSection(null);

  /**
   * Every section writes on its own: the row is updated when it exists and
   * created (with the remaining sections left empty) when it does not, so no
   * section needs a separate "create" entry point.
   */
  const saveSection = async (payload: TablesUpdate<"event_settings">) =>
    settings
      ? supabase.from("event_settings").update(payload).eq("id", settings.id)
      : supabase.from("event_settings").insert(toEventSettingsInsert(payload));

  const finishSave = (saveError: PostgrestError | null, message: string) => {
    if (saveError) {
      toast.error("Gagal menyimpan pengaturan event. Coba lagi.");
      return;
    }

    toast.success(
      settings === null ? "Pengaturan event berhasil dibuat." : message,
    );
    closeForm();
    refetch();
  };

  const handleInfoSubmit = async (infoValues: EventInfoValues) => {
    const previousLogoUrl = settings?.logo_url ?? null;
    setIsSaving(true);
    const { error: saveError } = await saveSection(
      toEventInfoUpdate(infoValues),
    );
    setIsSaving(false);

    if (!saveError && previousLogoUrl !== toStoredImageUrl(infoValues.logo_url)) {
      // Best-effort: drop the replaced file so the bucket does not grow.
      await removeMediaByUrl(previousLogoUrl);
    }

    finishSave(saveError, "Informasi event berhasil diperbarui.");
  };

  const handleContactSubmit = async ({ contact }: ContactListValues) => {
    setIsSaving(true);
    const { error: saveError } = await saveSection(toContactUpdate(contact));
    setIsSaving(false);

    finishSave(saveError, "Kontak berhasil diperbarui.");
  };

  const handleTimelineSubmit = async ({ timeline }: TimelineListValues) => {
    setIsSaving(true);
    const { error: saveError } = await saveSection(toTimelineUpdate(timeline));
    setIsSaving(false);

    finishSave(saveError, "Timeline berhasil diperbarui.");
  };

  const handleSocialMediaSubmit = async ({
    social_media,
  }: SocialMediaListValues) => {
    setIsSaving(true);
    const { error: saveError } = await saveSection(
      toSocialMediaUpdate(social_media),
    );
    setIsSaving(false);

    finishSave(saveError, "Sosial media berhasil diperbarui.");
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="font-headline-xl text-headline-xl uppercase tracking-tight">
          Pengaturan
        </h1>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
          Informasi event yang tampil di halaman publik. Setiap bagian
          disimpan sendiri lewat tombol Edit di kartunya.
        </p>
      </header>

      {isLoading && (
        <Card shadow="md" className="p-8 text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Memuat pengaturan event...
          </p>
        </Card>
      )}

      {!isLoading && error && (
        <Card
          shadow="md"
          className="flex flex-col items-center gap-4 p-8 text-center"
        >
          <p className="font-body-md text-body-md text-tertiary">{error}</p>
          <Button variant="secondary" size="md" onClick={refetch}>
            <FiRefreshCw aria-hidden="true" />
            Coba lagi
          </Button>
        </Card>
      )}

      {!isLoading && !error && (
        <>
          {lastUpdated && (
            <p className="mb-6 font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
              Terakhir diperbarui: {lastUpdated}
            </p>
          )}

          <EventSettingsSummary
            values={values}
            onEditSection={setActiveSection}
          />
        </>
      )}

      <Modal
        isOpen={activeSection !== null}
        onClose={closeForm}
        title={activeMeta?.title ?? ""}
        description={activeMeta?.description}
        size={activeSection === "info" ? "md" : "lg"}
      >
        {activeSection === "info" && (
          <EventInfoForm
            key={settings?.id ?? "new"}
            defaultValues={values.info}
            submitLabel={settings ? "Simpan Perubahan" : "Simpan Informasi"}
            isLoading={isSaving}
            onSubmit={handleInfoSubmit}
            onCancel={closeForm}
          />
        )}

        {activeSection === "contact" && (
          <ContactForm
            key={settings?.id ?? "new"}
            defaultValues={{ contact: values.contact }}
            isLoading={isSaving}
            onSubmit={handleContactSubmit}
            onCancel={closeForm}
          />
        )}

        {activeSection === "timeline" && (
          <TimelineForm
            key={settings?.id ?? "new"}
            defaultValues={{ timeline: values.timeline }}
            isLoading={isSaving}
            onSubmit={handleTimelineSubmit}
            onCancel={closeForm}
          />
        )}

        {activeSection === "social_media" && (
          <SocialMediaForm
            key={settings?.id ?? "new"}
            defaultValues={{ social_media: values.social_media }}
            isLoading={isSaving}
            onSubmit={handleSocialMediaSubmit}
            onCancel={closeForm}
          />
        )}
      </Modal>
    </>
  );
}
