import { Formik, Form, Field } from "formik";
import { Search, Grid3x3, Menu } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";

interface SearchComponentProps {
  onSearch: (filters: { term: string; status: string; priority: string }) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const initialValues = { searchTerm: "" };
  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");

  const handleFilterChange = (term: string, newStatus = status, newPriority = priority) => {
    onSearch({
      term,
      status: newStatus,
      priority: newPriority,
    });
  };

  return (
    <div className="border rounded p-5 flex flex-col sm:flex-row sm:items-center justify-between max-w-4xl mx-auto gap-4">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleFilterChange(values.searchTerm)}
      >
        {({ values, handleChange }) => (
          <Form className="flex items-center border rounded p-1 shadow-sm w-full flex-grow sm:flex-grow-0">
            <Search className="w-5 h-5 text-gray-500" />
            <Field
              type="text"
              name="searchTerm"
              placeholder="Search projects..."
              className="outline-none px-3 py-1 w-full rounded"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleFilterChange(e.target.value);
              }}
              value={values.searchTerm}
            />
          </Form>
        )}
      </Formik>

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:flex-grow-0">
        <select
          name="status"
          value={status}
          onChange={(e) => {
            const newStatus = e.target.value;
            setStatus(newStatus);
            handleFilterChange("", newStatus, priority);
          }}
          className="w-full sm:w-40 p-2 border rounded"
        >
          <option value="All Status">All Status</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          name="priority"
          value={priority}
          onChange={(e) => {
            const newPriority = e.target.value;
            setPriority(newPriority);
            handleFilterChange("", status, newPriority);
          }}
          className="w-full sm:w-40 p-2 border rounded"
        >
          <option value="All Priority">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <ToggleGroup type="single" className="flex items-center border-1 rounded p-1">
          <ToggleGroupItem value="grid" className="p-1 rounded hover:bg-gray-100 data-[state=on]:bg-violet-200">
            <Grid3x3 />
          </ToggleGroupItem>
          <ToggleGroupItem value="list " className="p-1 rounded hover:bg-gray-100 data-[state=on]:bg-violet-200">
            <Menu />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default SearchComponent;
