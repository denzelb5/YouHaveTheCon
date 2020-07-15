using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.ViewModels
{
    public class ConBudget
    {
       
        public int BudgetId { get; set; }
        public string BudgetName { get; set; }
        public Decimal AmountBudgeted { get; set; }
        public int UserId { get; set; }
        public int ConId { get; set; }
        public List<string> BudgetCategories { get; set; }
    }
}
