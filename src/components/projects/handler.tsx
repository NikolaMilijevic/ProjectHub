import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/update-project";
import { useDeleteProject } from "../../api/hooks";
import type { Project } from "../../features/project-form/types";

export function useProjectMutations() {
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteProject();

  const updateMutation = useMutation({
    mutationFn: (project: Project) => updateProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });

  const deleteProject = (id: string) => {
    deleteMutation.mutate(Number(id));
  };

  const updateProjectHandler = (project: Project) => {
    updateMutation.mutate(project);
  };

  return { deleteProject, updateProjectHandler, updateLoading: updateMutation.isPending };
}
