export async function updateProject(project: any) {
  const response = await fetch(`https://localhost:7128/api/projects/${project.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    throw new Error('Failed to update project');
  }
  return response.json();
}
