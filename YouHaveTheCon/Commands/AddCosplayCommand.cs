using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Commands
{
    public class AddCosplayCommand
    {
       
        public string CosplayName { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateDue { get; set; }
        public int TotalProgress { get; set; }
        public string CosplayImageUrl { get; set; }
    }
}
