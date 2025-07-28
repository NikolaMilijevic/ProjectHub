import { Formik, Form, Field } from "formik";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => (
  <Formik
    initialValues={{ searchTerm: "" }}
    onSubmit={(values) => onSearch(values.searchTerm)}
  >
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
            onSearch(e.target.value);
          }}
          value={values.searchTerm}
        />
      </Form>
    )}
  </Formik>
);

export default SearchInput;
