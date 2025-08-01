import { Button } from "../ui/button";
import { Edit, User, Calendar, Trash2 } from "lucide-react";
import { Progress } from "../ui/progress";
import ConfirmDialog from "../ui/confirm-dialog";
import BadgeList from "./badge/badge-list";
import { formatDate } from "./date-utils";
import type { Project } from "../../features/project-form/types";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
}

const ProjectCard = ({ project, onDelete, onEdit }: ProjectCardProps) => (
  <div className="border-l-4 border-l-violet-500/20 rounded-lg shadow p-4 min-h-70 flex flex-col justify-between">
    <div className="flex justify-between">
      <p className="text-base sm:text-lg font-bold">{project.projectTitle}</p>
      <div>
        <Button className="ml-2 bg-white text-black hover:text-white" onClick={() => onEdit(project)}>
          <Edit />
        </Button>
        <ConfirmDialog
          triggerLabel="Delete"
          triggerIcon={<Trash2 className="w-4 h-4 text-red-500" />}
          triggerVariant="destructive"
          className="bg-white text-red-500 ml-2 hover:text-white"
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete the project."
          onConfirm={() => onDelete(project.id)}
        />
      </div>
    </div>

    <p className="text-xs sm:text-sm text-gray-400">{project.description}</p>

    <div className="mt-auto">
      <div className="text-sm text-gray-400 mb-0 mt-0 flex items-center min-h-12">
        <User className="w-4 h-4 mr-1" />
        {project.client?.clientName || "No client."}
      </div>

      <div className="flex justify-between">
        <p className="text-gray-400">Progress</p>
        <p className="text-violet-600">{project.progress}%</p>
      </div>
      <Progress className="bg-gray-100" progressColor="bg-violet-600" value={project.progress} />

      <BadgeList status={project.initialStatus} priority={project.priorityLevel} />

      <div className="mt-5 flex justify-between text-sm text-gray-400">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-green-600 mr-1" />
          <p className="font-bold mr-2">Created</p>
          <p>{formatDate(project.createdAt, true)}</p>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-violet-600 mr-1" />
          <p className="font-bold mr-2">Modified</p>
          <p>{formatDate(project.lastModified)}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
