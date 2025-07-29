import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects } from './get-project';
import { deleteProject } from './delete-project';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:(id: number) => deleteProject(id),
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
