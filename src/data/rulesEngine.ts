import { RuleResult } from '@/components/RulesEvaluationStep';

// All rules definitions (R001–R011)
export const RULES_DEFINITIONS: { id: string; description: string }[] = [
  { id: 'R001', description: 'Claim amount exceeds repair benchmark by >30%' },
  { id: 'R002', description: 'Weather conditions mismatch narrative' },
  { id: 'R003', description: 'VIN make/model mismatch' },
  { id: 'R004', description: 'Repair provider has high fraud risk' },
  { id: 'R005', description: 'Claim frequency is higher than normal (same vehicle/party)' },
  { id: 'R006', description: 'Claimant has repeatedly used the same vendor/repair shop' },
  { id: 'R007', description: 'Claim amount is near or just under internal approval threshold (possible evasion)' },
  { id: 'R008', description: 'Narrative is highly similar to previous submissions (possible templated claim)' },
  { id: 'R009', description: 'Claim cost is disproportionately high relative to vehicle value' },
  { id: 'R010', description: 'Driver involved is not listed on policy\'s approved drivers' },
  { id: 'R011', description: 'Accident damage description does not match image/narrative evidence' },
];

// Mock triggered rules per claim ID
const CLAIM_TRIGGERED_RULES: Record<string, string[]> = {
  'CLM5003': [], // No rules triggered - low risk
  'CLM0012': ['R006', 'R007'], // Medium risk - repeated vendor + threshold evasion
  'CLM2231': [], // Low risk - no issues
  'CLM4420': ['R004', 'R008', 'R009', 'R011'], // High risk - fraud flags
};

export function getRulesForClaim(claimId: string): RuleResult[] {
  const triggeredRules = CLAIM_TRIGGERED_RULES[claimId] || [];
  
  return RULES_DEFINITIONS.map(rule => ({
    id: rule.id,
    description: rule.description,
    triggered: triggeredRules.includes(rule.id),
  }));
}
