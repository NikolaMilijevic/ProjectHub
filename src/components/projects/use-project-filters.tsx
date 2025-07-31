import { useState, useMemo } from "react";
import type { Project } from "../../features/project-form/types";

export interface Filters {
  term: string;
  status: string;
  priority: string;
  sortBy: "dateAsc" | "dateDesc" | "";
}

export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<Filters>({ term: "", status: "", priority: "", sortBy: "dateDesc" });

  const filteredProjects = useMemo(() => {
  const termLower = filters.term.toLowerCase();

  const filtered = projects.filter(project => {
    const matchesTerm =
      project.projectTitle.toLowerCase().includes(termLower) ||
      project.description.toLowerCase().includes(termLower) ||
      (project.client?.clientName || "").toLowerCase().includes(termLower);

    const matchesStatus = !filters.status || project.initialStatus === filters.status;
    const matchesPriority = !filters.priority || project.priorityLevel === filters.priority;

    return matchesTerm && matchesStatus && matchesPriority;
  });

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.createdAt || "");
    const dateB = new Date(b.createdAt || "");

    if (filters.sortBy === "dateAsc") return dateA.getTime() - dateB.getTime();
    if (filters.sortBy === "dateDesc") return dateB.getTime() - dateA.getTime();

    return 0;
  });

  return sorted;
}, [projects, filters]);

  return { filters, setFilters, filteredProjects };
}
