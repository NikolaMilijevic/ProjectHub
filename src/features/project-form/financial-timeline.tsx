import { ErrorMessage, Field } from "formik";
import { Label } from "../../components/ui/label";


const FinancialTimeline = () => {
    const fields = [
        {
            name: "budget",
            label: "Budget($)*",
            type: "number",
            placeholder: "",
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (["e", "E", ".", "+", "-"].includes(e.key)) {
                e.preventDefault();
            }
            },
        },
        {
            name: "startDate",
            label: "Start Date*",
            type: "date",
        },
        {
            name: "dueDate",
            label: "Due Date*",
            type: "date",
        },
    ];
  return (
    <div className="mb-3">
        <div className="border-b-1 mb-5">
            <h2 className='text-base font-bold'>Financial & Timeline</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.map(({ name, label, type, placeholder, onKeyDown }) => (
            <div key={name}>
                <Label htmlFor={name} className="mb-3">{label}</Label>
                <Field
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onKeyDown={onKeyDown}
                className="w-full p-2 border rounded"
                />
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
            </div>
            ))}
        </div>
    </div>
  )
}

export default FinancialTimeline