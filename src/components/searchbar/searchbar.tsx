import React, { useState } from "react";
import SearchInput from "./search-input";
import FilterSelect from "./filter-select";
import ViewToggle from "./view-toggle";

interface Filters {
  term: string;
  status: string;
  priority: string;
}

interface SearchBarProps {
  onSearch: (filters: Filters) => void;
  onViewChange: (view: "grid" | "list") => void;
}

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Planning", value: "Planning" },
  { label: "In Progress", value: "InProgress" },
  { label: "Completed", value: "Completed" },
];

const PRIORITY_OPTIONS = [
  { label: "All Priority", value: "" },
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onViewChange }) => {
  const [filters, setFilters] = useState<Filters>({ term: "", status: "", priority: "" });
  const [view, setView] = useState<"grid" | "list">("grid");

  const updateFilters = (updated: Partial<Filters>) => {
    const newFilters = { ...filters, ...updated };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    onViewChange(newView);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-3 p-3 border rounded shadow-sm">
      <SearchInput value={filters.term} onChange={(term) => updateFilters({ term })} />
      <FilterSelect value={filters.status} onChange={(status) => updateFilters({ status })} options={STATUS_OPTIONS} />
      <FilterSelect value={filters.priority} onChange={(priority) => updateFilters({ priority })} options={PRIORITY_OPTIONS} />
      <ViewToggle view={view} onChange={handleViewChange} />
    </div>
  );
};

export default SearchBar;
