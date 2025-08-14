namespace Services.Services.Client
{
    public interface IClientService
    {
        Task<bool> DeleteClientAsync(int id);
    }
}
