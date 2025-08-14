using Data.Entity;
using Data.Dtos;

namespace Services.Services.Project
{
    public interface IProjectService
    {
        Task<IEnumerable<Project>> GetAllProjectsAsync();
        Task<Project?> GetProjectByIdAsync(int id);
        Task<PagedResult<Project>> GetProjectsPagedAsync
            (int pageNumber, int pageSize, string? search, string? status, string? priority, string? sortBy, string? sortOrder);
        Task<Project> CreateProjectAsync(Project project);
        Task<Project?> UpdateProjectAsync(int id, Project updatedProject);
        //Task<Project?> PatchProjectAsync(int id, Dictionary<string, object> updates);
        Task<bool> DeleteProjectAsync(int id);
        Task<bool> DeleteClientAsync(int id);
    }

}
