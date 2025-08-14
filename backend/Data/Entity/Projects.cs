using Data.Enum;
using System.ComponentModel.DataAnnotations;

namespace Data.Entity
{
    public class Project : BaseEntity<int>
    {
        public string Title { get; set; } = string.Empty;

        public Client? Clients { get; set; }
        
        public string Description { get; set; } = string.Empty;
       
        [Range(0, 10000000)]
        public decimal Budget { get; set; } = 0;
       
        public DateOnly StartDate { get; set; }
       
        public DateOnly DueDate { get; set; }
        public InitialStatus InitialStatus { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        [Range(0, 100)]
        public int Progress { get; set; } = 0;

    }
}
