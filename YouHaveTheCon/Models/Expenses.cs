using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Models
{
    public class Expenses
    {
        public int ExpenseId { get; set; }
        public string ExpenseName { get; set; }
        public int UserId { get; set; }
        public decimal Cost { get; set; }
        public int BudgetLineItemId { get; set; }
    }

    public class EditExpense
    {
        public string ExpenseName { get; set; }
        public decimal Cost { get; set; }
    }
}
