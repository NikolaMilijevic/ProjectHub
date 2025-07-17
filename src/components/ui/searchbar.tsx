import { Formik, Form, Field } from "formik";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Search, Grid3x3, Menu } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
    onSearch: (filters: { term: string; status: string; priority: string;}) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const initialValues = { searchTerm: "" };

    const [status, setStatus] = useState('All Status');
    const [priority, setPrioirty] = useState('All Priority');

    const handleFilterChange = (term: string, newStatus = status, newPriority = priority) => {
        onSearch({
            term,
            status: newStatus,
            priority: newPriority,
        });
    };

    return (
        <div className="border rounded p-5 flex items-center justify-center ml-80 mr-80">
        <Formik 
            initialValues={initialValues}
            onSubmit={(values) => 
                handleFilterChange(values.searchTerm)
        }>
            {({ values, handleChange }) => (
            <Form className="flex items-center border rounded p-1 shadow-sm w-full mr-2">
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
        <div className="flex items-center space-x-2">
            <select 
                name="status" 
                value={status} 
                onChange={(e) => {
                    const newStatus = e.target.value;
                    setStatus(newStatus);
                    handleFilterChange("", newStatus, priority);
                }}
                className="w-30 p-2 border rounded">
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
                    setPrioirty(newPriority);
                    handleFilterChange("", status, newPriority);
                }}
                className="w-30 p-2 border rounded">
            <option value="All Priority">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>
                
        <ToggleGroup 
            type="single" 
            className="flex items-center border-1 "
        >
            <ToggleGroupItem 
            value="grid"
            >
                <Grid3x3></Grid3x3>
            </ToggleGroupItem>
            <ToggleGroupItem 
                value="list"
            >
                <Menu></Menu>
            </ToggleGroupItem>
        </ToggleGroup>
        </div>
        </div>
    );
};

export default SearchBar;