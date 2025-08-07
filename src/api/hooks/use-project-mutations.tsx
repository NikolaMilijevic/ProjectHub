import { useUpdateProject, useDeleteProject } from './use-projects';
import type { Project } from '../../features/project-form/types';

export function useProjectMutations() {
  const deleteMutation = useDeleteProject();
  const updateMutation = useUpdateProject();

  const deleteProject = (id: string, options?: { onSuccess?: () => void; onError?: (error: unknown) => void; }) => {
    deleteMutation.mutate(Number(id), options);
  };

  const updateProjectHandler = (project: Project) => {
    updateMutation.mutate(project);
  };

  return {
    deleteProject,
    updateProjectHandler,
    updateLoading: updateMutation.isPending,
  };
}