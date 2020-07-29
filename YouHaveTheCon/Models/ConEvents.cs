using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Models
{
    public class ConEvents
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public DateTime EventDateTime { get; set; }
        public string EventLocation { get; set; }
        public int ExpenseId { get; set; }
        public int ConId { get; set; }
        public int UserId { get; set; }
    }
}
