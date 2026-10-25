export interface RulebookBannerProps {
  title?: string;
  description?: string;
  downloadLabel?: string;
  downloadUrl?: string;
  onDownloadClick?: () => void;
  className?: string;
}
