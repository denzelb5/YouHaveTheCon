using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Commands
{
    public class AddNewEventCommand
    {
        public string EventName { get; set; }
        public DateTime EventDateTime { get; set; }
        public DateTime EventEndDate { get; set; }
        public string EventLocation { get; set; }
        public int ConId { get; set; }
        public int UserId { get; set; }
    }

    public class EditEventCommand
    {
        public string EventName { get; set; }
        public DateTime EventDateTime { get; set; }
        public DateTime EventEndDate { get; set; }
        public string EventLocation { get; set; }
    }
}
