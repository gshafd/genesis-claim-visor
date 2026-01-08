import { FileSearch, ArrowLeft } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
          <FileSearch className="w-8 h-8 text-accent-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Select a Claim to Analyze</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Choose a claim from the sidebar or upload a new one to start the AI-powered anomaly detection workflow.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
          <span>Select from the claims panel</span>
        </div>
      </div>
    </div>
  );
}
