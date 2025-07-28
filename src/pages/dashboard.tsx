import { useState } from "react";
import { useProjectContext } from "../components/project-context";
import DashboardHeader from "../components/dashboard-header";
import SearchComponent from "../components/search-component";
import ProjectList from "../components/project-list";


const DashboardPage: React.FC = () => {
    const{ projects, deleteProjects } = useProjectContext();
    const [filters, setFilters] = useState({ term: '', status: 'All Status', priority: 'All Priority' });

    const filteredProjects = projects.filter(project => {
      const matchesTerm = project.projectTitle.toLowerCase().includes(filters.term.toLowerCase());
      const matchesStatus = filters.status === 'All Status' || project.initialStatus === filters.status;
      const matchesPriority = filters.priority === 'All Priority' || project.priorityLevel === filters.priority;
      return matchesTerm && matchesStatus && matchesPriority;
    });

  return (
    <div>
      <DashboardHeader />
      <div className="pt-20 sm:pt-10">
        <SearchComponent />
      </div>

      <div className="w-full max-w-4xl mx-auto mt-4 px-4 flex justify-center">
        <p className="text-gray-400 text-sm sm:text-base break-words text-center">
          Showing {filteredProjects.length} of {projects.length}
        </p>
      </div>

      <ProjectList projects={filteredProjects} onDelete={(id) => deleteProjects(id)} />

    </div>
  );
};

export default DashboardPage;