export interface Visit {
  id: number;
  userId: number;
  sponsorId: number;
  studyId: number;
  siteId: number;
  patientId: number;
  visitNo: string;
  visitDate: Date;
  timeSpent: number;
  description: string;
}
