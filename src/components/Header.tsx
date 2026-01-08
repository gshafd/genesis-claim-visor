import { UploadModal, UploadFormData } from './UploadModal';
import { Shield } from 'lucide-react';

interface HeaderProps {
  onUpload: (data: UploadFormData) => void;
}

export function Header({ onUpload }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-foreground">Insurance Anomaly Detection</h1>
          <p className="text-xs text-muted-foreground">GenAI-Powered Claims Analysis</p>
        </div>
      </div>
      <UploadModal onUpload={onUpload} />
    </header>
  );
}
