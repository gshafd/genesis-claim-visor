import { useState, useEffect } from 'react';
import { Claim } from '@/types/claim';
import { WorkflowStep } from './WorkflowStep';
import { ExternalCheckCard } from './ExternalCheckCard';
import { RulesEvaluationStep, RuleResult } from './RulesEvaluationStep';
import { ManualReviewActions } from './ManualReviewActions';
import { Cloud, Car, History, Shield, FileText, Brain, Zap, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { getRulesForClaim } from '@/data/rulesEngine';
import { toast } from '@/hooks/use-toast';

interface WorkflowViewProps {
  claim: Claim;
}

type StepStatus = 'pending' | 'processing' | 'completed';

interface StepState {
  ingestion: StepStatus;
  parsing: StepStatus;
  external: StepStatus;
  rules: StepStatus;
  analysis: StepStatus;
}

export function WorkflowView({ claim }: WorkflowViewProps) {
  const [steps, setSteps] = useState<StepState>({
    ingestion: 'pending',
    parsing: 'pending',
    external: 'pending',
    rules: 'pending',
    analysis: 'pending',
  });

  const [visibleSteps, setVisibleSteps] = useState(0);
  const [rulesData, setRulesData] = useState<RuleResult[]>([]);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    // Reset and start workflow animation
    setSteps({
      ingestion: 'pending',
      parsing: 'pending',
      external: 'pending',
      rules: 'pending',
      analysis: 'pending',
    });
    setVisibleSteps(0);
    setShowActions(false);
    
    // Load rules for this claim
    setRulesData(getRulesForClaim(claim.id));

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

    // Step 4: Rules Evaluation
    timers.push(setTimeout(() => {
      setVisibleSteps(4);
      setSteps(s => ({ ...s, rules: 'processing' }));
    }, 6500));

    timers.push(setTimeout(() => {
      setSteps(s => ({ ...s, rules: 'completed' }));
    }, 8000));

    // Step 5: Analysis
    timers.push(setTimeout(() => {
      setVisibleSteps(5);
      setSteps(s => ({ ...s, analysis: 'processing' }));
    }, 8500));

    timers.push(setTimeout(() => {
      setSteps(s => ({ ...s, analysis: 'completed' }));
    }, 10000));

    // Show manual actions
    timers.push(setTimeout(() => {
      setShowActions(true);
    }, 10500));

    return () => timers.forEach(clearTimeout);
  }, [claim.id]);

  const handleApprove = () => {
    toast({ title: "Claim Approved", description: `${claim.id} has been approved for processing.` });
  };

  const handleEscalate = () => {
    toast({ title: "Claim Escalated", description: `${claim.id} has been escalated for manual review.`, variant: "destructive" });
  };

  const handleEdit = () => {
    toast({ title: "Edit Mode", description: `Opening edit mode for ${claim.id}.` });
  };

  const handleReject = () => {
    toast({ title: "Claim Rejected", description: `${claim.id} has been rejected.`, variant: "destructive" });
  };

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

          {/* Step 4: Rules Evaluation */}
          {visibleSteps >= 4 && (
            <WorkflowStep
              title="Rules Evaluation (Dynamic)"
              status={steps.rules}
              stepNumber={4}
              delay={0}
            >
              <RulesEvaluationStep rules={rulesData} />
            </WorkflowStep>
          )}

          {/* Step 5: Anomaly Analysis */}
          {visibleSteps >= 5 && (
            <WorkflowStep
              title="Anomaly Analysis & Risk Assessment"
              status={steps.analysis}
              stepNumber={5}
              isLast
              delay={0}
            >
              <div className="space-y-4">
                {(() => {
                  const triggeredCount = rulesData.filter(r => r.triggered).length;
                  const riskScore = triggeredCount * 25;
                  const isHighRisk = triggeredCount >= 3;
                  const isMediumRisk = triggeredCount >= 1 && triggeredCount < 3;
                  
                  return (
                    <>
                      <div className={`flex items-center justify-between p-4 rounded-lg border ${
                        isHighRisk 
                          ? 'bg-destructive/10 border-destructive/20' 
                          : isMediumRisk 
                            ? 'bg-warning/10 border-warning/20'
                            : 'bg-success/10 border-success/20'
                      }`}>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`w-6 h-6 ${
                            isHighRisk ? 'text-destructive' : isMediumRisk ? 'text-warning' : 'text-success'
                          }`} />
                          <div>
                            <p className="font-semibold text-foreground">
                              {isHighRisk ? 'High Risk Detected' : isMediumRisk ? 'Medium Risk Detected' : 'Low Risk Detected'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {triggeredCount === 0 
                                ? 'No anomalies found in claim data'
                                : `${triggeredCount} rule(s) triggered during evaluation`}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${
                          isHighRisk 
                            ? 'bg-destructive text-destructive-foreground' 
                            : isMediumRisk 
                              ? 'bg-warning text-warning-foreground'
                              : 'bg-success text-success-foreground'
                        }`}>Score: {riskScore}/100</Badge>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">Analysis Summary</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Zap className={`w-4 h-4 mt-0.5 ${triggeredCount === 0 ? 'text-success' : 'text-warning'}`} />
                            <span>Weather conditions verified for date/location of loss</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Zap className={`w-4 h-4 mt-0.5 ${rulesData.find(r => r.id === 'R007')?.triggered ? 'text-destructive' : 'text-success'}`} />
                            <span>Vehicle identification {rulesData.find(r => r.id === 'R007')?.triggered ? 'flagged - possible theft report' : 'confirmed, no theft reports'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Zap className={`w-4 h-4 mt-0.5 ${rulesData.find(r => r.id === 'R011')?.triggered ? 'text-destructive' : 'text-success'}`} />
                            <span>Claim amount {rulesData.find(r => r.id === 'R011')?.triggered ? 'exceeds vehicle value' : 'consistent with damage type'}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Zap className={`w-4 h-4 mt-0.5 ${rulesData.find(r => r.id === 'R003')?.triggered ? 'text-destructive' : 'text-success'}`} />
                            <span>{rulesData.find(r => r.id === 'R003')?.triggered ? 'Multiple claims detected in 30-day window' : 'No suspicious patterns in claims history'}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Recommendation: <span className="font-medium text-foreground">
                            {isHighRisk ? 'Reject or escalate for investigation' : isMediumRisk ? 'Manual review recommended' : 'Approve for standard processing'}
                          </span>
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </WorkflowStep>
          )}

          {/* Manual Review Actions */}
          {showActions && (
            <div className="mt-8 pt-6 border-t border-border">
              <ManualReviewActions
                onApprove={handleApprove}
                onEscalate={handleEscalate}
                onEdit={handleEdit}
                onReject={handleReject}
              />
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
