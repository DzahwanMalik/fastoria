import { supabase } from "@/utils/supabase";

export const MEDIA_BUCKET = "media";

/** Must stay in sync with the `file_size_limit` of the bucket. */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_IMAGE_LABEL = "5 MB";

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

/** Must stay in sync with the `allowed_mime_types` of the bucket. */
export const ALLOWED_IMAGE_MIME_TYPES = Object.keys(EXTENSION_BY_MIME);

/** One folder per resource kind, so the bucket stays browsable. */
export type MediaFolder = "competitions" | "event-settings";

export interface MediaUploadResult {
  url: string | null;
  error: string | null;
}

/** An empty form value means "no image", which is stored as `null`. */
export function toStoredImageUrl(value: string): string | null {
  return value === "" ? null : value;
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
    return "Format gambar harus JPG, PNG, WEBP, atau SVG.";
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return `Ukuran gambar maksimal ${MAX_IMAGE_LABEL}.`;
  }

  return null;
}

/**
 * Uploads to the public `media` bucket under `folder/` and returns the public
 * URL to store in the row. Object names are random, so they can be cached
 * aggressively and a replaced image never gets served from cache.
 */
export async function uploadMedia(
  file: File,
  folder: MediaFolder,
): Promise<MediaUploadResult> {
  const extension = EXTENSION_BY_MIME[file.type] ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return { url: null, error: "Gagal mengunggah gambar. Coba lagi." };
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  return { url: data.publicUrl, error: null };
}

/**
 * Maps a stored URL back to its object path. Returns `null` for anything that
 * is not in our bucket (e.g. an externally hosted image), so callers never try
 * to delete a file we do not own.
 */
export function toMediaPath(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`;
  const index = url.indexOf(marker);

  return index === -1 ? null : url.slice(index + marker.length);
}

/** Best-effort cleanup of a replaced image. Never throws. */
export async function removeMediaByUrl(
  url: string | null | undefined,
): Promise<void> {
  const path = toMediaPath(url);

  if (!path) {
    return;
  }

  await supabase.storage.from(MEDIA_BUCKET).remove([path]);
}
