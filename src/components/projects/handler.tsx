import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/update-project";
import { useDeleteProject } from "../../api/hooks";

export function useProjectMutations() {
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteProject();

  const updateMutation = useMutation({
    mutationFn: (project: any) => updateProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });

  const deleteProject = (id: string) => {
    deleteMutation.mutate(Number(id));
  };

  const updateProjectHandler = (project: any) => {
    updateMutation.mutate(project);
  };

  return { deleteProject, updateProjectHandler, updateLoading: updateMutation.isPending };
}
