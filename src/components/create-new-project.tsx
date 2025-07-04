import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React from 'react';

interface FormValues {
  projectTitle: string;
  client: string;
  description: string;
}

const initialValues: FormValues = {
  projectTitle: '',
  client: '',
  description: '',
};

const validationSchema = Yup.object({
  projectTitle: Yup.string()
  .min(3, 'ProjectTitle must be at least 3 characters')
  .max(100, 'ProjectTitle must be at most 100 characters')
  .required('ProjectTitle is required'),
  client: Yup.string()
  .min(2, 'Client must be at least 2 characters')
  .max(100, 'Client must be at most 100 characters')
  .required('Client is required'),
  description: Yup.string()
  .min(10, 'Description must be at least 10 characters')
  .max(500, 'Description must be at most 500 characters')
  .required('Description is required'),
});

const NewProjectForm: React.FC = () => {
  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: any) => {
    console.log('Form submitted:', values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="max-w-250 mx-auto p-6 shadow rounded mt-10">
      <h2 className="text-xl font-bold">Project Information</h2>
      <h4 className="text-xs text-gray-500 mt-2 mb-4">Fill in the details for your new project</h4>
      <h2 className='text-base font-bold'>Basic Information</h2>
      <hr className="mb-5 mt-1 opacity-25" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="projectTitle">ProjectTitle</label>
                <Field id="projectTitle" name="projectTitle" type="text" placeholder="Enter a clear, descriptive title for your project" className="w-full p-2 border rounded" />
                <ErrorMessage name="projectTitle" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="client">Client</label>
                <Field id="client" name="client" type="text" placeholder="Enter client or company name" className="w-full p-2 border rounded" />
                <ErrorMessage name="client" component="div" className="text-red-500 text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field as="textarea" id="description" name="description" placeholder="Describe the goals, scope, and key deliverables of your project" className="w-full p-2 border rounded" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-500 text-white p-2 rounded"
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProjectForm;
