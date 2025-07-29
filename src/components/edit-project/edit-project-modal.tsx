import React from "react";
import { useFormik } from "formik";
import { getEditInitialValues } from "./edit-initial-values";
import { editProjectValidationSchema } from "./edit-validation";
import TextInput from "./edit-inputs/edit-text-input";
import NumberInput from "./edit-inputs/edit-number-input";
import DateInput from "./edit-inputs/edit-date-input";
import SelectInput from "./edit-inputs/edit-select-input";

interface EditProjectModalProps {
  project: any;
  onClose: () => void;
  onSave: (updatedProject: any) => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ project, onClose, onSave }) => {
  const formik = useFormik({
    initialValues: getEditInitialValues(project),
    validationSchema: editProjectValidationSchema,
    onSubmit: (values) => {
      onSave({
        ...project,
        ...values,
        startDate: new Date(values.startDate).toISOString(),
        dueDate: new Date(values.dueDate).toISOString(),
      });
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextInput formik={formik} name="projectTitle" label="Project Title" />
          <TextInput formik={formik} name="clientName" label="Client Name" />
          <TextInput formik={formik} name="description" label="Description" />
          <div className="grid grid-cols-2 gap-4">
            <NumberInput formik={formik} name="budget" label="Budget" min={0} />
            <NumberInput formik={formik} name="progress" label="Progress (%)" min={0} max={100} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DateInput formik={formik} name="startDate" label="Start Date" />
            <DateInput formik={formik} name="dueDate" label="Due Date" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              formik={formik}
              name="initialStatus"
              label="Initial Status"
              options={[
                { value: "Planning", label: "Planning" },
                { value: "InProgress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
              ]}
            />
            <SelectInput
              formik={formik}
              name="priorityLevel"
              label="Priority Level"
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" disabled={formik.isSubmitting} className="px-4 py-2 bg-violet-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
