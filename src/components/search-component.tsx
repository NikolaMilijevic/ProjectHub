import SearchBar from "./search-bar"

const SearchComponent = () => {
    const handleSearch = (filters: { term: string; status: string; priority: string }) => {
        console.log("Filters applied:", filters);
    };

  return (
    <SearchBar onSearch={handleSearch} />
  )
}

export default SearchComponent