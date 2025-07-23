using Data.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entity
{
    public class Projects : BaseEntity<int>
    {
        public string ProjectTitle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public required Client Client { get; set; }
        [Range(0, 10000000)]
        public decimal Budget { get; set; } = 0;
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; } = DateTime.MinValue;
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; } = DateTime.MinValue;
        public InitialStatus InitialStatus { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        [Range(0, 100)]
        public int Progress { get; set; } = 0;

    }
}
