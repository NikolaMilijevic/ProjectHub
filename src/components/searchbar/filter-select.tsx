
interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const FilterSelect = ({ value, onChange, options }: FilterSelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border rounded p-2"
  >
    {options.map(({ label, value: val }) => (
      <option key={val} value={val}>
        {label}
      </option>
    ))}
  </select>
);

export default FilterSelect;
