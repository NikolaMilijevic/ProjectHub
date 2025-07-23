using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entity
{
    public class BaseEntity<T>
    {
        public required T Id { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
