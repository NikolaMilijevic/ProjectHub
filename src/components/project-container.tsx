import ProjectList from "./project-list";
import { useProjects } from "../api/hooks";
import { useDeleteProject } from "../api/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateProject } from "../api/update-project";
import EditProjectModal from "./edit-project-modal";
import SearchBar from "./searchbar1";

const ProjectsContainer = () => {
  const { data: projects, isLoading, error } = useProjects();
  const deleteMutation = useDeleteProject();
  const queryClient = useQueryClient();

  const [editingProject, setEditingProject] = useState(null);
  const [filters, setFilters] = useState({ term: "", status: "", priority: "" });
  const [view, setView] = useState<"grid" | "list">("grid");

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setEditingProject(null);
    },
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate(Number(id));
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
  };

  const handleSave = (updatedProject: any) => {
    updateMutation.mutate(updatedProject);
  };

  const handleSearch = (newFilters: { term: string; status: string; priority: string }) => {
    setFilters(newFilters);
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
  };

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {(error as Error).message}</div>;

  if (!projects || projects.length === 0) return <div>No projects found.</div>;

  const filteredProjects = projects.filter((project: any) => {
    const termLower = filters.term.toLowerCase();

    const matchesTerm =
      project.projectTitle.toLowerCase().includes(termLower) ||
      project.description.toLowerCase().includes(termLower) ||
      (project.client?.clientName || "").toLowerCase().includes(termLower);

    const matchesStatus = !filters.status || project.initialStatus === filters.status;
    const matchesPriority = !filters.priority || project.priorityLevel === filters.priority;

    return matchesTerm && matchesStatus && matchesPriority;
  });

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-4 px-4 flex flex-col items-center">
        <SearchBar onSearch={handleSearch} onViewChange={handleViewChange} />
        <p className="text-gray-400 text-sm sm:text-base break-words text-center mt-2">
          Showing {filteredProjects.length} of {projects.length}
        </p>
      </div>
      <ProjectList projects={filteredProjects || []} onDelete={handleDelete} onEdit={handleEdit} view={view} />
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
