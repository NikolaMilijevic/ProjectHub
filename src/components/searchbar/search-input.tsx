import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="flex items-center border rounded px-2 py-1 flex-grow">
    <Search className="w-5 h-5 text-gray-500 mr-2" />
    <input
      type="text"
      placeholder="Search projects..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-grow outline-none"
    />
  </div>
);

export default SearchInput;
