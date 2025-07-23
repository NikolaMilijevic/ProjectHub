import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Project {
  projectTitle: string;
  client: string;
  description: string;
  budget: number;
  startDate: string;
  dueDate: string;
  initialStatus: string;
  priorityLevel: string;
  progress: number;
  id?: string;
  createdAt: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProjects: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjectContext must be used inside ProjectProvider');
  return context;
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const deleteProjects = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
