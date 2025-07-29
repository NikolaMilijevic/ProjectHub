interface DateInputProps {
  formik: any;
  name: string;
  label: string;
}

const DateInput = ({ formik, name, label }: DateInputProps) => (
  <div>
    <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type="date"
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

export default DateInput;
