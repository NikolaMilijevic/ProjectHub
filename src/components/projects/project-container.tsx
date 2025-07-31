import ProjectList from "./project-list";
import EditProjectModal from "../edit-project/edit-project-modal";
import SearchBar from "../searchbar/searchbar";

import { useProjects } from "../../api/hooks";
import { useProjectFilters } from "./use-project-filters";
import { useProjectMutations } from "./handler";

import Loading from "./loading";
import ErrorMessage from "./error-message";
import EmptyState from "./empty-state";

import { useState } from "react";
import type { Project } from "../../features/project-form/types";

const ProjectsContainer = () => {
  const { data: projects = [], isLoading, error } = useProjects();

  const { filters, setFilters, filteredProjects } = useProjectFilters(projects);
  const { deleteProject, updateProjectHandler } = useProjectMutations();

  const [editingProject, setEditingProject] = useState<any>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleSave = (updatedProject: Project) => {
    updateProjectHandler(updatedProject);
    setEditingProject(null);
  };

  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
  };
  

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={(error as Error).message} />;
  if (!projects.length) return <EmptyState />;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-4 px-4 flex flex-col items-center">
        <SearchBar onSearch={handleSearch} onViewChange={handleViewChange} />
        <p className="text-gray-400 text-sm sm:text-base break-words text-center mt-2">
          Showing {filteredProjects.length} of {projects.length}
        </p>
      </div>

      <ProjectList
        projects={filteredProjects}
        onDelete={handleDelete}
        onEdit={handleEdit}
        view={view}
      />

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ProjectsContainer;
