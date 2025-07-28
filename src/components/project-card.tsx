import { Button } from "./ui/button";
import { Edit, User, Calendar } from "lucide-react";
import { Progress } from "./ui/progress";
import ConfirmDialog from "./ui/confirm-dialog";
import BadgeList from "./badge-list";
import { formatDate } from "./date-utils";

interface ProjectCardProps {
  project: any;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => (
  <div className="border-l-4 border-l-violet-500/20 rounded-lg shadow p-4 min-h-70 flex flex-col justify-between">
    <div className="flex justify-between">
      <h2 className="text-base sm:text-lg font-bold">{project.projectTitle}</h2>
      <div>
        <Button className="ml-2 bg-white text-black">
          <Edit />
        </Button>
        <ConfirmDialog
          triggerLabel="Cancel"
          triggerVariant="destructive"
          className="bg-white text-red-500 ml-2"
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
        {project.client}
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
          <p className="font-bold mr-2">Due</p>
          <p>{formatDate(project.dueDate)}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
