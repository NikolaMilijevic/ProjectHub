import { Field, ErrorMessage } from "formik";
import { Label } from "../../components/ui/label";

interface FieldInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const inputClass = "w-full p-2 border rounded";

const FieldInput = ({ name, label, type = "text", placeholder, options, onKeyDown }: FieldInputProps) => (
  <div className="mb-5">
    <Label htmlFor={name} className="mb-3">{label}</Label>

    {type === "select" ? (
      <Field as="select" id={name} name={name} className={inputClass}>
        {options?.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Field>
    ) : (
      <Field
        as={type === "textarea" ? "textarea" : "input"}
        id={name}
        name={name}
        type={type !== "textarea" ? type : undefined}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={inputClass}
      />
    )}

    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

export default FieldInput;
