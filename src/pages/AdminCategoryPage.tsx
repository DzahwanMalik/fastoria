import type { JSX } from "react";
import { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiAward,
  FiEdit2,
  FiHash,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "sonner";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import type { CategoryFormValues } from "@/components/molecules/CategoryForm";
import CategoryForm from "@/components/molecules/CategoryForm";
import ConfirmModal from "@/components/molecules/ConfirmModal";
import Modal from "@/components/molecules/Modal";
import { useCategories } from "@/hooks/useCategories";
import { useCompetitions } from "@/hooks/useCompetitions";
import type { Tables, TablesInsert } from "@/types/database";
import { supabase } from "@/utils/supabase";

import { UNIQUE_VIOLATION_CODE } from "./AdminCategoryPage.constants";

type Category = Tables<"categories">;

const buildDeleteMessage = (
  category: Category,
  affectedCompetitions: number,
): string => {
  if (affectedCompetitions === 0) {
    return `"${category.label}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`;
  }

  return `"${category.label}" akan dihapus permanen, dan ${affectedCompetitions} lomba terkait akan menjadi tanpa kategori. Tindakan ini tidak dapat dibatalkan.`;
};

export default function AdminCategoryPage(): JSX.Element {
  const { categories, isLoading, error, refetch } = useCategories();
  const { competitions } = useCompetitions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const editingCategory = useMemo(
    () => categories.find((category) => category.id === editingId),
    [categories, editingId],
  );

  const competitionCounts = useMemo(() => {
    const counts = new Map<string, number>();

    competitions.forEach((competition) => {
      if (competition.category_id) {
        counts.set(
          competition.category_id,
          (counts.get(competition.category_id) ?? 0) + 1,
        );
      }
    });

    return counts;
  }, [competitions]);

  const openCreateForm = () => {
    setEditingId(null);
    setDeleteTarget(null);
    setIsFormOpen(true);
  };

  const openEditForm = (category: Category) => {
    setEditingId(category.id);
    setDeleteTarget(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (values: CategoryFormValues) => {
    setIsSaving(true);

    const payload: TablesInsert<"categories"> = {
      label: values.label,
      slug: values.slug,
    };

    const { error: saveError } = editingId
      ? await supabase.from("categories").update(payload).eq("id", editingId)
      : await supabase.from("categories").insert(payload);

    setIsSaving(false);

    if (saveError) {
      toast.error(
        saveError.code === UNIQUE_VIOLATION_CODE
          ? `Slug "${values.slug}" sudah dipakai kategori lain.`
          : editingId
            ? "Gagal memperbarui kategori. Coba lagi."
            : "Gagal menyimpan kategori. Coba lagi.",
      );
      return;
    }

    toast.success(
      editingId ? "Kategori berhasil diperbarui." : "Kategori berhasil dibuat.",
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
      .from("categories")
      .delete()
      .eq("id", deleteTarget.id);

    setIsDeleting(false);

    if (deleteError) {
      toast.error("Gagal menghapus kategori. Coba lagi.");
      return;
    }

    toast.success(`"${deleteTarget.label}" berhasil dihapus.`);
    setDeleteTarget(null);

    if (editingId === deleteTarget.id) {
      closeForm();
    }

    refetch();
  };

  return (
    <>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-xl text-headline-xl uppercase tracking-tight">
            Kategori
          </h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Kelola cabang perlombaan yang dipakai untuk mengelompokkan lomba.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="md" onClick={refetch}>
            <FiRefreshCw aria-hidden="true" />
            Muat ulang
          </Button>

          <Button variant="primary" size="md" onClick={openCreateForm}>
            <FiPlus aria-hidden="true" />
            Tambah Kategori
          </Button>
        </div>
      </header>

      {isLoading && (
        <Card shadow="md" className="p-8 text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Memuat kategori...
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

      {!isLoading && !error && categories.length === 0 && (
        <Card
          shadow="md"
          className="flex flex-col items-center gap-3 p-10 text-center"
        >
          <FiAlertCircle aria-hidden="true" size={24} />
          <p className="font-headline-sm text-headline-sm uppercase tracking-tight">
            Belum ada kategori
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Tambahkan kategori pertama lewat tombol di atas.
          </p>
        </Card>
      )}

      {!isLoading && !error && categories.length > 0 && (
        <ul className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const competitionCount = competitionCounts.get(category.id) ?? 0;

            return (
              <li key={category.id}>
                <Card shadow="sm" className="flex h-full flex-col gap-3 p-5">
                  <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight">
                    {category.label}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge color="surface-container" size="sm" shadow="none">
                      <FiHash aria-hidden="true" size={12} />
                      {category.slug}
                    </Badge>

                    <Badge
                      color={competitionCount > 0 ? "soft-lilac" : "white"}
                      size="sm"
                      shadow="none"
                    >
                      <FiAward aria-hidden="true" size={12} />
                      {competitionCount} lomba
                    </Badge>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={isSaving || isDeleting}
                      onClick={() => openEditForm(category)}
                    >
                      <FiEdit2 aria-hidden="true" />
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      disabled={isSaving || isDeleting}
                      onClick={() => setDeleteTarget(category)}
                    >
                      <FiTrash2 aria-hidden="true" />
                      Hapus
                    </Button>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingId ? "Edit Kategori" : "Tambah Kategori"}
        description={
          editingId
            ? "Perbarui nama atau slug kategori."
            : "Buat kategori baru untuk mengelompokkan lomba."
        }
      >
        <CategoryForm
          key={editingId ?? "new"}
          defaultValues={
            editingCategory
              ? {
                  label: editingCategory.label,
                  slug: editingCategory.slug,
                }
              : undefined
          }
          autoGenerateSlug={!editingId}
          submitLabel={editingId ? "Perbarui Kategori" : "Simpan Kategori"}
          isLoading={isSaving}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="Hapus Kategori"
        message={
          deleteTarget
            ? buildDeleteMessage(
                deleteTarget,
                competitionCounts.get(deleteTarget.id) ?? 0,
              )
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
