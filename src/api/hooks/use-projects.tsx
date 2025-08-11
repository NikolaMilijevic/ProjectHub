import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectPaged,
} from '../querys/projects';
import type { Project } from '../../features/project-form/types';

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface UseProjectPagedParams {
  pageNumber: number;
  pageSize: number;
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
}

export function useProjectPaged({ pageNumber, pageSize, search = '', status = '', priority = '', sortBy = 'createdAt', sortOrder = 'desc' }: UseProjectPagedParams) {
  return useQuery<PagedResult<Project>, Error>({
    queryKey: ['projects', pageNumber, pageSize, search, status, priority, sortBy, sortOrder],
    queryFn: () => getProjectPaged(pageNumber, pageSize, search, status, priority, sortBy, sortOrder)
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (_, updated) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', updated.id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
