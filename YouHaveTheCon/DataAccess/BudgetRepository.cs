using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using YouHaveTheCon.Models;
using YouHaveTheCon.ViewModels;
using YouHaveTheCon.Commands;

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


                var budgetsForCons = db.QueryFirstOrDefault<ConBudget>(sql, parameters);

                if (budgetsForCons != null)
                {
                    budgetsForCons.BudgetLineItems = GetBudgetLineItemsForBudget(budgetsForCons.BudgetId);
                    budgetsForCons.Expenses = GetExpensesForBudget(budgetsForCons.BudgetId);

                }
                return budgetsForCons;


            }
        }

        public List<Expenses> GetExpensesForBudget(int budgetId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"
                select BudgetLineItem.Name, Expenses.*
                from BudgetLineItem
                join Expenses on Expenses.BudgetLineItemId = BudgetLineItem.BudgetLineItemId
                where BudgetId = @budgetId";

            var parameters = new
            {
                budgetId = budgetId
                
            };

            var expenses = db.Query<Expenses>(sql, parameters);
            return expenses.ToList();
        }

        public int? GetBudgetIdByBudgetName(string budgetName, decimal amountBudgeted)
        {
            var sql = @"select BudgetId from Budget
                        where budgetName = @budgetName
                        and amountBudgeted = @amountBudgeted";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    budgetName = budgetName,
                    amountBudgeted = amountBudgeted
                };

                var result = db.QueryFirstOrDefault<int>(sql, parameters);

                if (result != 0)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }
        }

        public int? GetBudgetItemIdByItemName(string name, decimal amount)
        {
            var sql = @"select BudgetLineItemId from BudgetLineItem
                        where name = @name
                        and amount = @amount";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    name = name,
                    amount = amount
                };

                var lineItemId = db.QueryFirstOrDefault<int>(sql, parameters);

                if (lineItemId != 0)
                {
                    return lineItemId;
                }
                else
                {
                    return null;
                }
            }
        }

        public Budget AddNewBudget(AddNewBudgetCommand newBudget)
        {
            var sql = @"insert into Budget (budgetName, amountBudgeted, conId, userId)
                        output inserted.*
                        values (@budgetName, @amountBudgeted, @conId, @userId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    budgetName = newBudget.BudgetName,
                    amountBudgeted = newBudget.AmountBudgeted,
                    conId = newBudget.ConId,
                    userId = newBudget.UserId
                };

                var addedBudget = db.QueryFirstOrDefault<Budget>(sql, parameters);
                return addedBudget;
            }
        }

        public BudgetLineItem AddNewBudgetLineItem(AddBudgetLineItemCommand newLineItem)
        {
            var sql = @"insert into BudgetLineItem (budgetId, name, amount)
                        output inserted.*
                        values (@budgetId, @name, @amount)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    budgetId = newLineItem.BudgetId,
                    name = newLineItem.Name,
                    amount = newLineItem.Amount
                };

                var addedLineItem = db.QueryFirstOrDefault<BudgetLineItem>(sql, parameters);
                return addedLineItem;
            }
        }



        public List<BudgetLineItem> GetBudgetLineItemsForBudget(int budgetId)
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
