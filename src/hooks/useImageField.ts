import { useState } from "react";

import type { MediaFolder, MediaUploadResult } from "@/utils/storage";
import { uploadMedia } from "@/utils/storage";

/**
 * The image is uploaded when the form is submitted, not when the file is
 * picked, so cancelling a modal never leaves an orphan file in Storage.
 */
type ImageSelection =
  | { kind: "keep" }
  | { kind: "replace"; file: File }
  | { kind: "remove" };

export interface ImageFieldState {
  /** URL to preview: the pending file's, or the persisted one. */
  currentUrl: string | null;
  /** Pending file, uploaded by `resolve`. */
  file: File | null;
  selectFile: (file: File | null) => void;
  clear: () => void;
  /** Uploads the pending file if needed and returns the URL to persist. */
  resolve: () => Promise<MediaUploadResult>;
}

export function useImageField(
  persistedUrl: string | null,
  folder: MediaFolder,
): ImageFieldState {
  const [selection, setSelection] = useState<ImageSelection>({
    kind: "keep",
  });

  const selectFile = (file: File | null) => {
    setSelection(file ? { kind: "replace", file } : { kind: "keep" });
  };

  const clear = () => setSelection({ kind: "remove" });

  const resolve = async (): Promise<MediaUploadResult> => {
    if (selection.kind === "remove") {
      return { url: null, error: null };
    }

    if (selection.kind === "replace") {
      return uploadMedia(selection.file, folder);
    }

    return { url: persistedUrl, error: null };
  };

  return {
    currentUrl: selection.kind === "remove" ? null : persistedUrl,
    file: selection.kind === "replace" ? selection.file : null,
    selectFile,
    clear,
    resolve,
  };
}
