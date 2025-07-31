export interface FormValues {
  projectTitle: string;
  client: {
    clientName: string
  }
  description: string;
  budget: number;
  startDate: string;
  dueDate: string;
  initialStatus: string;
  priorityLevel: string;
  progress: number;
}

export type CreateProjectPayload = FormValues;

export type Project = FormValues & {
  id: string;
  createdAt: string;
  lastModified?: string;
};