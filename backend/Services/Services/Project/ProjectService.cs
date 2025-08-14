using Data.Entity;
using Data.Enum;
using Data;
using Microsoft.EntityFrameworkCore;
using Data.Dtos;

namespace Services.Services.Project
{
    public class ProjectService : IProjectService
    {
        private readonly ProjectHubDbContext _context;

        public ProjectService(ProjectHubDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProjectService>> GetAllProjectsAsync() =>
            await _context.Projects.Include(p => p.Client).ToListAsync();

        public async Task<ProjectService?> GetProjectByIdAsync(int id) =>
            await _context.Projects.Include(p => p.Client).FirstOrDefaultAsync(p => p.Id == id);

        public async Task<PagedResult<ProjectService>> GetProjectsPagedAsync(int pageNumber, int pageSize, string? search, string? status, string?priority, string? sortBy, string? sortOrder)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var query = _context.Projects.Include(p => p.Client).AsQueryable();

            if(!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p =>
                    p.Title.ToLower().Contains(search) ||
                    p.Client.ClientName.ToLower().Contains(search) ||
                    p.Description.ToLower().Contains(search));
            }

            if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<InitialStatus>(status, true, out var statusEnum))
            {
                query = query.Where(p => p.InitialStatus == statusEnum);
            }

            if (!string.IsNullOrWhiteSpace(priority) && Enum.TryParse<PriorityLevel>(priority, true, out var priorityEnum))
            {
                query = query.Where(p => p.PriorityLevel == priorityEnum);
            }

            query = (sortBy?.ToLower(), sortOrder?.ToLower()) switch
            {
                ("title", "asc") => query.OrderBy(p => p.Title),
                ("title", "desc") => query.OrderByDescending(p => p.Title),
                ("client", "asc") => query.OrderBy(p => p.Client.ClientName),
                ("client", "desc") => query.OrderByDescending(p => p.Client.ClientName),
                ("budget", "asc") => query.OrderBy(p => p.Budget),
                ("budget", "desc") => query.OrderByDescending(p => p.Budget),
                ("createdat", "asc") => query.OrderBy(p => p.CreatedAt),
                ("createdat", "desc") => query.OrderByDescending(p => p.CreatedAt),
                _ => query.OrderByDescending(p => p.CreatedAt)
            };

            var totalItems = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<ProjectService>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize)
            };
        }

        public async Task<Project> CreateProjectAsync(Project project)
        {
            project.StartDate = DateTime.SpecifyKind(project.StartDate, DateTimeKind.Utc);
            project.DueDate = DateTime.SpecifyKind(project.DueDate, DateTimeKind.Utc);
            project.CreatedAt = DateTime.UtcNow;
            project.LastModified = DateTime.UtcNow;

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project?> UpdateProjectAsync(int id, Project updatedProject)
        {
            var existing = await _context.Projects.Include(p => p.Client).FirstOrDefaultAsync(p => p.Id == id);
            if (existing == null) return null;

            existing.Title = updatedProject.Title;
            existing.Description = updatedProject.Description;
            existing.Budget = updatedProject.Budget;
            existing.StartDate = updatedProject.StartDate;
            existing.DueDate = updatedProject.DueDate;
            existing.InitialStatus = updatedProject.InitialStatus;
            existing.PriorityLevel = updatedProject.PriorityLevel;
            existing.Progress = updatedProject.Progress;

            if (updatedProject.Client != null)
                existing.Client.ClientName = updatedProject.Client.ClientName;

            existing.LastModified = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existing;
        }

        //public async Task<Project?> PatchProjectAsync(int id, Dictionary<string, object> updates)
        //{
        //    var existing = await _context.Projects.Include(p => p.Client).FirstOrDefaultAsync(p => p.Id == id);
        //    if (existing == null) return null;

        //    foreach (var (key, value) in updates)
        //    {
        //        switch (key.ToLower())
        //        {
        //            case "projecttitle": existing.Title = value.ToString(); break;
        //            case "description": existing.Description = value.ToString(); break;
        //            case "budget": existing.Budget = Convert.ToDecimal(value); break;
        //            case "startdate": existing.StartDate = Convert.ToDateTime(value).ToUniversalTime(); break;
        //            case "duedate": existing.DueDate = Convert.ToDateTime(value).ToUniversalTime(); break;
        //            case "initialstatus": existing.InitialStatus = (InitialStatus)Convert.ToInt32(value); break;
        //            case "prioritylevel": existing.PriorityLevel = (PriorityLevel)Convert.ToInt32(value); break;
        //            case "progress": existing.Progress = Convert.ToInt32(value); break;
        //            case "client":
        //                if (value is Dictionary<string, object> clientData)
        //                {
        //                    if (existing.Client == null) existing.Client = new Client();
        //                    if (clientData.TryGetValue("clientName", out var clientName))
        //                        existing.Client.ClientName = clientName.ToString();
        //                }
        //                break;
        //        }
        //    }

        //    existing.LastModified = DateTime.UtcNow;

        //    await _context.SaveChangesAsync();
        //    return existing;
        //}

        public async Task<bool> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }

        

    }
}
