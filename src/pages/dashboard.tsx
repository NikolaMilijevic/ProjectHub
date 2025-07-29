import { useState } from "react";
import { useProjectContext } from "../components/project-context";
import DashboardHeader from "../components/dashboard-header";
import SearchComponent from "../components/search-component";
import ProjectList from "../components/project-list";
import ProjectsContainer from "../components/project-container";


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
      {/* <div className="pt-20 sm:pt-10">
        <SearchComponent />
      </div> */}

      {/* <ProjectList projects={filteredProjects} onDelete={(id) => deleteProjects(id)} /> */}
      <ProjectsContainer />

    </div>
  );
};

export default DashboardPage;