using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Commands
{
    public class AddNewConCommand
    {
        public string ConName { get; set; }
        public DateTime ConStartDate { get; set; }
        public DateTime ConEndDate { get; set; }
        public string LocationName { get; set; }
        public string LocationInfo { get; set; }
    }
}
