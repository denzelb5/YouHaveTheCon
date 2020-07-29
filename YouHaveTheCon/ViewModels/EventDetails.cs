using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YouHaveTheCon.ViewModels
{
    public class EventDetails
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public DateTime EventDateTime { get; set; }
        public string EventLocation { get; set; }
        public int ExpenseId { get; set; }
        public int ConId { get; set; }
        public int UserId { get; set; }
        public string ExpenseName { get; set; }
        public decimal Cost { get; set; }
        public int BudgetLineItemId { get; set; }
        public int BudgetId { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
    }
}
