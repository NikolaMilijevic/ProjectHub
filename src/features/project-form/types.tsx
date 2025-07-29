export interface FormValues {
  projectTitle: string;
  clientName: string;
  description: string;
  budget: number;
  startDate: string;
  dueDate: string;
  initialStatus: string;
  priorityLevel: string;
  progress: number;
  createdAt: string;
}

export type CreateProjectPayload = Omit<FormValues, 'createdAt'>;