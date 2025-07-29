import * as Yup from "yup";

export const editProjectValidationSchema = Yup.object({
  projectTitle: Yup.string().required("Project title is required"),
  budget: Yup.number().min(0, "Must be positive").required("Budget is required"),
  startDate: Yup.date().required("Start date is required"),
  dueDate: Yup.date().required("Due date is required"),
  progress: Yup.number().min(0).max(100).required("Progress is required"),
  clientName: Yup.string().required("Client name is required"),
});
