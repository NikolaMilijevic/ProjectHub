
export async function getProjects() {
  const res = await fetch('https://localhost:7128/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}