import type { Project } from "../../features/project-form/types";
import ProjectCard from "./project-card";

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
  view: "grid" | "list";
}

const ProjectList = ({ projects, onDelete, onEdit, view }: ProjectListProps) => {
  if (projects.length === 0) {
    return <p className="text-gray-400 text-center max-w-md mx-auto mt-20">No projects yet</p>;
  }

  const containerClass =
    view === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
      : "flex flex-col gap-4 mt-4";

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className={containerClass}>
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} onDelete={onDelete} onEdit={onEdit} />
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
