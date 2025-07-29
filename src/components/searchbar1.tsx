import { useState } from "react";
import { Grid3x3, Menu, Search } from "lucide-react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface SearchBarProps {
  onSearch: (filters: { term: string; status: string; priority: string }) => void;
  onViewChange: (view: "grid" | "list") => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onViewChange }) => {
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const applyFilters = (newTerm = term, newStatus = status, newPriority = priority) => {
    onSearch({ term: newTerm, status: newStatus, priority: newPriority });
  };

   const handleViewChange = (value: string) => {
    const newView = value === "list" ? "list" : "grid";
    setView(newView);
    onViewChange(newView);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-3 p-3 border rounded shadow-sm">
      <div className="flex items-center border rounded px-2 py-1 flex-grow">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search projects..."
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            applyFilters(e.target.value);
          }}
          className="flex-grow outline-none"
        />
      </div>

      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          applyFilters(term, e.target.value, priority);
        }}
        className="border rounded p-2"
      >
        <option value="">All Status</option>
        <option value="Planning">Planning</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
          applyFilters(term, status, e.target.value);
        }}
        className="border rounded p-2"
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
       <ToggleGroup.Root
            type="single"
            value={view}
            onValueChange={handleViewChange}
            className="hidden sm:flex items-center border rounded"

        >
        <ToggleGroup.Item
          value="grid"
          className="p-2 hover:bg-gray-100 data-[state=on]:bg-violet-200 rounded"
        >
          <Grid3x3 />
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="list"
          className="p-2 hover:bg-gray-100 data-[state=on]:bg-violet-200 rounded"
        >
          <Menu />
        </ToggleGroup.Item>
        </ToggleGroup.Root>
    </div>
  );
};

export default SearchBar;
