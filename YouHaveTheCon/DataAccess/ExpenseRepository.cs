using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using YouHaveTheCon.Models;
using YouHaveTheCon.Commands;

namespace YouHaveTheCon.DataAccess
{
    public class ExpenseRepository
    {
        string ConnectionString;
        public ExpenseRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        //public Budget AddNewBudget(AddNewBudgetCommand newBudget)
        //{
        //    var sql = @"insert into Budget (budgetName, amountBudgeted, conId, userId)
        //                output inserted.*
        //                values (@budgetName, @amountBudgeted, @conId, @userId)";

        //    using (var db = new SqlConnection(ConnectionString))
        //    {
        //        var parameters = new
        //        {
        //            budgetName = newBudget.BudgetName,
        //            amountBudgeted = newBudget.AmountBudgeted,
        //            conId = newBudget.ConId,
        //            userId = newBudget.UserId
        //        };

        //        var addedBudget = db.QueryFirstOrDefault<Budget>(sql, parameters);
        //        return addedBudget;
        //    }
        //}

        public Expenses AddNewExpense(AddNewExpenseCommand newExpense)
        {
            var sql = @"insert into Expenses (expenseName, userId, budgetLineItemId, cost)
                        output inserted.*
                        values (@expenseName, @userId, @budgetLineItemId, @cost)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    expenseName = newExpense.ExpenseName,
                    userId = newExpense.UserId,
                    budgetLineItemId = newExpense.BudgetLineItemId,
                    cost = newExpense.Cost
                };

                var addedExpense = db.QueryFirstOrDefault<Expenses>(sql, parameters);
                return addedExpense;
            }
        }

        //public int? GetBudgetItemIdByItemName(string name, decimal amount)
        //{
        //    var sql = @"select BudgetLineItemId from BudgetLineItem
        //                where name = @name
        //                and amount = @amount";

        //    using (var db = new SqlConnection(ConnectionString))
        //    {
        //        var parameters = new
        //        {
        //            name = name,
        //            amount = amount
        //        };

        //        var lineItemId = db.QueryFirstOrDefault<int>(sql, parameters);

        //        if (lineItemId != 0)
        //        {
        //            return lineItemId;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}

        public int? GetExpenseIdByExpenseName(string expenseName, int userId, int budgetLineItemId, decimal cost)
        {
            var sql = @"select expenseId from Expenses
                        where expenseName = @expenseName
                        and userId = @userId
                        and budgetLineItemId = @budgetLineItemId
                        and cost = @cost";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    expenseName = expenseName,
                    userId = userId,
                    budgetLineItemId = budgetLineItemId,
                    cost = cost
                };

                var expId = db.QueryFirstOrDefault<int>(sql, parameters);

                if (expId != 0)
                {
                    return expId;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
