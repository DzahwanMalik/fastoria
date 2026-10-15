import type { JSX } from "react";
import { useMemo, useState } from "react";
import { FiAlertCircle, FiEdit2, FiRefreshCw } from "react-icons/fi";
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
  EVENT_INFO_DEFAULTS,
  EventInfoForm,
  SocialMediaForm,
  TimelineForm,
} from "@/components/molecules/EventSettingsForms";
import EventSettingsSummary from "@/components/molecules/EventSettingsSummary";
import Modal from "@/components/molecules/Modal";
import { useEventSettings } from "@/hooks/useEventSettings";
import { formatDateTime } from "@/utils/date";
import {
  toContactUpdate,
  toEventInfoInsert,
  toEventInfoUpdate,
  toEventSettingsValues,
  toSocialMediaUpdate,
  toTimelineUpdate,
} from "@/utils/eventSettings";
import { removeMediaByUrl, toStoredImageUrl } from "@/utils/storage";
import { supabase } from "@/utils/supabase";

import { EVENT_SETTINGS_SECTION_META } from "./AdminEventSettingsPage.constants";

export default function AdminEventSettingsPage(): JSX.Element {
  const { settings, isLoading, error, refetch } = useEventSettings();
  const [activeSection, setActiveSection] = useState<EventSettingsSection | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const values = useMemo(
    () => (settings ? toEventSettingsValues(settings) : null),
    [settings],
  );

  const lastUpdated = formatDateTime(settings?.updated_at);
  const activeMeta = activeSection
    ? EVENT_SETTINGS_SECTION_META[activeSection]
    : null;

  const closeForm = () => setActiveSection(null);

  const finishSave = (saveError: PostgrestError | null, message: string) => {
    if (saveError) {
      toast.error("Gagal menyimpan pengaturan event. Coba lagi.");
      return;
    }

    toast.success(message);
    closeForm();
    refetch();
  };

  const handleInfoSubmit = async (infoValues: EventInfoValues) => {
    const isCreating = settings === null;
    const previousLogoUrl = settings?.logo_url ?? null;
    setIsSaving(true);

    const { error: saveError } = isCreating
      ? await supabase
          .from("event_settings")
          .insert(toEventInfoInsert(infoValues))
      : await supabase
          .from("event_settings")
          .update(toEventInfoUpdate(infoValues))
          .eq("id", settings.id);

    setIsSaving(false);

    if (!saveError && previousLogoUrl !== toStoredImageUrl(infoValues.logo_url)) {
      // Best-effort: drop the replaced file so the bucket does not grow.
      await removeMediaByUrl(previousLogoUrl);
    }

    finishSave(
      saveError,
      isCreating
        ? "Pengaturan event berhasil dibuat."
        : "Informasi event berhasil diperbarui.",
    );
  };

  const handleContactSubmit = async ({ contact }: ContactListValues) => {
    if (!settings) {
      return;
    }

    setIsSaving(true);
    const { error: saveError } = await supabase
      .from("event_settings")
      .update(toContactUpdate(contact))
      .eq("id", settings.id);
    setIsSaving(false);

    finishSave(saveError, "Kontak berhasil diperbarui.");
  };

  const handleTimelineSubmit = async ({ timeline }: TimelineListValues) => {
    if (!settings) {
      return;
    }

    setIsSaving(true);
    const { error: saveError } = await supabase
      .from("event_settings")
      .update(toTimelineUpdate(timeline))
      .eq("id", settings.id);
    setIsSaving(false);

    finishSave(saveError, "Timeline berhasil diperbarui.");
  };

  const handleSocialMediaSubmit = async ({
    social_media,
  }: SocialMediaListValues) => {
    if (!settings) {
      return;
    }

    setIsSaving(true);
    const { error: saveError } = await supabase
      .from("event_settings")
      .update(toSocialMediaUpdate(social_media))
      .eq("id", settings.id);
    setIsSaving(false);

    finishSave(saveError, "Sosial media berhasil diperbarui.");
  };

  return (
    <>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-xl text-headline-xl uppercase tracking-tight">
            Pengaturan
          </h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Informasi event yang tampil di halaman publik.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="md" onClick={refetch}>
            <FiRefreshCw aria-hidden="true" />
            Muat ulang
          </Button>

          <Button
            variant="primary"
            size="md"
            disabled={isLoading || Boolean(error)}
            onClick={() => setActiveSection("info")}
          >
            <FiEdit2 aria-hidden="true" />
            {settings ? "Edit Pengaturan" : "Buat Pengaturan"}
          </Button>
        </div>
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

      {!isLoading && !error && !values && (
        <Card
          shadow="md"
          className="flex flex-col items-center gap-3 p-10 text-center"
        >
          <FiAlertCircle aria-hidden="true" size={24} />
          <p className="font-headline-sm text-headline-sm uppercase tracking-tight">
            Belum ada pengaturan event
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Buat pengaturan pertama lewat tombol di atas.
          </p>
        </Card>
      )}

      {!isLoading && !error && values && (
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
            defaultValues={values?.info ?? EVENT_INFO_DEFAULTS}
            submitLabel={settings ? "Simpan Perubahan" : "Buat Pengaturan"}
            isLoading={isSaving}
            onSubmit={handleInfoSubmit}
            onCancel={closeForm}
          />
        )}

        {activeSection === "contact" && (
          <ContactForm
            key={settings?.id ?? "new"}
            defaultValues={{ contact: values?.contact ?? [] }}
            isLoading={isSaving}
            onSubmit={handleContactSubmit}
            onCancel={closeForm}
          />
        )}

        {activeSection === "timeline" && (
          <TimelineForm
            key={settings?.id ?? "new"}
            defaultValues={{ timeline: values?.timeline ?? [] }}
            isLoading={isSaving}
            onSubmit={handleTimelineSubmit}
            onCancel={closeForm}
          />
        )}

        {activeSection === "social_media" && (
          <SocialMediaForm
            key={settings?.id ?? "new"}
            defaultValues={{ social_media: values?.social_media ?? [] }}
            isLoading={isSaving}
            onSubmit={handleSocialMediaSubmit}
            onCancel={closeForm}
          />
        )}
      </Modal>
    </>
  );
}
