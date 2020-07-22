using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouHaveTheCon.ViewModels;

namespace YouHaveTheCon.Commands
{
    public class AddNewConBudgetCommand
    {
        public string BudgetName { get; set; }
        public List<BudgetLineItem> BudgetLineItems { get; set; }
    }
}
