import type { FormValues } from "../features/project-form/types";

export async function createProject(newProject: FormValues): Promise<FormValues> {
  const payload = {
    projectTitle: newProject.projectTitle,
    client: { clientName: newProject.client?.clientName } ,
    description: newProject.description,
    budget: newProject.budget,
    startDate: newProject.startDate,
    dueDate: newProject.dueDate,
    initialStatus: newProject.initialStatus,
    priorityLevel: newProject.priorityLevel,
    progress: newProject.progress
  };

  console.log("Sending payload to API:", JSON.stringify(payload, null, 2));

  const response = await fetch('https://localhost:7128/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  console.log("Response status:", response.status);

  const responseText = await response.text();
  console.log("Raw response text:", responseText);

 if (!response.ok) {
    let errorData;
    try {
      errorData = JSON.parse(responseText);
      console.error("Validation errors:", errorData);
    } catch {
      console.error("Failed to parse error JSON.");
    }
    throw new Error("Validation failed");
  }

  return JSON.parse(responseText);
}
