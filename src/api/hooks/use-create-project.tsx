import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../create-project';
// import type { FormValues } from '../../features/project-form/types';
import { toast } from 'react-hot-toast';
import { useRouter } from '@tanstack/react-router';

export function useCreateProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project successfully created!');
      router.navigate({ to: '/dashboard' });
    },
    onError: (error) => {
      toast.error('Unexpected error occurred!');
      console.error('Create project failed:', error);
    }
  });
}
