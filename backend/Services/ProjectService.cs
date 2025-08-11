using Data.Entity;
using Data.Enum;
using Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Dtos;

namespace Services
{
    public class ProjectService : IProjectService
    {
        private readonly ProjectHubDbContext _context;

        public ProjectService(ProjectHubDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Projects>> GetAllProjectsAsync() =>
            await _context.Projects.Include(p => p.Client).ToListAsync();

        public async Task<Projects?> GetProjectByIdAsync(int id) =>
            await _context.Projects.Include(p => p.Client).FirstOrDefaultAsync(p => p.Id == id);

        public async Task<PagedResult<Projects>> GetProjectsPagedAsync(int pageNumber, int pageSize, string? search, string? status, string?priority, string? sortBy, string? sortOrder)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            var query = _context.Projects.Include(p => p.Client).AsQueryable();

            if(!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p =>
                    p.ProjectTitle.ToLower().Contains(search) ||
                    p.Client.ClientName.ToLower().Contains(search) ||
                    p.Description.ToLower().Contains(search));
            }

            if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<InitialStatus>(status, true, out var statusEnum))
            {
                // Assuming InitialStatus is a string enum or string property
                query = query.Where(p => p.InitialStatus == statusEnum);
            }

            if (!string.IsNullOrWhiteSpace(priority) && Enum.TryParse<PriorityLevel>(priority, true, out var priorityEnum))
            {
                // Assuming PriorityLevel is a string enum or string property
                query = query.Where(p => p.PriorityLevel == priorityEnum);
            }

            query = (sortBy?.ToLower(), sortOrder?.ToLower()) switch
            {
                ("title", "asc") => query.OrderBy(p => p.ProjectTitle),
                ("title", "desc") => query.OrderByDescending(p => p.ProjectTitle),
                ("client", "asc") => query.OrderBy(p => p.Client.ClientName),
                ("client", "desc") => query.OrderByDescending(p => p.Client.ClientName),
                ("budget", "asc") => query.OrderBy(p => p.Budget),
                ("budget", "desc") => query.OrderByDescending(p => p.Budget),
                ("createdAt", "asc") => query.OrderBy(p => p.CreatedAt),
                ("createdAt", "desc") => query.OrderByDescending(p => p.CreatedAt),
                _ => query.OrderByDescending(p => p.CreatedAt)
            };

            var totalItems = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<Projects>
            {
                Items = items,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize)
            };
        }

        public async Task<Projects> CreateProjectAsync(Projects project)
        {
            project.StartDate = DateTime.SpecifyKind(project.StartDate, DateTimeKind.Utc);
            project.DueDate = DateTime.SpecifyKind(project.DueDate, DateTimeKind.Utc);
            project.CreatedAt = DateTime.UtcNow;
            project.LastModified = DateTime.UtcNow;

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Projects?> UpdateProjectAsync(int id, Projects updatedProject)
        {
            var existing = await _context.Projects.Include(p => p.Client).FirstOrDefaultAsync(p => p.Id == id);
            if (existing == null) return null;

            existing.ProjectTitle = updatedProject.ProjectTitle;
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

        public async Task<Projects?> PatchProjectAsync(int id, Dictionary<string, object> updates)
        {
            var existing = await _context.Projects.Include(p => p.Client).FirstOrDefaultAsync(p => p.Id == id);
            if (existing == null) return null;

            foreach (var (key, value) in updates)
            {
                switch (key.ToLower())
                {
                    case "projecttitle": existing.ProjectTitle = value.ToString(); break;
                    case "description": existing.Description = value.ToString(); break;
                    case "budget": existing.Budget = Convert.ToDecimal(value); break;
                    case "startdate": existing.StartDate = Convert.ToDateTime(value).ToUniversalTime(); break;
                    case "duedate": existing.DueDate = Convert.ToDateTime(value).ToUniversalTime(); break;
                    case "initialstatus": existing.InitialStatus = (InitialStatus)Convert.ToInt32(value); break;
                    case "prioritylevel": existing.PriorityLevel = (PriorityLevel)Convert.ToInt32(value); break;
                    case "progress": existing.Progress = Convert.ToInt32(value); break;
                    case "client":
                        if (value is Dictionary<string, object> clientData)
                        {
                            if (existing.Client == null) existing.Client = new Client();
                            if (clientData.TryGetValue("clientName", out var clientName))
                                existing.Client.ClientName = clientName.ToString();
                        }
                        break;
                }
            }

            existing.LastModified = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteClientAsync(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null) return false;

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
