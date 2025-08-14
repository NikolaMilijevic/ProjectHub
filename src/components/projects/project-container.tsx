import ProjectList from "./project-list";
import SearchBar from "../searchbar/searchbar";

import { useProjectPaged } from "../../api/hooks/use-projects";
import { useProjectMutations } from "../../api/hooks/use-project-mutations";

import Loading from "./loading";
import ErrorMessage from "./error-message";
import EmptyState from "./empty-state";

import { useEffect, useMemo, useState } from "react";

import debounce from "lodash/debounce";
import ShadcnPagination from "../view-project/pagination";

import { defaultProjectFilters, type ProjectFilters } from "./project-filters";

const ProjectsContainer = () => {
  const { deleteProject } = useProjectMutations();
  
  const [view, setView] = useState<"grid" | "list">(
    () => (localStorage.getItem("viewMode") as "grid" | "list") || "grid"
  );
 const [filters, setFilters] = useState<ProjectFilters>(defaultProjectFilters);

  const [debouncedFilters, setDebouncedFilters] = useState(defaultProjectFilters);

  const debouncedSetFilters = useMemo(
    () =>
      debounce((newFilters: ProjectFilters) => {
        setDebouncedFilters(newFilters);
        setCurrentPage(1);
      }, 300),
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  
 const { data, isLoading, error } = useProjectPaged({
    pageNumber: currentPage,
    pageSize: itemsPerPage,
    search: debouncedFilters.term,
    status: debouncedFilters.status,
    priority: debouncedFilters.priority,
    sortBy: debouncedFilters.sortBy,
    sortOrder: debouncedFilters.sortOrder,
  });

  const handleSearch = (updated: Partial<ProjectFilters>) => {
     setFilters((prev) => {
      const merged = { ...prev, ...updated };
      debouncedSetFilters(merged);
      return merged;
    });  
  };
  
    const handleViewChange = (newView: "grid" | "list") => {
      setView(newView);
      localStorage.setItem("viewMode", newView);
    };

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, isLoading]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={(error as Error).message} />;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-4 px-4 flex flex-col items-center">
        <SearchBar filters={filters} onSearch={handleSearch} onViewChange={handleViewChange} />
        {/* <p className="text-gray-400 text-sm sm:text-base break-words text-center mt-2">
          Showing {data?.items.length} of {data?.totalItems} (Page {data?.pageNumber}/{data?.totalPages})
        </p> */}
      </div>

      {data?.items.length === 0 ? (
        <EmptyState />
      ) : (
      <ProjectList
        projects={data?.items ?? []}
        onDelete={handleDelete}
        view={view}
      />
      )}

      {(data?.totalPages?? 0) > 1 && (
        <ShadcnPagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 0}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default ProjectsContainer;
