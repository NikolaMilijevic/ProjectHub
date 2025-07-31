import type { Project } from "../../features/project-form/types";

export function getEditInitialValues(project: Project) {
  return {
    projectTitle: project.projectTitle || "",
    description: project.description || "",
    budget: project.budget || 0,
    startDate: project.startDate ? project.startDate.split("T")[0] : "",
    dueDate: project.dueDate ? project.dueDate.split("T")[0] : "",
    initialStatus: project.initialStatus || "Planning",
    priorityLevel: project.priorityLevel || "Low",
    progress: project.progress || 0,
    clientName: project.client?.clientName || "",
  };
}
