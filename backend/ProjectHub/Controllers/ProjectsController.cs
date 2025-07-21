using Microsoft.AspNetCore.Mvc;
using ProjectHub.Data;
using ProjectHub.Models;

namespace ProjectHub.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectHubDbContext _context;

        public ProjectsController(ProjectHubDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] Project project)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                project.createdAt = DateTime.UtcNow;
                project.startDate = DateTime.SpecifyKind(project.startDate, DateTimeKind.Utc);
                project.dueDate = DateTime.SpecifyKind(project.dueDate, DateTimeKind.Utc);

                _context.Add(project);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProject), new { id = project.id }, project);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");

            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _context.projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("pong");
        }

    }
}
