using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.ViewModels
{
    public class Expense_budgetAmounts
    {
        public int BudgetLineItemId { get; set; }
        public int BudgetId { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public int ExpenseId { get; set; }
        public string ExpenseName { get; set; }
        public int UserId { get; set; }
        public decimal Cost { get; set; }
        
    }
}
