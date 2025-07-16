import { ErrorMessage, Field } from "formik";
import { Label } from "../../components/ui/label";


const StatusProgress = () => {
    const fields = [
        {
            name: "initialStatus",
            label: "Initial Status",
            type: "select",
            options: ["Planning", "In Progress", "Completed"],
        },
        {
            name: "priorityLevel",
            label: "Priority Level",
            type: "select",
            options: ["Low", "Medium", "High"],
        },
        {
            name: "progress",
            label: "Progress(%)*",
            type: "number",
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (["e", "E", ".", "+", "-"].includes(e.key)) {
                e.preventDefault();
            }
            },
        },
    ];
  return (
    <div className="mb-3">
        <div className="border-b-1 mb-5">
            <h2 className='text-base font-bold'>Status & Progress</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.map(({ name, label, type, options, onKeyDown }) => (
            <div key={name}>
                <Label htmlFor={name} className="mb-3">{label}</Label>
                {type === "select" ? (
                <Field as="select" name={name} className="w-full p-2 border rounded">
                    {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                </Field>
                ) : (
                <Field
                    type={type}
                    name={name}
                    onKeyDown={onKeyDown}
                    className="w-full p-2 border rounded"
                />
                )}

                <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
            </div>
            ))}
      </div>
    </div>
  )
}

export default StatusProgress