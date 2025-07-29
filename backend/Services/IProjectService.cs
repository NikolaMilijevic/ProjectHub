using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Data.Entity;

namespace Services
{

    public interface IProjectService
    {
        Task<IEnumerable<Projects>> GetAllProjectsAsync();
        Task<Projects?> GetProjectByIdAsync(int id);
        Task<Projects> CreateProjectAsync(Projects project);
        Task<Projects?> UpdateProjectAsync(int id, Projects updatedProject);
        Task<Projects?> PatchProjectAsync(int id, Dictionary<string, object> updates);
        Task<bool> DeleteProjectAsync(int id);
        Task<bool> DeleteClientAsync(int id);
    }

}
