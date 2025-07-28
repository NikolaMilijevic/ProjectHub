import { Formik, Form } from 'formik';
import React from 'react';
import { useRouter } from '@tanstack/react-router';
import { useProjectContext } from '../components/project-context';
import Header from '../components/header-project';
import ProjectInformation from '../components/project-information';
import BasicInfo from '../features/project-form/basic-info';
import FinancialTimeline from '../features/project-form/financial-timeline';
import StatusProgress from '../features/project-form/status-progress';
import FormActions from '../features/project-form/form-actions';
import { validationSchema } from '../features/project-form/validation-schema';
import type { FormValues } from '../features/project-form/types';
import { initialValues } from '../features/project-form/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../api/create-project';
import {toast} from 'react-hot-toast'

const NewProjectForm: React.FC = () => { 
  const router = useRouter();
  const queryClient = useQueryClient();

  const { addProject } = useProjectContext(); 

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      router.navigate({ to: '/dashboard' });
    },
    onError: (error) => {
      console.error('Failed to create project:', error);
    }
  });

  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: any) => {
    const newProject = {
      ...values,
      startDate: new Date(values.startDate).toISOString(),
      dueDate: new Date(values.dueDate).toISOString(),
    }
    console.log('Submitting to API:', newProject)
   
    console.log("Form values being sent:", JSON.stringify(newProject, null, 2));

    mutation.mutate(newProject, {
      onSuccess: () => {
        toast.success('Project successfully created!')
        resetForm();
        addProject(newProject);
        router.navigate({ to: '/dashboard' });
      },
      onError: (error) => {
        toast.error('Unexpected error occured!')
        console.error('Failed to create project!', error);
      },
      onSettled: () => {
        setSubmitting(false);
      }
    });
  };

  return (
    <div>
      <Header />
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 lg:my-6 py-6 shadow rounded-xl mt-10 bg-white">
          <ProjectInformation />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount={true}
          >
              <Form className="grid gap-4">
                <BasicInfo />
                <FinancialTimeline />
                <StatusProgress />
                <FormActions />
              </Form>
          </Formik>
        </div>
    </div>
  );
};

export default NewProjectForm;
