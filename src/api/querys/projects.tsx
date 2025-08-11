import api from '../axios-instance';
import type { Project } from '../../features/project-form/types';
import type { FormValues } from '../../features/project-form/types';
import type { PagedResult } from '../hooks/use-projects';

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await api.get('/projects');
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch projects';
    throw new Error(message);
  }
}

export async function getProjectById(id: number): Promise<Project> {
  const res = await api.get(`/projects/${id}`);
  return res.data;
}

export async function getProjectPaged(pageNumber: number, pageSize: number, search = '', status = '', priority = '', sortBy = 'createdAt', sortOrder = 'desc'): Promise<PagedResult<Project>> {
  const { data } = await api.get(`/projects/paged`, {
    params: { pageNumber, pageSize, search, status, priority, sortBy, sortOrder },
  });
  console.log('Paged data:', data);
  return data;
}

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
  } catch (error: any) {
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Validation errors:', error.response.data);
    } else {
      console.error('Network or unknown error:', error);
    }
    throw new Error('Failed to create project');
  }
}

export async function updateProject(project: Project): Promise<Project> {
  try {
    const response = await api.put(`/projects/${project.id}`, project);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to update project';
    throw new Error(message);
  }
}

export async function deleteProject(id: number): Promise<void> {
  try {
    await api.delete(`/projects/${id}`);
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to delete project';
    throw new Error(message);
  }
}
