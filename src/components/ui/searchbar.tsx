import { Formik, Form, Field } from "formik";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Search, Grid3x3, Menu } from "lucide-react";

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const initialValues = { searchTerm: "" };

    return (
        <div className="border rounded p-5 flex items-center justify-center ml-80 mr-80">
        <Formik initialValues={initialValues} onSubmit={(values) => {
            onSearch(values.searchTerm);
        }}>
            {() => (
            <Form className="flex items-center border rounded p-1 shadow-sm w-full mr-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Field
                type="text"
                name="searchTerm"
                placeholder="Search projects..."
                className="outline-none px-3 py-1 w-full rounded"
                />
            </Form>
            )}
        </Formik>
        <div className="flex items-center space-x-2">
            <select name="status" className="w-30 p-2 border rounded">
            <option value="All Status">All Status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            </select>

            <select name="priority" className="w-30 p-2 border rounded">
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
            className="bg-violet-400 text-white"
            >
                <Grid3x3></Grid3x3>
            </ToggleGroupItem>
            <ToggleGroupItem 
                value="list"
                className=" bg-violet-400 text-white"
            >
                <Menu></Menu>
            </ToggleGroupItem>
        </ToggleGroup>
        </div>
        </div>
    );
};

export default SearchBar;