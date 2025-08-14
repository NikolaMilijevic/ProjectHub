using Data;

namespace Services.Services.Client
{
    public class ClientService
    {
        private readonly ProjectHubDbContext _context;

        public ClientService(ProjectHubDbContext context)
        {
            _context = context;
        }
        public async Task<bool> DeleteClientAsync(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null) return false;

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
