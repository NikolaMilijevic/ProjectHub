using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectHub.Models
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Required]
        public string projectTitle { get; set; }
        [Required]
        public string client {  get; set; }
        [Required]
        public string description { get; set; }
        [Required, Range(0, 10000000)]
        public decimal budget { get; set; }
        [Required, DataType(DataType.Date)]
        public DateTime startDate { get; set; }
        [Required, DataType(DataType.Date)]
        public DateTime dueDate { get; set; }
        [Required]
        public string initialStatus { get; set; }
        [Required]
        public string priorityLevel { get; set; }
        [Required, Range(0, 100)]
        public int progress { get; set; }
        public DateTime createdAt { get; set; }

    }
}
