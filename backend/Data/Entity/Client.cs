using System.Text.Json.Serialization;

namespace Data.Entity
{
    public class Client
    {
        public int ClientId { get; set; }
        public string ClientName { get; set; } = string.Empty;

        [JsonIgnore]
        public List<Project>? Projects { get; set; }
    }
}
