import { useState } from "react";

interface SearchFiltersProps {
  onChange: (status: string, priority: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onChange }) => {
  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onChange(newStatus, priority);
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority);
    onChange(status, newPriority);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        name="status"
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="w-30 p-2 border rounded"
      >
        <option value="All Status">All Status</option>
        <option value="Planning">Planning</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        name="priority"
        value={priority}
        onChange={(e) => handlePriorityChange(e.target.value)}
        className="w-30 p-2 border rounded"
      >
        <option value="All Priority">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default SearchFilters;
