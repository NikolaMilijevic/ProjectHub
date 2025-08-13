export type ProjectFilters = {
  term: string;
  status: string;
  priority: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
};

export const defaultProjectFilters: ProjectFilters = {
  term: "",
  status: "",
  priority: "",
  sortBy: "createdAt",
  sortOrder: "desc",
};