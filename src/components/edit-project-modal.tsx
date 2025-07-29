import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface EditProjectModalProps {
  project: any;
  onClose: () => void;
  onSave: (updatedProject: any) => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ project, onClose, onSave }) => {
  const formik = useFormik({
    initialValues: {
      projectTitle: project.projectTitle || "",
      description: project.description || "",
      budget: project.budget || 0,
      startDate: project.startDate ? project.startDate.split("T")[0] : "",
      dueDate: project.dueDate ? project.dueDate.split("T")[0] : "",
      initialStatus: project.initialStatus || "Planning",
      priorityLevel: project.priorityLevel || "Low",
      progress: project.progress || 0,
      clientName: project.client?.clientName || "",
    },
    validationSchema: Yup.object({
      projectTitle: Yup.string().required("Project title is required"),
      budget: Yup.number().min(0, "Must be positive").required(),
      startDate: Yup.date().required(),
      dueDate: Yup.date().required(),
      progress: Yup.number().min(0).max(100).required(),
      clientName: Yup.string().required("Client name is required"),
    }),
    onSubmit: (values) => {
      // Prepare data to send
      onSave({
        ...project,
        ...values,
        // Optional: Convert dates back to ISO string if needed
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
          <div>
            <label className="block font-semibold mb-1" htmlFor="projectTitle">
              Project Title
            </label>
            <input
              id="projectTitle"
              name="projectTitle"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.projectTitle}
              className="w-full border p-2 rounded"
            />
            {formik.touched.projectTitle && typeof formik.errors.projectTitle === "string" && (
                <div className="text-red-600 text-sm">{formik.errors.projectTitle}</div>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="clientName">
              Client Name
            </label>
            <input
              id="clientName"
              name="clientName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clientName}
              className="w-full border p-2 rounded"
            />
            {formik.touched.clientName && typeof formik.errors.clientName === "string" && (
              <div className="text-red-600 text-sm">{formik.errors.clientName}</div>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="budget">
                Budget
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.budget}
                className="w-full border p-2 rounded"
                min={0}
              />
              {formik.touched.budget && formik.errors.budget && typeof formik.errors.budget === "number" && (
                <div className="text-red-600 text-sm">{formik.errors.budget}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="progress">
                Progress (%)
              </label>
              <input
                id="progress"
                name="progress"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.progress}
                className="w-full border p-2 rounded"
                min={0}
                max={100}
              />
              {formik.touched.progress && typeof formik.errors.progress === "number" && (
                <div className="text-red-600 text-sm">{formik.errors.progress}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="startDate">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
                className="w-full border p-2 rounded"
              />
              {formik.touched.startDate && typeof formik.errors.startDate === "string" && (
                <div className="text-red-600 text-sm">{formik.errors.startDate}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="dueDate">
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dueDate}
                className="w-full border p-2 rounded"
              />
              {formik.touched.dueDate && typeof formik.errors.dueDate === "string" && (
                <div className="text-red-600 text-sm">{formik.errors.dueDate}</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="initialStatus">
                Initial Status
              </label>
              <select
                id="initialStatus"
                name="initialStatus"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.initialStatus}
                className="w-full border p-2 rounded"
              >
                <option value="Planning">Planning</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="priorityLevel">
                Priority Level
              </label>
              <select
                id="priorityLevel"
                name="priorityLevel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.priorityLevel}
                className="w-full border p-2 rounded"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-violet-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
