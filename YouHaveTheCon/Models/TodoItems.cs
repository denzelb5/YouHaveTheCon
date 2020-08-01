using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Models
{
    public class TodoItems
    {
        public int TodoId { get; set; }
        public string TodoName { get; set; }
        public int ExpenseId { get; set; }
        public int TodoPercentDone { get; set; }
        public string TodoBuy { get; set; }
        public string TodoMake { get; set; }
        public string TodoNotes { get; set; }
        public bool IsDone { get; set; }
        public int CosplayPiecesId { get; set; }
    }
}
