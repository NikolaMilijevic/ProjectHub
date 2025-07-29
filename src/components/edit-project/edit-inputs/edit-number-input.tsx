interface NumberInputProps {
  formik: any;
  name: string;
  label: string;
  min?: number;
  max?: number;
}

const NumberInput = ({ formik, name, label, min, max }: NumberInputProps) => (
  <div>
    <label htmlFor={name} className="block font-semibold mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type="number"
      min={min}
      max={max}
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

export default NumberInput;
