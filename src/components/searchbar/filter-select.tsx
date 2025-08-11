import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const FilterSelect = ({ value, onChange, options }: FilterSelectProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-fit">
      <SelectValue placeholder={options[0].label} />
    </SelectTrigger>
    <SelectContent>
      {options.map(({ label, value: val }) => (
        <SelectItem key={val} value={val}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default FilterSelect;
