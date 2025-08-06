using Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ProjectHubDbContext : DbContext
    {
        public ProjectHubDbContext(DbContextOptions<ProjectHubDbContext> options) : base(options) { }
        public DbSet<Projects> Projects { get; set; }
        public DbSet<Client> Clients { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Projects>()
                .HasOne(p => p.Client)
                .WithOne(c => c.Project)
                .HasForeignKey<Client>(c => c.Id)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
