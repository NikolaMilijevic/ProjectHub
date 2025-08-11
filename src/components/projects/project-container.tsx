import ProjectList from "./project-list";
import EditProjectModal from "../edit-project/edit-project-modal";
import SearchBar from "../searchbar/searchbar";

import { useProjectPaged } from "../../api/hooks/use-projects";
import { useProjectMutations } from "../../api/hooks/use-project-mutations";

import Loading from "./loading";
import ErrorMessage from "./error-message";
import EmptyState from "./empty-state";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "../../features/project-form/types";

import debounce from "lodash/debounce";


const ProjectsContainer = () => {
  const { deleteProject, updateProjectHandler } = useProjectMutations();
  
  const [view, setView] = useState<"grid" | "list">("grid");
  const [rawFilters, setRawFilters] = useState({
    term: "",
    status: "",
    priority: "",
    sortBy: "createdAt",
    sortOrder: "desc" as "asc" | "desc",
  });
  
  const [searchFilters, setSearchFilters] = useState(rawFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
 const { data, isLoading, error } = useProjectPaged({
    pageNumber: currentPage,
    pageSize: itemsPerPage,
    search: searchFilters.term,
    status: searchFilters.status,
    priority: searchFilters.priority,
    sortBy: searchFilters.sortBy,
    sortOrder: searchFilters.sortOrder,
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleDelete = (id: string) => {
    deleteProject(id);
    if(editingProject?.id == id) setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleSave = (updatedProject: Project) => {
    updateProjectHandler(updatedProject);
    setEditingProject(null);
  };

   const debouncedSetSearchFilters = useMemo(
    () =>
      debounce((filters: typeof rawFilters) => {
        setSearchFilters(filters);
        setCurrentPage(1);
      }, 300),
    []
  );

  const handleSearch = (updatedFilters: Partial<typeof rawFilters>) => {
     setRawFilters((prev) => {
      const merged = { ...prev, ...updatedFilters };
      debouncedSetSearchFilters(merged);
      return merged;
    });  
};

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
  };
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, isLoading]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={(error as Error).message} />;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-4 px-4 flex flex-col items-center">
        <SearchBar filters={searchFilters} onSearch={handleSearch} onViewChange={handleViewChange} />
        <p className="text-gray-400 text-sm sm:text-base break-words text-center mt-2">
          Showing {data?.items.length} of {data?.totalItems} (Page {data?.pageNumber}/{data?.totalPages})
        </p>
      </div>

      {data?.items.length === 0 ? (
        <EmptyState />
      ) : (
      <ProjectList
        projects={data?.items ?? []}
        onDelete={handleDelete}
        onEdit={handleEdit}
        view={view}
      />
      )}

      {(data?.totalPages?? 0) > 1 && (
        <div className="flex justify-center items-center gap-2 my-4">
          <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(p => p - 1)
          }}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: data?.totalPages ?? 0 }, (_, i) => (
            <button
            key={i+1}
            onClick={() => {
              setCurrentPage(i + 1)
            }}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            >
              {i + 1}
            </button>
          ))}
          <button
          disabled={data?.pageNumber === data?.totalPages}
          onClick={() => {
            setCurrentPage(p => p + 1)
          }}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      
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
