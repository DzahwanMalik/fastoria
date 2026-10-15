import type { JSX } from "react";
import { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiEdit2,
  FiExternalLink,
  FiFilter,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { useLocation } from "react-router";
import { toast } from "sonner";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import type { CompetitionFormValues } from "@/components/molecules/CompetitionForm";
import CompetitionForm from "@/components/molecules/CompetitionForm";
import ConfirmModal from "@/components/molecules/ConfirmModal";
import Modal from "@/components/molecules/Modal";
import { useCategories } from "@/hooks/useCategories";
import { useCompetitions } from "@/hooks/useCompetitions";
import type { Tables, TablesInsert } from "@/types/database";
import { formatRupiah } from "@/utils/currency";
import { supabase } from "@/utils/supabase";

import type { CompetitionFilterOption } from "./AdminCompetitionPage.constants";
import {
  ALL_CATEGORIES_FILTER,
  NO_CATEGORY_FILTER,
} from "./AdminCompetitionPage.constants";

interface CompetitionRouteState {
  create?: boolean;
}

type Competition = Tables<"competitions">;

const toFormValues = (competition: Competition): CompetitionFormValues => ({
  title: competition.title,
  description: competition.description,
  registration_fee: String(competition.registration_fee),
  registration_link: competition.registration_link,
  guidebook_link: competition.guidebook_link,
  teams: competition.teams === null ? "" : String(competition.teams),
  category_id: competition.category_id ?? "",
});

const toPayload = (
  values: CompetitionFormValues,
): TablesInsert<"competitions"> => ({
  title: values.title,
  description: values.description,
  registration_fee: Number(values.registration_fee),
  registration_link: values.registration_link,
  guidebook_link: values.guidebook_link,
  teams: values.teams ? Number(values.teams) : null,
  category_id: values.category_id ? values.category_id : null,
});

export default function AdminCompetitionPage(): JSX.Element {
  const location = useLocation();
  const { competitions, isLoading, error, refetch } = useCompetitions();
  const { categories } = useCategories();
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES_FILTER);
  const [isFormOpen, setIsFormOpen] = useState(
    () => Boolean((location.state as CompetitionRouteState | null)?.create),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Competition | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const editingCompetition = useMemo(
    () => competitions.find((competition) => competition.id === editingId),
    [competitions, editingId],
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.label,
      })),
    [categories],
  );

  const categoryLabels = useMemo(
    () => new Map(categories.map((category) => [category.id, category.label])),
    [categories],
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    competitions.forEach((competition) => {
      const key = competition.category_id ?? NO_CATEGORY_FILTER;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });

    return counts;
  }, [competitions]);

  const filterOptions = useMemo<CompetitionFilterOption[]>(() => {
    const options: CompetitionFilterOption[] = [
      {
        value: ALL_CATEGORIES_FILTER,
        label: "Semua",
        count: competitions.length,
      },
      ...categories.map((category) => ({
        value: category.id,
        label: category.label,
        count: categoryCounts.get(category.id) ?? 0,
      })),
    ];

    const uncategorizedCount = categoryCounts.get(NO_CATEGORY_FILTER) ?? 0;

    if (uncategorizedCount > 0) {
      options.push({
        value: NO_CATEGORY_FILTER,
        label: "Tanpa Kategori",
        count: uncategorizedCount,
      });
    }

    return options;
  }, [categories, categoryCounts, competitions.length]);

  const filteredCompetitions = useMemo(() => {
    if (categoryFilter === ALL_CATEGORIES_FILTER) {
      return competitions;
    }

    return competitions.filter(
      (competition) =>
        (competition.category_id ?? NO_CATEGORY_FILTER) === categoryFilter,
    );
  }, [categoryFilter, competitions]);

  const openCreateForm = () => {
    setEditingId(null);
    setDeleteTarget(null);
    setIsFormOpen(true);
  };

  const openEditForm = (competition: Competition) => {
    setEditingId(competition.id);
    setDeleteTarget(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (values: CompetitionFormValues) => {
    setIsSaving(true);

    const payload = toPayload(values);
    const { error: saveError } = editingId
      ? await supabase.from("competitions").update(payload).eq("id", editingId)
      : await supabase.from("competitions").insert(payload);

    setIsSaving(false);

    if (saveError) {
      toast.error(
        editingId
          ? "Gagal memperbarui lomba. Coba lagi."
          : "Gagal menyimpan lomba. Coba lagi.",
      );
      return;
    }

    toast.success(
      editingId ? "Lomba berhasil diperbarui." : "Lomba berhasil ditambahkan.",
    );
    closeForm();
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);

    const { error: deleteError } = await supabase
      .from("competitions")
      .delete()
      .eq("id", deleteTarget.id);

    setIsDeleting(false);

    if (deleteError) {
      toast.error("Gagal menghapus lomba. Coba lagi.");
      return;
    }

    toast.success(`"${deleteTarget.title}" berhasil dihapus.`);
    setDeleteTarget(null);

    if (editingId === deleteTarget.id) {
      closeForm();
    }

    refetch();
  };

  const isFiltered = categoryFilter !== ALL_CATEGORIES_FILTER;

  return (
    <>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-xl text-headline-xl uppercase tracking-tight">
            Lomba
          </h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Kelola cabang perlombaan yang tampil di halaman publik.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="md" onClick={refetch}>
            <FiRefreshCw aria-hidden="true" />
            Muat ulang
          </Button>

          <Button variant="primary" size="md" onClick={openCreateForm}>
            <FiPlus aria-hidden="true" />
            Tambah Lomba
          </Button>
        </div>
      </header>

      {!isLoading && !error && competitions.length > 0 && (
        <section aria-label="Filter kategori" className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <FiFilter aria-hidden="true" size={16} />
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
              Filter Kategori
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = option.value === categoryFilter;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setCategoryFilter(option.value)}
                  className={`inline-flex items-center gap-2 border-[2.5px] border-black px-4 py-2 font-label-caps text-label-caps uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-primary-container shadow-neo-sm"
                      : "bg-surface-white hover:bg-surface-container"
                  }`}
                >
                  {option.label}
                  <span
                    className={`min-w-6 border-2 border-black px-1 text-center ${
                      isActive ? "bg-surface-white" : "bg-surface-container-low"
                    }`}
                  >
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>

          {isFiltered && (
            <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
              Menampilkan {filteredCompetitions.length} dari {competitions.length}{" "}
              lomba.
            </p>
          )}
        </section>
      )}

      {isLoading && (
        <Card shadow="md" className="p-8 text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Memuat daftar lomba...
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

      {!isLoading && !error && competitions.length === 0 && (
        <Card
          shadow="md"
          className="flex flex-col items-center gap-3 p-10 text-center"
        >
          <FiAlertCircle aria-hidden="true" size={24} />
          <p className="font-headline-sm text-headline-sm uppercase tracking-tight">
            Belum ada lomba
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Tambahkan lomba pertama lewat tombol di atas.
          </p>
        </Card>
      )}

      {!isLoading && !error && competitions.length > 0 && (
        <>
          {filteredCompetitions.length === 0 ? (
            <Card
              shadow="md"
              className="flex flex-col items-center gap-3 p-10 text-center"
            >
              <FiAlertCircle aria-hidden="true" size={24} />
              <p className="font-headline-sm text-headline-sm uppercase tracking-tight">
                Tidak ada lomba
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tidak ada lomba pada kategori ini.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setCategoryFilter(ALL_CATEGORIES_FILTER)}
              >
                Tampilkan semua
              </Button>
            </Card>
          ) : (
            <ul className="flex flex-col gap-gutter">
              {filteredCompetitions.map((competition) => (
                <li key={competition.id}>
                  <Card shadow="sm" className="flex flex-col gap-3 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight">
                        {competition.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={isSaving || isDeleting}
                          onClick={() => openEditForm(competition)}
                        >
                          <FiEdit2 aria-hidden="true" />
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          disabled={isSaving || isDeleting}
                          onClick={() => setDeleteTarget(competition)}
                        >
                          <FiTrash2 aria-hidden="true" />
                          Hapus
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge color="soft-lilac" size="sm" shadow="none">
                        {competition.category_id
                          ? (categoryLabels.get(competition.category_id) ??
                            "Tanpa kategori")
                          : "Tanpa kategori"}
                      </Badge>

                      <Badge color="vivid-mint" size="sm" shadow="none">
                        {formatRupiah(competition.registration_fee)}
                      </Badge>

                      <Badge color="electric-cyan" size="sm" shadow="none">
                        <FiUsers aria-hidden="true" size={12} />
                        {competition.teams ?? "Individu"}
                      </Badge>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {competition.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-1">
                      <a
                        href={competition.registration_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-label-caps text-label-caps uppercase tracking-wider underline underline-offset-4"
                      >
                        Pendaftaran
                        <FiExternalLink aria-hidden="true" size={12} />
                      </a>

                      <a
                        href={competition.guidebook_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-label-caps text-label-caps uppercase tracking-wider underline underline-offset-4"
                      >
                        Guidebook
                        <FiExternalLink aria-hidden="true" size={12} />
                      </a>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingId ? "Edit Lomba" : "Tambah Lomba"}
        description={
          editingId
            ? "Perbarui detail lomba yang sudah ada."
            : "Isi detail lomba yang akan tampil di halaman publik."
        }
      >
        <CompetitionForm
          key={editingId ?? "new"}
          categories={categoryOptions}
          defaultValues={
            editingCompetition ? toFormValues(editingCompetition) : undefined
          }
          submitLabel={editingId ? "Perbarui Lomba" : "Simpan Lomba"}
          isLoading={isSaving}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Hapus Lomba"
        message={
          deleteTarget
            ? `"${deleteTarget.title}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`
            : ""
        }
        confirmLabel="Ya, hapus"
        cancelLabel="Batal"
        loadingLabel="Menghapus..."
        isLoading={isDeleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
