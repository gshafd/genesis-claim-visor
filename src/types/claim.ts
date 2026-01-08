export type RiskLevel = 'low' | 'medium' | 'high' | 'pending';

export interface Claim {
  id: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  dateOfLoss: string;
  status: 'not_processed' | 'processing' | 'processed';
  riskLevel: RiskLevel;
  vin?: string;
  narrative?: string;
  claimAmount?: number;
  location?: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed';
  data?: Record<string, unknown>;
}

export interface ExternalCheck {
  id: string;
  title: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  details: Record<string, string | boolean | number>;
}
