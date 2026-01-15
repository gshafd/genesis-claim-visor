import { Brain, AlertTriangle, CheckCircle, ShieldAlert, ShieldX, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LLMSeverityData } from '@/data/rulesEngine';
import { cn } from '@/lib/utils';

interface LLMSeverityCardProps {
  data: LLMSeverityData;
}

export function LLMSeverityCard({ data }: LLMSeverityCardProps) {
  const getRecommendationStyles = () => {
    switch (data.recommendation) {
      case 'APPROVE':
        return {
          bg: 'bg-success/10',
          border: 'border-success/20',
          text: 'text-success',
          badgeBg: 'bg-success text-success-foreground',
          icon: CheckCircle,
        };
      case 'REVIEW':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/20',
          text: 'text-warning',
          badgeBg: 'bg-warning text-warning-foreground',
          icon: AlertTriangle,
        };
      case 'ESCALATE':
        return {
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20',
          text: 'text-orange-500',
          badgeBg: 'bg-orange-500 text-white',
          icon: ShieldAlert,
        };
      case 'REJECT':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive/20',
          text: 'text-destructive',
          badgeBg: 'bg-destructive text-destructive-foreground',
          icon: ShieldX,
        };
    }
  };

  const styles = getRecommendationStyles();
  const RecommendationIcon = styles.icon;

  return (
    <div className="space-y-4">
      {/* Scores Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className={cn("p-4 rounded-lg border", styles.bg, styles.border)}>
          <p className="text-xs text-muted-foreground mb-1">Severity Score</p>
          <p className={cn("text-2xl font-bold", styles.text)}>{data.severityScore}/100</p>
        </div>
        <div className="p-4 rounded-lg border bg-accent/50 border-accent">
          <p className="text-xs text-muted-foreground mb-1">Confidence Score</p>
          <p className="text-2xl font-bold text-primary">{data.confidenceScore}%</p>
        </div>
      </div>

      {/* LLM Reasons */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          <p className="text-xs font-medium text-foreground">LLM-Generated Reasons</p>
        </div>
        <ul className="space-y-2">
          {data.reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary font-medium">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary */}
      <div className="bg-accent/30 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground mb-1">LLM Summary</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{data.summary}</p>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className={cn("flex items-center justify-between p-4 rounded-lg border", styles.bg, styles.border)}>
        <div className="flex items-center gap-3">
          <RecommendationIcon className={cn("w-6 h-6", styles.text)} />
          <div>
            <p className="text-xs text-muted-foreground">LLM Recommendation</p>
            <p className={cn("font-semibold", styles.text)}>{data.recommendation}</p>
          </div>
        </div>
        <Badge className={styles.badgeBg}>{data.recommendation}</Badge>
      </div>
    </div>
  );
}
