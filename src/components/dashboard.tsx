import { Button } from "./ui/button";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import SearchBar from "./ui/searchbar";


const DashboardPage: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (term: string) => {
      setSearchQuery(term);
      console.log('Searching for:', term);
    }

  return (
    <>
    <div className="flex items-center justify-between p-4 ml-80 mr-30">
      <div className="flex items-center space-x-4">
        <img src="../../violet-folder.png" alt="violet-folder" className="h-15 w-15 rounded-2xl" />
        <div>
          <h1 className="text-2xl font-bold">ProjectHub</h1>
          <p className="text-gray-500">Manage your project efficiently</p>
        </div>
      </div>
      <div>
        <Button 
            variant={'ghost'} 
            className="bg-violet-400 hover:bg-violet-500 ml-5 text-white hover:text-white" 
            onClick={() => router.navigate({ to: '/new-project'})}
        >
            + New Project
        </Button>
      </div>
    </div>
    <hr />
    <div className="mt-25">
      <SearchBar onSearch={handleSearch}/>
    </div>
    {searchQuery && (
      <div className="p-4 ml-80 text-gray-600">
        Showing results for: <span className="font-semibold">{searchQuery}</span>
      </div>
    )}
    </>
  );
};

export default DashboardPage;