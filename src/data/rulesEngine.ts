import { RuleResult } from '@/components/RulesEvaluationStep';

// All rules definitions
export const RULES_DEFINITIONS: { id: string; description: string }[] = [
  { id: 'R001', description: 'Claim amount exceeds policy coverage limit' },
  { id: 'R002', description: 'Date of loss is before policy effective date' },
  { id: 'R003', description: 'Multiple claims within 30-day window' },
  { id: 'R004', description: 'VIN mismatch with policy records' },
  { id: 'R005', description: 'Weather conditions inconsistent with damage type' },
  { id: 'R006', description: 'Claim filed more than 30 days after incident' },
  { id: 'R007', description: 'Vehicle reported stolen in national database' },
  { id: 'R008', description: 'High-value claim from new policy holder' },
  { id: 'R009', description: 'Damage description inconsistent with photos' },
  { id: 'R010', description: 'Claimant has prior fraud investigation' },
  { id: 'R011', description: 'Repair estimate exceeds vehicle value' },
  { id: 'R012', description: 'Incident location inconsistent with policy region' },
  { id: 'R013', description: 'Duplicate claim submission detected' },
];

// Mock triggered rules per claim ID
const CLAIM_TRIGGERED_RULES: Record<string, string[]> = {
  'CLM5003': [], // No rules triggered - low risk
  'CLM0012': ['R006', 'R008'], // Medium risk - late filing + high value new policy
  'CLM2231': [], // Low risk - no issues
  'CLM4420': ['R007', 'R008', 'R011'], // High risk - stolen vehicle flags
};

export function getRulesForClaim(claimId: string): RuleResult[] {
  const triggeredRules = CLAIM_TRIGGERED_RULES[claimId] || [];
  
  return RULES_DEFINITIONS.map(rule => ({
    id: rule.id,
    description: rule.description,
    triggered: triggeredRules.includes(rule.id),
  }));
}
