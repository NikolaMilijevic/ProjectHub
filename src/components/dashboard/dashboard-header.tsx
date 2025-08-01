import NavigationButton from "../ui/navigation-button";

const DashboardHeader = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-evenly w-full p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0 max-w-full px-4 sm:px-0">
        <img
          src="../../violet-folder.png"
          alt="violet-folder"
          className="h-12 w-12 rounded-2xl flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-2xl font-bold truncate">ProjectHub</p>
          <p className="text-gray-500 truncate">Manage your project efficiently</p>
        </div>
      </div>
      <div className="px-4 sm:px-0">
        <NavigationButton buttonText="+ New Project" buttonRoute="/new-project" icon="" className="bg-violet-400 hover:bg-violet-500 ml-5 text-white hover:text-white p-4" />
      </div>
    </header>
  );
};

export default DashboardHeader;
