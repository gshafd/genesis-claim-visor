import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RuleResult {
  id: string;
  description: string;
  triggered: boolean;
}

interface RulesEvaluationStepProps {
  rules: RuleResult[];
}

export function RulesEvaluationStep({ rules }: RulesEvaluationStepProps) {
  const triggeredCount = rules.filter(r => r.triggered).length;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {triggeredCount} of {rules.length} rules triggered
        </span>
      </div>
      
      <div className="space-y-2">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border transition-colors",
              rule.triggered 
                ? "bg-destructive/5 border-destructive/20" 
                : "bg-success/5 border-success/20"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground w-12">
                {rule.id}
              </span>
              <span className="text-sm text-foreground">
                {rule.description}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {rule.triggered ? (
                <>
                  <span className="text-xs font-medium text-destructive">FAIL</span>
                  <XCircle className="w-5 h-5 text-destructive" />
                </>
              ) : (
                <>
                  <span className="text-xs font-medium text-success">PASS</span>
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
