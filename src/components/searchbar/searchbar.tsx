import { useEffect, useRef, useState } from "react";
import SearchInput from "./search-input";
import FilterSelect from "./filter-select";
import ViewToggle from "./view-toggle";
import { debounce } from "lodash";

interface Filters {
  term: string;
  status: string;
  priority: string;
  sortBy: string;
  sortOrder?: "asc" | "desc";
}

interface SearchBarProps {
  filters: Filters;
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

const SORT_OPTIONS = [
  { label: "Newest First", value: "dateDesc" },
  { label: "Oldest First", value: "dateAsc" },
]

const DEFAULT_DEBOUNCE_MS = 1000;

const SearchBar = ({ filters, onSearch, onViewChange }: SearchBarProps) => {
  const [localTerm, setLocalTerm] = useState(filters.term ?? "");
  const [view, setView] = useState<"grid" | "list">("grid");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
    if(filters.term !== localTerm) {
      setLocalTerm(filters.term ?? "");
    }
  }, [filters])

  const debouncedSearchRef = useRef(
    debounce((term: string) => {
      const latest = filtersRef.current ?? ({} as Filters);
      onSearch({ ...latest, term});
    }, DEFAULT_DEBOUNCE_MS)
  )

  useEffect(() => {
    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [filters.term]);

  const handleTermChange = (term: string) => {
    setLocalTerm(term);
    debouncedSearchRef.current(term)
  };

  const handleStatusChange = (status: string) => {
    debouncedSearchRef.current.cancel();
    onSearch({ ...filtersRef.current, status });
  };

  const handlePriorityChange = (priority: string) => {
    debouncedSearchRef.current.cancel();
    onSearch({ ...filtersRef.current, priority });
  };

  const handleSortChange = (value: string) => {
    debouncedSearchRef.current.cancel();
    onSearch({ ...filtersRef.current, sortBy: value});
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    onViewChange(newView);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-3 p-3 border rounded shadow-sm">
      <SearchInput ref={inputRef} value={localTerm} onChange={handleTermChange} />
      <FilterSelect value={filters.status} onChange={handleStatusChange} options={STATUS_OPTIONS} />
      <FilterSelect value={filters.priority} onChange={handlePriorityChange} options={PRIORITY_OPTIONS} />
      <FilterSelect value={filters.sortBy} onChange={handleSortChange} options={SORT_OPTIONS} />
      <ViewToggle view={view} onChange={handleViewChange} />
    </div>
  );
};

export default SearchBar;
