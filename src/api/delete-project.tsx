export async function deleteProject(id: number) {
  const res = await fetch(`https://localhost:7128/api/projects/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete project');
}