using Data.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class ProjectHubDbContext : DbContext
    {
        public ProjectHubDbContext(DbContextOptions<ProjectHubDbContext> options) : base(options) { }
        public DbSet<Projects> Projects { get; set; }
    }
}
