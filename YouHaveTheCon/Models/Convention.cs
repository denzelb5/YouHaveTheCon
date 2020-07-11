using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Models
{
    public class Convention
    {
        public int ConId { get; set; }
        public string ConName { get; set; }
        public DateTime ConStartDate { get; set; }
        public string LocationInfo { get; set; }
        public string LocationName { get; set; }

    }
}
