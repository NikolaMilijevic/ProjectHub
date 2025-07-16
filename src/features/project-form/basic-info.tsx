
import { ErrorMessage, Field } from "formik"
import { Label } from "../../components/ui/label"

const fields = [
  {
    name: "projectTitle",
    label: "Project Title*",
    type: "text",
    placeholder: "Enter a clear, descriptive title for your project"
  },
  {
    name: "client",
    label: "Client*",
    type: "text",
    placeholder: "Enter client or company name",
  },
  {
    name: "description",
    label: "Description*",
    type: "textarea",
    placeholder: "Describe the goals, scope, and key deliverables of your project",
  },
]

const BasicInfo = () => {
  return (
    <div className="mb-3">
      <div className="border-b-1 mb-5">
        <h2 className='text-base font-bold'>Basic Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.slice(0, 2).map(({ name, label, type, placeholder }) => (
          <div key={name} className="mb-5">
            <Label htmlFor="name" className="mb-3">
              {label}
            </Label>
            <Field 
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full p-2 border rounded"
            />
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
          </div>
        ))}
      </div> 
      <div className="mt-2">
        {fields.slice(2).map(({ name, label, placeholder }) => (
          <div key={name}>
            <Label htmlFor={name} className="mb-3">{label}</Label>
            <Field
              as="textarea"
              id={name}
              name={name}
              placeholder={placeholder}
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BasicInfo