using System.ComponentModel.DataAnnotations.Schema;


namespace Data.Entity
{
    public class BaseEntity<T>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public T? Id { get; set; }

        public DateOnly CreatedAt { get; set; }
        public DateOnly? LastModified { get; set; }

    }
}
