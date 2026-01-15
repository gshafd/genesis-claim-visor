import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface RuleResult {
  id: string;
  description: string;
  triggered: boolean;
  evidence?: string;
}

interface RulesEvaluationStepProps {
  rules: RuleResult[];
}

export function RulesEvaluationStep({ rules }: RulesEvaluationStepProps) {
  const triggeredCount = rules.filter(r => r.triggered).length;
  const [openRules, setOpenRules] = useState<Set<string>>(new Set());

  const toggleRule = (ruleId: string) => {
    setOpenRules(prev => {
      const next = new Set(prev);
      if (next.has(ruleId)) {
        next.delete(ruleId);
      } else {
        next.add(ruleId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {triggeredCount} of {rules.length} rules triggered
        </span>
      </div>
      
      <div className="space-y-2">
        {rules.map((rule) => {
          const isOpen = openRules.has(rule.id);
          
          if (rule.triggered && rule.evidence) {
            return (
              <Collapsible
                key={rule.id}
                open={isOpen}
                onOpenChange={() => toggleRule(rule.id)}
              >
                <div
                  className={cn(
                    "rounded-lg border transition-colors overflow-hidden",
                    "bg-destructive/5 border-destructive/20"
                  )}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-destructive/10 transition-colors">
                      <div className="flex items-center gap-3">
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4 text-destructive" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-destructive" />
                        )}
                        <span className="font-mono text-xs text-muted-foreground w-12 text-left">
                          {rule.id}
                        </span>
                        <span className="text-sm text-foreground text-left">
                          {rule.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-destructive">FAIL</span>
                        <XCircle className="w-5 h-5 text-destructive" />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-3 pb-3 pt-1 border-t border-destructive/10">
                      <div className="bg-destructive/10 rounded-md p-3 ml-7">
                        <p className="text-xs font-medium text-destructive mb-1">Evidence</p>
                        <p className="text-sm text-foreground/80">{rule.evidence}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          }

          return (
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
                <div className="w-4" /> {/* Spacer to align with expandable items */}
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
          );
        })}
      </div>
    </div>
  );
}
