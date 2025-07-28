using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Data
{
    public class ProjectHubDbContextFactory : IDesignTimeDbContextFactory<ProjectHubDbContext>
    {
        public ProjectHubDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ProjectHubDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Database=ProjectHub;Username=postgres;Password=N!kola.12345!");

            return new ProjectHubDbContext(optionsBuilder.Options);
        }
    }
}
