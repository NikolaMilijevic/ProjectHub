using Microsoft.AspNetCore.Mvc;
using Services.Services.Client;
using Models.Responses;
using System.Runtime.CompilerServices;

namespace ProjectHub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {

        public readonly IClientService _service;
        public ClientController(IClientService service)
        {
            _service = service;
        }

        [HttpDelete("client/{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {

            bool deleted = await _service.DeleteClientAsync(id);
            var response = new ApiResponse
            {
                success = deleted,
                message = deleted
            ? $"Client with ID {id} was successfully deleted."
            : $"Client with ID {id} not found."
            };

            return deleted ? Ok(response) : NotFound(response);
        }
    }
}
