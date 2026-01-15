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

// Evidence for triggered rules per claim
const CLAIM_RULE_EVIDENCE: Record<string, Record<string, string>> = {
  'CLM5003': {},
  'CLM0012': {
    'R006': 'Claimant has filed 4 claims in the past 18 months, all using "Quick Fix Auto" repair shop in Newark.',
    'R007': 'Claim amount of $7,800 is just under the $8,000 internal auto-approval threshold.',
  },
  'CLM2231': {},
  'CLM4420': {
    'R004': 'Repair provider "Premier Auto Body" has been flagged in 12 fraud investigations in the past year.',
    'R008': 'Narrative text is 87% similar to 3 other claims submitted in the same region.',
    'R009': 'Claimed repair cost of $18,500 is 92% of vehicle market value ($20,100).',
    'R011': 'Damage description mentions "front-end collision" but uploaded images show rear damage only.',
  },
};

// Mock triggered rules per claim ID
const CLAIM_TRIGGERED_RULES: Record<string, string[]> = {
  'CLM5003': [],
  'CLM0012': ['R006', 'R007'],
  'CLM2231': [],
  'CLM4420': ['R004', 'R008', 'R009', 'R011'],
};

export function getRulesForClaim(claimId: string): RuleResult[] {
  const triggeredRules = CLAIM_TRIGGERED_RULES[claimId] || [];
  const evidenceMap = CLAIM_RULE_EVIDENCE[claimId] || {};
  
  return RULES_DEFINITIONS.map(rule => ({
    id: rule.id,
    description: rule.description,
    triggered: triggeredRules.includes(rule.id),
    evidence: evidenceMap[rule.id],
  }));
}

// LLM Severity data per claim
export interface LLMSeverityData {
  severityScore: number;
  confidenceScore: number;
  reasons: string[];
  summary: string;
  recommendation: 'APPROVE' | 'REVIEW' | 'ESCALATE' | 'REJECT';
}

const CLAIM_LLM_SEVERITY: Record<string, LLMSeverityData> = {
  'CLM5003': {
    severityScore: 12,
    confidenceScore: 94,
    reasons: [
      'Weather data corroborates storm activity on date of loss',
      'Vehicle age and damage type are consistent',
      'No prior fraud indicators in claimant history',
    ],
    summary: 'This claim exhibits low risk characteristics. Weather verification confirms storm conditions on the reported date. Damage description aligns with natural disaster patterns. Claimant has clean history with no prior suspicious activity.',
    recommendation: 'APPROVE',
  },
  'CLM0012': {
    severityScore: 58,
    confidenceScore: 82,
    reasons: [
      'Repeated use of same repair vendor raises concern',
      'Claim amount positioned just below auto-approval threshold',
      'Pattern suggests possible threshold manipulation',
    ],
    summary: 'Medium risk detected. The claimant has established a pattern of using the same repair shop across multiple claims. The claim amount being just under the approval threshold warrants additional scrutiny. Recommend manual review before proceeding.',
    recommendation: 'REVIEW',
  },
  'CLM2231': {
    severityScore: 8,
    confidenceScore: 96,
    reasons: [
      'All external checks passed without issues',
      'Claim documentation is complete and consistent',
      'No anomalies detected in pattern analysis',
    ],
    summary: 'Very low risk claim. All verification checks passed. Documentation is thorough and narrative is consistent with submitted evidence. Standard processing recommended.',
    recommendation: 'APPROVE',
  },
  'CLM4420': {
    severityScore: 89,
    confidenceScore: 91,
    reasons: [
      'Repair provider has documented fraud history',
      'Narrative matches templated submission patterns',
      'Repair cost nearly equals vehicle value',
      'Damage description contradicts photographic evidence',
    ],
    summary: 'High risk claim requiring immediate attention. Multiple red flags detected including use of a fraud-flagged repair shop, templated narrative language, disproportionate repair costs, and inconsistency between damage description and uploaded images. Strong indicators of potential fraud.',
    recommendation: 'REJECT',
  },
};

export function getLLMSeverityForClaim(claimId: string): LLMSeverityData {
  return CLAIM_LLM_SEVERITY[claimId] || CLAIM_LLM_SEVERITY['CLM5003'];
}
