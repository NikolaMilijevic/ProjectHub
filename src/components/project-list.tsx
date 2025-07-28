import ProjectCard from "./project-card";

interface ProjectListProps {
  projects: any[];
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete }) => {
  if (projects.length === 0) {
    return <p className="text-gray-400 text-center max-w-md mx-auto mt-20">No projects yet</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto items-stretch">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
