import { Button } from "./ui/button";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import SearchBar from "./ui/searchbar";
import { useProjectContext } from "./project-context";
import { Trash2, Edit, User, Calendar } from "lucide-react";
import { Progress } from "./ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Badge } from "./ui/badge";


const DashboardPage: React.FC = () => {
    const router = useRouter();
    const{ projects, deleteProjects } = useProjectContext();
    const [filters, setFilters] = useState({ term: '', status: 'All Status', priority: 'All Priority' });

    const filteredProjects = projects.filter(project => {
      const matchesTerm = project.projectTitle.toLowerCase().includes(filters.term.toLowerCase());
      const matchesStatus = filters.status === 'All Status' || project.initialStatus === filters.status;
      const matchesPriority = filters.priority === 'All Priority' || project.priorityLevel === filters.priority;
      return matchesTerm && matchesStatus && matchesPriority;
    });

  return (
    <>
    <div className="flex items-center justify-between p-4 ml-80 mr-80">
      <div className="flex items-center space-x-4">
        <img src="../../violet-folder.png" alt="violet-folder" className="h-15 w-15 rounded-2xl" />
        <div>
          <h1 className="text-2xl font-bold">ProjectHub</h1>
          <p className="text-gray-500">Manage your project efficiently</p>
        </div>
      </div>
      <div>
        <Button 
            variant={'ghost'} 
            className="bg-violet-400 hover:bg-violet-500 ml-5 text-white hover:text-white" 
            onClick={() => router.navigate({ to: '/new-project'})}
        >
            + New Project
        </Button>
      </div>
    </div>
    <hr />
    <div className="mt-25">
      <SearchBar onSearch={setFilters}/>
    </div>
    <div className="ml-80 text-gray-400 mt-5">
      Showing {filteredProjects.length} of {projects.length}
    </div>
    {projects.length === 0 && (
      <p className="text-gray-400 ml-225 mt-20">No projects yet</p>
    )}
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-74 mr-74 items-stretch">
        {filteredProjects.map((project) => (
          <div key={project.id} className="border-l-4 border-l-violet-500/20 rounded-lg shadow p-4 min-h-70 flex flex-col justify-between">
              <div>
                <div className="flex justify-between">
                <h2 className="text-lg font-bold">{project.projectTitle}</h2>
                <div>
                <Button
                className="ml-2 bg-white text-black" 
                >
                  <Edit />
                </Button>
                <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={'destructive'}
                          className="bg-white text-red-500 ml-2"
                        >
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project <strong>{project.projectTitle}</strong>.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500" onClick={() => deleteProjects(project.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    </div>
                  </div>
              </div>
              <p className="text-sm text-gray-400 break-words line-clamp-3">{project.description}</p>
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
                <div className="mt-3">
                  <Badge 
                  className={
                    project.initialStatus === "Planning" ? "bg-yellow-300 text-yellow-700 mr-3 rounded-2xl"
                    : project.initialStatus === "In Progress" ? "bg-blue-300 text-blue-700 mr-3 rounded-2xl"
                    : project.initialStatus === "Completed" ? "bg-green-300 text-green-700 mr-3 rounded-2xl" 
                    : ""
                  }
                  >
                    {project.initialStatus}
                  </Badge>
                  <Badge 
                  className={
                    project.priorityLevel === "Low" ? "bg-green-300 text-green-700 rounded-2xl"
                    : project.priorityLevel === "Medium" ? "bg-orange-300 text-orange-700 rounded-2xl"
                    : project.priorityLevel === "High" ? "bg-red-300 text-red-700 rounded-2xl" 
                    : ""
                  }>
                    {project.priorityLevel}
                  </Badge>
                </div>

                <div className="mt-5 flex justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-green-600 mr-1"></Calendar>
                    <p className="font-bold text-sm mr-2">
                      Created
                    </p>
                    <p className="text-gray-400 text-sm">
                      {project.createdAt ? new Date(project.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day:'numeric',
                      }) : 'N/A'}
                    </p>
                  </div >
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-violet-600 mr-1"></Calendar>
                    <p className="font-bold text-sm mr-2">
                      Due 
                    </p>
                    <p className="text-gray-400 text-sm">
                      {project.dueDate ? new Date(project.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default DashboardPage;