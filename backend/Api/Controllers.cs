using Data;
using Data.Entity;
using Microsoft.AspNetCore.Mvc;

using System.Runtime.InteropServices;

namespace ProjectHub.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private ProjectHubDbContext _context;

        public ProjectsController(ProjectHubDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] Projects project)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                project.CreatedAt = DateTime.UtcNow;
                project.StartDate = DateTime.SpecifyKind(project.StartDate, DateTimeKind.Utc);
                project.DueDate = DateTime.SpecifyKind(project.DueDate, DateTimeKind.Utc);

                _context.Add(project);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");

            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                var project = await _context.Projects.FindAsync(id);

                if (project == null)
                {
                    return BadRequest(ModelState);
                }

                _context.Remove(project);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");

            }
        }

    }
}
