import type { FormValues } from "../features/project-form/types";
import api from "./axios-instance";

export async function createProject(newProject: FormValues): Promise<FormValues> {
  const payload = {
    projectTitle: newProject.projectTitle,
    client: { clientName: newProject.client?.clientName },
    description: newProject.description,
    budget: newProject.budget,
    startDate: newProject.startDate,
    dueDate: newProject.dueDate,
    initialStatus: newProject.initialStatus,
    priorityLevel: newProject.priorityLevel,
    progress: newProject.progress,
  };

  try {
    const response = await api.post<FormValues>('/projects', payload);
    return response.data;
  }
  catch(error: any) {
    if(error.response) {
      console.error("Response status:", error.response.status);
      console.error("Validation errors:", error.response.data);
    }
    else {
      console.error("Network or unknown error:", error);
    }
    throw new Error("Failed to create project");
  }
}