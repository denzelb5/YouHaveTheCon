using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Models
{
    public class Budget

    {
        public int BudgetId { get; set; }
        public string BudgetName { get; set; }
        public decimal AmountBudgeted { get; set; }
        public int ConId { get; set; }
        public int UserId { get; set; }
    }
}
