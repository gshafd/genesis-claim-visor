import { ReactNode } from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowStepProps {
  title: string;
  status: 'pending' | 'processing' | 'completed';
  stepNumber: number;
  isLast?: boolean;
  children: ReactNode;
  delay?: number;
}

export function WorkflowStep({ title, status, stepNumber, isLast, children, delay = 0 }: WorkflowStepProps) {
  return (
    <div
      className="workflow-step-enter opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex gap-4">
        {/* Timeline indicator */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
              status === 'completed' && 'bg-success text-success-foreground',
              status === 'processing' && 'bg-primary text-primary-foreground pulse-glow',
              status === 'pending' && 'bg-secondary text-muted-foreground'
            )}
          >
            {status === 'completed' && <CheckCircle2 className="w-5 h-5" />}
            {status === 'processing' && <Loader2 className="w-5 h-5 spinner" />}
            {status === 'pending' && <Circle className="w-5 h-5" />}
          </div>
          {!isLast && (
            <div
              className={cn(
                'w-0.5 flex-1 min-h-[24px] mt-2 transition-colors duration-300',
                status === 'completed' ? 'bg-success' : 'bg-border'
              )}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Step {stepNumber}
            </span>
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          <div
            className={cn(
              'bg-card border border-border rounded-xl p-5 shadow-soft transition-all duration-300',
              status === 'processing' && 'border-primary/30 shadow-lg'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
