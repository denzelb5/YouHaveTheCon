using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Commands
{
    public class AddBudgetLineItemCommand
    {
        public int BudgetId { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
    }
}
