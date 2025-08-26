export interface Traffic {
  id: number;
  ipAddress: string;
  name: string;
  status: 'RED' | 'GREEN' | 'YELLOW';
  active: boolean;
  L1?: string;
  T?: number;
  L2?: string;
}
