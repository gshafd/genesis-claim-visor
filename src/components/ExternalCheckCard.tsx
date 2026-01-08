import { CheckCircle2, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ExternalCheckCardProps {
  title: string;
  icon: ReactNode;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  details: { label: string; value: string | boolean }[];
}

const statusConfig = {
  pass: {
    icon: CheckCircle2,
    className: 'border-success/30 bg-success/5',
    badgeClass: 'bg-success/10 text-success',
    label: 'Pass',
  },
  fail: {
    icon: XCircle,
    className: 'border-destructive/30 bg-destructive/5',
    badgeClass: 'bg-destructive/10 text-destructive',
    label: 'Fail',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-warning/30 bg-warning/5',
    badgeClass: 'bg-warning/10 text-warning',
    label: 'Warning',
  },
  pending: {
    icon: Clock,
    className: 'border-border bg-secondary/50',
    badgeClass: 'bg-secondary text-muted-foreground',
    label: 'Pending',
  },
};

export function ExternalCheckCard({ title, icon, status, details }: ExternalCheckCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        'rounded-xl border p-4 transition-all duration-300',
        config.className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
            {icon}
          </div>
          <h4 className="font-medium text-sm">{title}</h4>
        </div>
        <span className={cn('status-badge', config.badgeClass)}>
          <StatusIcon className="w-3 h-3" />
          {config.label}
        </span>
      </div>

      <div className="space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{detail.label}</span>
            <span className="font-medium">
              {typeof detail.value === 'boolean' ? (
                detail.value ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-success inline" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-destructive inline" />
                )
              ) : (
                detail.value
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
