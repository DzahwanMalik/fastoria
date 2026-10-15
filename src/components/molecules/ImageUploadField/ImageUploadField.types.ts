export type ImageUploadAspect = "video" | "square";
export type ImageUploadFit = "cover" | "contain";

export interface ImageUploadFieldProps {
  label: string;
  hint?: string;
  /** Image already saved in the database, when editing. */
  currentUrl?: string | null;
  /** Newly picked file, not uploaded yet. */
  file: File | null;
  onSelectFile: (file: File | null) => void;
  /** Drops both the pending file and the saved image. */
  onClear: () => void;
  aspect?: ImageUploadAspect;
  fit?: ImageUploadFit;
  disabled?: boolean;
  error?: string;
  className?: string;
}
