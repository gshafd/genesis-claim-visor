import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Pencil, XCircle } from 'lucide-react';

interface ManualReviewActionsProps {
  onApprove?: () => void;
  onEscalate?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
}

export function ManualReviewActions({
  onApprove,
  onEscalate,
  onEdit,
  onReject,
}: ManualReviewActionsProps) {
  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">Manual Review Actions</h3>
      <div className="flex flex-wrap gap-3">
        <Button
          size="lg"
          onClick={onApprove}
          className="flex-1 min-w-[140px] bg-success hover:bg-success/90 text-success-foreground rounded-xl h-12 font-medium"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          APPROVE
        </Button>
        <Button
          size="lg"
          onClick={onEscalate}
          className="flex-1 min-w-[140px] bg-warning hover:bg-warning/90 text-warning-foreground rounded-xl h-12 font-medium"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          ESCALATE
        </Button>
        <Button
          size="lg"
          onClick={onEdit}
          className="flex-1 min-w-[140px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 font-medium"
        >
          <Pencil className="w-5 h-5 mr-2" />
          EDIT
        </Button>
        <Button
          size="lg"
          onClick={onReject}
          className="flex-1 min-w-[140px] bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl h-12 font-medium"
        >
          <XCircle className="w-5 h-5 mr-2" />
          REJECT
        </Button>
      </div>
    </div>
  );
}
