using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Data.Entity
{
    public class Client
    {
        [Key, ForeignKey("Project")]
        public int Id { get; set; }
        public string ClientName { get; set; } = string.Empty;

        [JsonIgnore]
        public Projects? Project { get; set; }
    }
}
