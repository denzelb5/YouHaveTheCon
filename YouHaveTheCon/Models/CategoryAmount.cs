using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.Models
{
    public class CategoryAmount
    {
        public int CatAmountId { get; set; }
        public decimal CatAmount { get; set; }
        public int BudgetCategoryId { get; set; }
    }
}
