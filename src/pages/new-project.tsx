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

const NewProjectForm: React.FC = () => { 
  const router = useRouter();

  const { addProject } = useProjectContext(); 

  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: any) => {
    const newProject = {
      ...values,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    }
    console.log('Form submitted:', values);
    addProject(newProject);
    setSubmitting(false);
    resetForm();
    router.navigate({to: '/dashboard'});
  };

  return (
    <div>
      <Header />
        <div className="max-w-250 mx-auto p-6 shadow rounded mt-10">
          <ProjectInformation />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnMount={true}
          >
            {() => (
              <Form className="grid gap-4">
                <BasicInfo />
                <FinancialTimeline />
                <StatusProgress />
                <FormActions />
              </Form>
            )}
          </Formik>
        </div>
    </div>
  );
};

export default NewProjectForm;
