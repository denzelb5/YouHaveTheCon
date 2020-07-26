using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Commands
{
    public class AddNewExpenseCommand
    {
        public string ExpenseName { get; set; }
        public int UserId { get; set; }
        public int BudgetLineItemId { get; set; }
        public decimal Cost { get; set; }
    }
}
