import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../create-project';
import { toast } from 'react-hot-toast';
import { useRouter } from '@tanstack/react-router';

export function useCreateProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project successfully created!',  {duration: 4000, style: {background: "#d1fae5", color: "#065f46", border: "1px solid #34d399"}});
      router.navigate({ to: '/dashboard' });
    },
    onError: (error) => {
      toast.error('Unexpected error occurred!', {duration: 5000, style: {background: "#fee2e2", color: "#991b1b", border: "1px solid #f87171"}});
      console.error('Create project failed:', error);
    }
  });
}
