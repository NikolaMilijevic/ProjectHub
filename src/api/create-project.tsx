import type { FormValues } from "../features/project-form/types";

export async function createProject(newProject: FormValues): Promise<FormValues> {
  const response = await fetch('https://localhost:7128/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProject)
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create project';
    try {
      const errorData = await response.json();
      errorMessage = errorData?.title || JSON.stringify(errorData) || errorMessage;
    } catch {
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
