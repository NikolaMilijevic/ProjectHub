import { useNavigate, useParams } from '@tanstack/react-router';
import { Formik, Form } from 'formik';

import Header from '../components/new-project/header-project';
import ProjectInformation from '../components/new-project/project-information';
import BasicInfo from '../features/project-form/basic-info';
import FinancialTimeline from '../features/project-form/financial-timeline';
import StatusProgress from '../features/project-form/status-progress';
import FormActions from '../features/project-form/form-actions';

import { validationSchema } from '../features/project-form/validation-schema';
import type { FormValues, Project } from '../features/project-form/types';

import { useProject, useUpdateProject, } from '../api/hooks/use-projects';
import { useProjectMutations } from '../api/hooks/use-project-mutations';
import Loading from '../components/projects/loading';
import ConfirmDialog from '../components/ui/confirm-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState,useRef } from 'react';
import { Button } from '../components/ui/button';

const ViewProject = () => {
  const { projectId } = useParams({ from: "/view-project/$projectId" });
  const navigate = useNavigate();
  const hasShownInvalidToast = useRef(false);

  const [isEditing, setIsEditing] = useState(false);

  if(!/^\d+$/.test(projectId)) {
    if(!hasShownInvalidToast.current) {
      toast.error("Invalid project id", {duration: 4000, style: {background: "#fee2e2", color: "#991b1b", border: "1px solid #f87171"}});
      hasShownInvalidToast.current = true;
    }
    navigate({to: "/dashboard"});
    return null;
  }

  const numericId = Number(projectId);

  const { data, isLoading, isError } = useProject(numericId);
  const updateProject = useUpdateProject();
  const {deleteProject} = useProjectMutations();

  if (isLoading) return <Loading />
  if (isError || !data) return <p className="flex justify-center items-center h-screen">Failed to load project.</p>;

  const initialValues: FormValues = {
    ...data,
    id: data.id,
    startDate: data.startDate.split("T")[0],
    dueDate: data.dueDate.split("T")[0],
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const updated: Project = {
      ...values,
      id: data.id,
      createdAt: data.createdAt,
      lastModified: new Date().toISOString(),
      startDate: new Date(values.startDate).toISOString(),
      dueDate: new Date(values.dueDate).toISOString(),
    };

    updateProject.mutate(updated, {
    onSuccess: () => {
      toast.success('Project successfully updated!',  {duration: 4000, style: {background: "#d1fae5", color: "#065f46", border: "1px solid #34d399"}});
      navigate({ to: "/dashboard" });
    },
    onError: () => {
      toast.error('Unexpected error occurred!', {duration: 5000, style: {background: "#fee2e2", color: "#991b1b", border: "1px solid #f87171"}});
    },
    onSettled: () => setSubmitting(false),
  });
  };

  return (
    <div>
      <Header headerText="View Project" />
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 lg:my-6 py-6 shadow rounded-xl mt-10 bg-white">
        <ProjectInformation 
          projectDescription="View, edit and delete project information." 
          deleteDialog={
            <div>
            <Button
              type='button'
              onClick={() => setIsEditing(prev => !prev)}
              className={`group px-3 py-1 mr-2 ${
                isEditing
                  ? "bg-yellow-200 hover:bg-yellow-600"
                  : "bg-gray-50 hover:bg-yellow-500"
              }`}
            >
              <Pencil className={`w-4 h-4 transition-colors ${
                isEditing 
                  ? "text-yellow-600 group-hover:text-white" 
                  : "text-yellow-500 group-hover:text-white"
              }`} 
              />
            </Button>
            <ConfirmDialog
              triggerLabel="Delete"
              triggerIcon={<Trash2 className="w-4 h-4 transition-colors text-red-500 group-hover:text-white" />}
              triggerVariant="destructive"
              className="group bg-gray-100/50 text-red-500 ml-2"
              title="Are you sure?"
              description="This action cannot be undone. This will permanently delete the project."
              onConfirm={() => {
                deleteProject(data.id.toString(), {
                  onSuccess: () => {
                    toast.success("Project deleted successfully", {duration: 4000, style: {background: "#d1fae5", color: "#065f46", border: "1px solid #34d399"}});
                    navigate({to: "/dashboard"});
                  },
                  onError: () => {
                    toast.error("Failed to delete project", {duration: 5000, style: {background: "#fee2e2", color: "#991b1b", border: "1px solid #f87171"}});
                  }
                });
              }}
            />
            </div>
          }
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form className="grid gap-4">
            <BasicInfo disabled={!isEditing} />
            <FinancialTimeline disabled={!isEditing} />
            <StatusProgress disabled={!isEditing}  />
            <FormActions />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ViewProject;