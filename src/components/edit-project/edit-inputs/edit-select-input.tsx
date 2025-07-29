interface SelectInputProps {
  formik: any;
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const SelectInput = ({ formik, name, label, options }: SelectInputProps) => (
  <div>
    <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
    <select
      id={name}
      name={name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className="w-full border p-2 rounded"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default SelectInput;
