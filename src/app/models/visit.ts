export interface Visit {
  id: number;
  userId: number;
  patientId: number;
  visitNo: string;
  visitDate: Date;
  timeSpent: number;
  description: string;
}
