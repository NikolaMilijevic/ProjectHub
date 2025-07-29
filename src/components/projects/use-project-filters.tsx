import { useState, useMemo } from "react";

export interface Filters {
  term: string;
  status: string;
  priority: string;
}

export function useProjectFilters(projects: any[]) {
  const [filters, setFilters] = useState<Filters>({ term: "", status: "", priority: "" });

  const filteredProjects = useMemo(() => {
    const termLower = filters.term.toLowerCase();

    return projects.filter(project => {
      const matchesTerm =
        project.projectTitle.toLowerCase().includes(termLower) ||
        project.description.toLowerCase().includes(termLower) ||
        (project.client?.clientName || "").toLowerCase().includes(termLower);

      const matchesStatus = !filters.status || project.initialStatus === filters.status;
      const matchesPriority = !filters.priority || project.priorityLevel === filters.priority;

      return matchesTerm && matchesStatus && matchesPriority;
    });
  }, [projects, filters]);

  return { filters, setFilters, filteredProjects };
}
