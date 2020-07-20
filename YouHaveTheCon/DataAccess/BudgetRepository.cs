using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using YouHaveTheCon.Models;
using YouHaveTheCon.ViewModels;

namespace YouHaveTheCon.DataAccess
{
    public class BudgetRepository
    {
        string ConnectionString;
        public BudgetRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        public ConBudget GetBudgetDetailsForConvention(int conId, int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {

                var sql = @"
                    select *
                    from Budget
                    where 
                        budget.conId = @conId
                        and budget.userId = @userId";

                var parameters = new
                {
                    conId = conId,
                    userId = userId
                };
                var budgetsForCons = db.QueryFirst<ConBudget>(sql, parameters);

                budgetsForCons.BudgetLineItems = GetBudgetLineItemsForBudget(budgetsForCons.BudgetId);
                return budgetsForCons;
            }
        }

        private List<BudgetLineItem> GetBudgetLineItemsForBudget(int budgetId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"
                select
                    BudgetLineItemId,
                    BudgetId,
                    Name,
                    Amount
                from BudgetLineItem
                where BudgetId = @budgetId";

            var parameters = new
            {
                budgetId = budgetId
            };

            var budgetLineItems = db.Query<BudgetLineItem>(sql, parameters);
            return budgetLineItems.ToList();
        }
    }
}
