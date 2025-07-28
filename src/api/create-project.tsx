import type { FormValues } from "../features/project-form/types";

export async function createProject(newProject: FormValues): Promise<FormValues> {
  const response = await fetch('https://localhost:7128/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ project: newProject })
  });

 if (!response.ok) {
  const errorData = await response.json();
  console.error('Validation errors:', errorData);
  throw new Error('Validation failed');
}

  return response.json();
}
