import DashboardHeader from "../components/dashboard/dashboard-header";
import ProjectsContainer from "../components/projects/project-container";


const DashboardPage: React.FC = () => {

  return (
    <div>
      <DashboardHeader />
      <ProjectsContainer />
    </div>
  );
};

export default DashboardPage;