using Data;
using Data.Entity;
using Data.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Runtime.InteropServices;
using System.Text.Json;

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
        public async Task<ActionResult<Projects>> CreateProject([FromBody] Projects project)
        {

                if (project == null || project.Client == null)
                {
                    return BadRequest(new { message = "Project and Client are required." });
                }

                //project.Id = 0;
                //project.Client.Id = 0;

                project.StartDate = DateTime.SpecifyKind(project.StartDate, DateTimeKind.Utc);
                project.DueDate = DateTime.SpecifyKind(project.DueDate, DateTimeKind.Utc);


                _context.Projects.Add(project);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Projects>> GetProject(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Client)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
                return NotFound();

            return project;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("client/{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] Projects updatedProject)
        {
            var existingProject = await _context.Projects
                .Include(p => p.Client)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (existingProject == null)
                return NotFound(new { message = "Project not found" });

            // Update fields
            existingProject.ProjectTitle = updatedProject.ProjectTitle;
            existingProject.Description = updatedProject.Description;
            existingProject.Budget = updatedProject.Budget;
            existingProject.StartDate = updatedProject.StartDate;
            existingProject.DueDate = updatedProject.DueDate;
            existingProject.InitialStatus = updatedProject.InitialStatus;
            existingProject.PriorityLevel = updatedProject.PriorityLevel;
            existingProject.Progress = updatedProject.Progress;

            if (updatedProject.Client != null)
                existingProject.Client.ClientName = updatedProject.Client.ClientName;

            await _context.SaveChangesAsync();

            return Ok(existingProject);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchProject(int id, [FromBody] JsonElement updates)
        {
            var existingProject = await _context.Projects
                .Include(p => p.Client)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (existingProject == null)
                return NotFound();

            // Convert JsonElement to dictionary
            var updatesDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(updates.GetRawText());

            foreach (var kvp in updatesDict)
            {
                switch (kvp.Key.ToLower())
                {
                    case "projecttitle":
                        existingProject.ProjectTitle = kvp.Value.GetString() ?? existingProject.ProjectTitle;
                        break;
                    case "description":
                        existingProject.Description = kvp.Value.GetString() ?? existingProject.Description;
                        break;
                    case "budget":
                        if (kvp.Value.TryGetDecimal(out var budget))
                            existingProject.Budget = budget;
                        break;
                    case "startdate":
                        if (kvp.Value.TryGetDateTime(out var startDate))
                            existingProject.StartDate = startDate.ToUniversalTime();
                        break;
                    case "duedate":
                        if (kvp.Value.TryGetDateTime(out var dueDate))
                            existingProject.DueDate = dueDate.ToUniversalTime();
                        break;
                    case "initialstatus":
                        if (kvp.Value.TryGetInt32(out var status))
                            existingProject.InitialStatus = (InitialStatus)status;
                        break;
                    case "prioritylevel":
                        if (kvp.Value.TryGetInt32(out var priority))
                            existingProject.PriorityLevel = (PriorityLevel)priority;
                        break;
                    case "progress":
                        if (kvp.Value.TryGetInt32(out var progress))
                            existingProject.Progress = progress;
                        break;
                    case "client":
                        if (kvp.Value.ValueKind == JsonValueKind.Object)
                        {
                            var clientData = JsonSerializer.Deserialize<Dictionary<string, string>>(kvp.Value.GetRawText());
                            if (existingProject.Client == null)
                                existingProject.Client = new Client();

                            if (clientData.TryGetValue("clientName", out var clientName))
                                existingProject.Client.ClientName = clientName ?? existingProject.Client.ClientName;
                        }
                        break;
                }
            }

            await _context.SaveChangesAsync();
            return Ok(existingProject);
        }





    }
}
