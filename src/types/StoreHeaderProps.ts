export interface StoreHeaderProps {
  portada: string | null;
  logo: string | null;
  onUploadPortada: (file: File) => void;
  onUploadLogo: (file: File) => void;
}
