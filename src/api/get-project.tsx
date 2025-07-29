
// export async function getProject(id: number) {
//   const response = await fetch(`https://localhost:7128/api/projects/${id}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch project');
//   }
//   return response.json();
// }
export async function getProjects() {
  const res = await fetch('https://localhost:7128/api/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}