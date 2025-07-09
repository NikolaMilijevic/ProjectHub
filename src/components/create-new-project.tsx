import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from './ui/button';
import React from 'react';
import { Label } from './ui/label';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { useProjectContext } from './project-context';

interface FormValues {
  projectTitle: string;
  client: string;
  description: string;
  budget: number;
  startDate: string;
  dueDate: string;
  initialStatus: string;
  priorityLevel: string;
  progress: number;
  createdAt: string;
}

const initialValues: FormValues = {
  projectTitle: '',
  client: '',
  description: '',
  budget: 0,
  startDate: '',
  dueDate: '',
  initialStatus: 'Planning',
  priorityLevel: 'Low',
  progress: 0,
  createdAt: '',
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
  budget: Yup.number()
  .positive('Budget must be positive')
  .max(10000000, 'Budget must be at most 10M')
  .required('Budget is required'),
  startDate: Yup.date()
  .required('Start Date is required'),
  dueDate: Yup.date()
  .min(Yup.ref('startDate'), 'Due Date must be after Start Date')
  .required('Due Date is required'),
  initialStatus: Yup.string()
  .oneOf(['Planning', 'In Progress', 'Completed'], 'Invalid status')
  .required('Status is required'),
  priorityLevel: Yup.string()
  .oneOf(['Low', 'Medium', 'High'], 'Invalid priority level')
  .required('Priority level is required'),
  progress: Yup.number()
  .min(0, 'Progress must be at least 0')
  .max(100, 'Progress must be at most 100')
  .required('Progress is required')
});

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
    <>
      <div className="flex items-center gap-4 mb-2 mt-2 pl-100">
        <Button variant={'secondary'} className="bg-white hover:bg-white" onClick={() => router.navigate({ to: '/dashboard'})}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Button>
        <h1 className="text-lg font-bold border-l h-7 border-gray-200 pl-1">Create New Project</h1>
      </div>
      <hr />
      <div className="max-w-250 mx-auto p-6 shadow rounded mt-10">
        <div className="flex items-center gap-4 mb-6">
          <img src="../../violet-plus.svg" alt="violet-plus" className="w-15 h-15 object-cover rounded-lg shadow" />
          <div>
            <h2 className="text-xl font-bold">Project Information</h2>
            <h4 className="text-xs text-gray-500 mt-2 mb-4">Fill in the details for your new project</h4>
          </div>
        </div>
        <h2 className='text-base font-bold'>Basic Information</h2>
        <hr className="mb-5 mt-1" />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectTitle" className="mb-2">ProjectTitle*</Label>
                  <Field id="projectTitle" name="projectTitle" type="text" placeholder="Enter a clear, descriptive title for your project" className="w-full p-2 border rounded" />
                  <ErrorMessage name="projectTitle" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Label htmlFor="client" className="mb-2">Client*</Label>
                  <Field id="client" name="client" type="text" placeholder="Enter client or company name" className="w-full p-2 border rounded" />
                  <ErrorMessage name="client" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <div>
                <Label htmlFor="description" className="mb-2">Description*</Label>
                <Field as="textarea" id="description" name="description" placeholder="Describe the goals, scope, and key deliverables of your project" className="w-full p-2 border rounded" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>
              <h2 className='text-base font-bold'>Financial & Timeline</h2>
              <hr className="mt-0" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="budget" className="mb-2">Budget($)*</Label>
                  <Field id="budget" name="budget" type="number" className="w-full p-2 border rounded" />
                  <ErrorMessage name="budget" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Label htmlFor="startDate" className="mb-2">Start Date*</Label>
                  <Field id="startDate" name="startDate" type="date" className="w-full p-2 border rounded" /> 
                  <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Label htmlFor="dueDate" className="mb-2">Due Date*</Label>
                  <Field id="dueDate" name="dueDate" type="date" className="w-full p-2 border rounded" />
                  <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" /> 
                </div>
              </div>
              <h2 className='text-base font-bold'>Status & Progress</h2>
              <hr className="mt-0" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="initialStatus" className="mb-2">Initial Status</Label>
                  <Field as="select" name="initialStatus" className="w-full p-2 border rounded">
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <ErrorMessage name="initialStatus" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Label htmlFor="priorityLevel" className="mb-2">Priority Level</Label>
                  <Field as="select" name="priorityLevel" className="w-full p-2 border rounded">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Field>
                  <ErrorMessage name="priorityLevel" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Label htmlFor="progress" className="mb-2">Progress(%)*</Label>
                  <Field type="number" name="progress" className="w-full p-2 border rounded"></Field>
                  <ErrorMessage name="progress" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <hr className="mt-3 mb-8" />

              <div className="grid grid-cols-[150px_1fr] gap-2">
                <Button
                  type="button"
                  variant={'outline'} 
                  className="bg-white-300 text-black-200"
                  onClick={() => {
                    resetForm();
                    router.navigate({ to: '/dashboard'});
                  }
                  }
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-violet-400 hover:bg-violet-500" 
                  type="submit"
                  disabled={isSubmitting}  
                >
                  {isSubmitting ? 'Creating...' : '+ Create Project'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default NewProjectForm;
