using Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ProjectHubDbContext : DbContext
    {
        public ProjectHubDbContext(DbContextOptions<ProjectHubDbContext> options) : base(options) { }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Client> Clients { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .HasMany(c => c.Projects)
                .WithOne(c => c.Clients)
                .HasForeignKey(c => c.Id)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }

    
}
