interface TextInputProps {
  formik: any;
  name: string;
  label: string;
  type?: string;
}

const TextInput = ({ formik, name, label, type = "text" }: TextInputProps) => (
  <div>
    <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className="w-full border p-2 rounded"
    />
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-600 text-sm">{formik.errors[name]}</div>
    )}
  </div>
);

export default TextInput;
