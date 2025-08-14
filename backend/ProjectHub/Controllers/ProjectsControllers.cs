using Microsoft.AspNetCore.Mvc;
using Data.Entity;
using Services.Services.Project;

namespace ProjectHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectsController(IProjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetProjects() =>
            Ok(await _service.GetAllProjectsAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _service.GetProjectByIdAsync(id);
            return project == null ? NotFound("Project was not found") : Ok(project);
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetProjectsPaged(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? search = null,
            [FromQuery] string? status = null,
            [FromQuery] string? priority = null,
            [FromQuery] string? sortBy = "createdAt",
            [FromQuery] string? sortOrder = "desc"
        )
        {
            var pagedResult = await _service.GetProjectsPagedAsync(pageNumber, pageSize, search, status, priority, sortBy, sortOrder); 
            return Ok(pagedResult);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] Project project)
        {
            if (project == null || project.Client == null)
                return BadRequest(new { message = "Project and Client are required." });

            var created = await _service.CreateProjectAsync(project);
            return CreatedAtAction(nameof(GetProject), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] Project updatedProject)
        {
            var project = await _service.UpdateProjectAsync(id, updatedProject);
            return project == null ? NotFound(new { message = "Project not found" }) : Ok(project);
        }

        //[HttpPatch("{id}")]
        //public async Task<IActionResult> PatchProject(int id, [FromBody] Dictionary<string, object> updates)
        //{
        //    var project = await _service.PatchProjectAsync(id, updates);
        //    return project == null ? NotFound() : Ok(project);
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id) =>
            await _service.DeleteProjectAsync(id) ? NoContent() : NotFound();

    }
}
