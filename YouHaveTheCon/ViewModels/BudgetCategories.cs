using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.ViewModels
{
    public class BudgetCategories
    {
        public int BCForBudgetId { get; set; }
        public int BudgetId { get; set; }
        public int BudgetCategoryId { get; set; }
        public string BudgetCategoryName { get; set; }
        public string ConId { get; set; }

    }
}
