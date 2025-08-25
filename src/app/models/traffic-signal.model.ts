export interface Traffic {
  id: number;
  ipAddress: string;
  name: string;
  status: 'RED' | 'GREEN' | 'YELLOW';
  active: boolean;
}
