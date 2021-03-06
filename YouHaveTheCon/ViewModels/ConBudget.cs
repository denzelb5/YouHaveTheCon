﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouHaveTheCon.Models;

namespace YouHaveTheCon.ViewModels
{
    public class ConBudget
    {
        public int BudgetId { get; set; }
        public string BudgetName { get; set; }
        public int UserId { get; set; }
        public int ConId { get; set; }
        public decimal AmountBudgeted { get; set; }
        public List<BudgetLineItem> BudgetLineItems { get; set; }
        public List<Expenses> Expenses { get; set; }
    }

    //public class BudgetLineItem
    //{
    //    public string Name { get; set; }
    //    public decimal Amount { get; set; }
    //}
}
