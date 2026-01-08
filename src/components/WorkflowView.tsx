import { useState, useEffect } from 'react';
import { Claim } from '@/types/claim';
import { WorkflowStep } from './WorkflowStep';
import { ExternalCheckCard } from './ExternalCheckCard';
import { Cloud, Car, History, Shield, FileSearch, Brain, Zap, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface WorkflowViewProps {
  claim: Claim;
}

type StepStatus = 'pending' | 'processing' | 'completed';

interface StepState {
  ingestion: StepStatus;
  parsing: StepStatus;
  external: StepStatus;
  analysis: StepStatus;
}

export function WorkflowView({ claim }: WorkflowViewProps) {
  const [steps, setSteps] = useState<StepState>({
    ingestion: 'pending',
    parsing: 'pending',
    external: 'pending',
    analysis: 'pending',
  });

  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    // Reset and start workflow animation
    setSteps({
      ingestion: 'pending',
      parsing: 'pending',
      external: 'pending',
      analysis: 'pending',
    });
    setVisibleSteps(0);

    const timers: NodeJS.Timeout[] = [];

    // Step 1: Ingestion
    timers.push(setTimeout(() => {
      setVisibleSteps(1);
      setSteps(s => ({ ...s, ingestion: 'processing' }));
    }, 200));

    timers.push(setTimeout(() => {
      setSteps(s => ({ ...s, ingestion: 'completed' }));
    }, 1500));

    // Step 2: Parsing
    timers.push(setTimeout(() => {
      setVisibleSteps(2);
      setSteps(s => ({ ...s, parsing: 'processing' }));
    }, 2000));

    timers.push(setTimeout(() => {
      setSteps(s => ({ ...s, parsing: 'completed' }));
    }, 3500));

    // Step 3: External Checks
    timers.push(setTimeout(() => {
      setVisibleSteps(3);
      setSteps(s => ({ ...s, external: 'processing' }));
    }, 4000));

    timers.push(setTimeout(() => {
      setSteps(s => ({ ...s, external: 'completed' }));
    }, 6000));

    // Step 4: Analysis
    timers.push(setTimeout(() => {
      setVisibleSteps(4);
      setSteps(s => ({ ...s, analysis: 'processing' }));
    }, 6500));

    timers.push(setTimeout(() => {
      setSteps(s => ({ ...s, analysis: 'completed' }));
    }, 8000));

    return () => timers.forEach(clearTimeout);
  }, [claim.id]);

  return (
    <ScrollArea className="h-full">
      <div className="max-w-3xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {claim.id}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {claim.vehicleMake} {claim.vehicleModel} {claim.vehicleYear}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Anomaly Detection Workflow</h1>
          <p className="text-muted-foreground mt-1">Processing claim with AI-powered analysis</p>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-2">
          {/* Step 1: Claim Ingestion */}
          {visibleSteps >= 1 && (
            <WorkflowStep
              title="Claim Ingestion"
              status={steps.ingestion}
              stepNumber={1}
              delay={0}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Claim ID</p>
                  <p className="font-medium text-sm">{claim.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">VIN</p>
                  <p className="font-mono text-sm">{claim.vin}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Claim Amount</p>
                  <p className="font-medium text-sm">${claim.claimAmount?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-medium text-sm">{claim.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Narrative Extracted</p>
                  <p className="text-sm text-foreground/80 italic">"{claim.narrative}"</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date of Loss</p>
                  <p className="font-medium text-sm">{claim.dateOfLoss}</p>
                </div>
              </div>
            </WorkflowStep>
          )}

          {/* Step 2: Document Parsing */}
          {visibleSteps >= 2 && (
            <WorkflowStep
              title="Document Parsing (AI Extraction)"
              status={steps.parsing}
              stepNumber={2}
              delay={0}
            >
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Damage Indicators Detected</p>
                  <div className="flex flex-wrap gap-2">
                    {['roof crush', 'windshield shattered', 'hood dent'].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Weather Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {['storm', 'tree fall'].map((tag) => (
                      <Badge key={tag} className="text-xs bg-accent text-accent-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">AI Note</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Damage pattern matches natural storm impact. Keywords consistent with claim narrative.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </WorkflowStep>
          )}

          {/* Step 3: External Checks */}
          {visibleSteps >= 3 && (
            <WorkflowStep
              title="External Verification Checks"
              status={steps.external}
              stepNumber={3}
              delay={0}
            >
              <div className="grid grid-cols-2 gap-3">
                <ExternalCheckCard
                  title="Weather Check"
                  icon={<Cloud className="w-4 h-4 text-primary" />}
                  status="pass"
                  details={[
                    { label: 'Condition', value: 'Heavy Rain' },
                    { label: 'Wind Speed', value: '28 mph' },
                    { label: 'Storm Alert', value: true },
                    { label: 'Narrative Match', value: true },
                  ]}
                />
                <ExternalCheckCard
                  title="VIN Check"
                  icon={<Car className="w-4 h-4 text-primary" />}
                  status="pass"
                  details={[
                    { label: 'VIN', value: claim.vin?.slice(0, 11) + '...' || 'N/A' },
                    { label: 'Decode', value: `${claim.vehicleMake} ${claim.vehicleModel}` },
                    { label: 'Reported Stolen', value: false },
                    { label: 'Prior Claims', value: '0' },
                  ]}
                />
                <ExternalCheckCard
                  title="Claims History"
                  icon={<History className="w-4 h-4 text-primary" />}
                  status="pass"
                  details={[
                    { label: 'Prior Claims', value: '1' },
                    { label: 'Last Claim', value: '2023-05-12' },
                    { label: 'Fraud Flags', value: false },
                    { label: 'Risk Score', value: 'Low' },
                  ]}
                />
                <ExternalCheckCard
                  title="Policy Verification"
                  icon={<Shield className="w-4 h-4 text-primary" />}
                  status="pass"
                  details={[
                    { label: 'Policy Status', value: 'Active' },
                    { label: 'Coverage Type', value: 'Comprehensive' },
                    { label: 'Deductible', value: '$500' },
                    { label: 'Claim Eligible', value: true },
                  ]}
                />
              </div>
            </WorkflowStep>
          )}

          {/* Step 4: Anomaly Analysis */}
          {visibleSteps >= 4 && (
            <WorkflowStep
              title="Anomaly Analysis & Risk Assessment"
              status={steps.analysis}
              stepNumber={4}
              isLast
              delay={0}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                    <div>
                      <p className="font-semibold text-foreground">Low Risk Detected</p>
                      <p className="text-xs text-muted-foreground">No anomalies found in claim data</p>
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground">Score: 12/100</Badge>
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground mb-2">Analysis Summary</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-success mt-0.5" />
                      <span>Weather conditions verified for date/location of loss</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-success mt-0.5" />
                      <span>Vehicle identification confirmed, no theft reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-success mt-0.5" />
                      <span>Claim amount consistent with damage type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-success mt-0.5" />
                      <span>No suspicious patterns in claims history</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Recommendation: <span className="font-medium text-foreground">Approve for standard processing</span>
                  </p>
                </div>
              </div>
            </WorkflowStep>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
