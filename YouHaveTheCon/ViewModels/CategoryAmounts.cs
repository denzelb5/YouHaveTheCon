using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.ViewModels
{
    public class CategoryAmounts
    {
        public int BCForBudgetId { get; set; }
        public int BudgetId { get; set; }
        public int BudgetCategoryId { get; set; }
        public string BudgetCategoryName { get; set; }
        public int conId { get; set; }
        public decimal CatAmount { get; set; }
    }
}
