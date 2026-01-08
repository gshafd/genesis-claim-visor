import { Claim, RiskLevel } from '@/types/claim';
import { FileText, AlertTriangle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClaimCardProps {
  claim: Claim;
  isSelected: boolean;
  onClick: () => void;
}

const riskConfig: Record<RiskLevel, { label: string; className: string; icon: typeof AlertTriangle }> = {
  low: { label: 'Low Risk', className: 'status-low', icon: CheckCircle2 },
  medium: { label: 'Medium Risk', className: 'status-medium', icon: AlertTriangle },
  high: { label: 'High Risk', className: 'status-high', icon: AlertCircle },
  pending: { label: 'Not Processed', className: 'status-pending', icon: Clock },
};

export function ClaimCard({ claim, isSelected, onClick }: ClaimCardProps) {
  const risk = riskConfig[claim.riskLevel];
  const RiskIcon = risk.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-lg border transition-all duration-200',
        'hover:border-primary/30 hover:bg-accent/50',
        isSelected
          ? 'border-primary bg-accent shadow-soft'
          : 'border-border bg-card'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary'
          )}>
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">{claim.id}</p>
            <p className="text-xs text-muted-foreground">
              {claim.vehicleMake} {claim.vehicleModel} {claim.vehicleYear}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{claim.dateOfLoss}</span>
        <span className={cn('status-badge', risk.className)}>
          <RiskIcon className="w-3 h-3" />
          {risk.label}
        </span>
      </div>
    </button>
  );
}
