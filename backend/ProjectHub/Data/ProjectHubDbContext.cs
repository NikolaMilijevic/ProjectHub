using Microsoft.EntityFrameworkCore;
using ProjectHub.Models;
namespace ProjectHub.Data {
    public class ProjectHubDbContext : DbContext
    {
        public ProjectHubDbContext(DbContextOptions<ProjectHubDbContext> options) : base(options) { }
        public DbSet<Project> projects { get; set; }
    }
}
