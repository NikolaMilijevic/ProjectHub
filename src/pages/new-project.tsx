import { Formik, Form } from 'formik';
import Header from '../components/new-project/header-project';
import ProjectInformation from '../components/new-project/project-information';
import BasicInfo from '../features/project-form/basic-info';
import FinancialTimeline from '../features/project-form/financial-timeline';
import StatusProgress from '../features/project-form/status-progress';
import FormActions from '../features/project-form/form-actions';
import { validationSchema } from '../features/project-form/validation-schema';
import type { FormValues } from '../features/project-form/types';
import { initialValues } from '../features/project-form/constants';
import { useCreateProject } from '../api/hooks/use-create-project'; 

const NewProjectForm = () => { 
  const mutation = useCreateProject();

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    const newProject = {
      ...values,
      startDate: new Date(values.startDate).toISOString(),
      dueDate: new Date(values.dueDate).toISOString(),
    };

    mutation.mutate(newProject, {
      onSettled: () => {
        setSubmitting(false);
        resetForm();
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
