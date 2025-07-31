import type { FormValues } from "./types";

export const initialValues: FormValues = {
  projectTitle: '',
  client: {
    clientName: '',
  },
  description: '',
  budget: 0,
  startDate: '',
  dueDate: '',
  initialStatus: 'Planning',
  priorityLevel: 'Low',
  progress: 0,
};
