const ProjectInformation = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
        <img src="../../violet-plus.svg" alt="violet-plus" className="w-15 h-15 object-cover rounded-lg shadow" />
        <div>
            <h2 className="text-xl font-bold">Project Information</h2>
            <h4 className="text-sm text-gray-500 mt-2 mb-4">Fill in the details for your new project</h4>
        </div>
    </div>
  )
}

export default ProjectInformation