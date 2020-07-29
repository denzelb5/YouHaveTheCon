using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using YouHaveTheCon.Models;
using YouHaveTheCon.Commands;
using YouHaveTheCon.ViewModels;

namespace YouHaveTheCon.DataAccess
{
    public class ExpenseRepository
    {
        string ConnectionString;
        public ExpenseRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

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

        //public BudgetLineItem UpdateBudgetLine(int budgetLineItemId, EditLineItem lineToUpdate)
        //{
        //    var sql = @"update BudgetLineItem
        //                set name = @name, amount = @amount
        //                where budgetLineItemId = @budgetLineItemId";

        //    using (var db = new SqlConnection(ConnectionString))
        //    {
        //        var parameters = new
        //        {
        //            name = lineToUpdate.Name,
        //            amount = lineToUpdate.Amount,
        //            budgetLineItemId = budgetLineItemId
        //        };
        //        var updatedLine = db.QueryFirstOrDefault<BudgetLineItem>(sql, parameters);
        //        return updatedLine;

        //    }

        //}

        public Expenses UpdateExpenseLine(int expenseId, EditExpense expenseToUpdate)
        {
            var sql = @"update Expenses
                        set expenseName = @expenseName, cost = @cost
                        where expenseId = @expenseId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    expenseName = expenseToUpdate.ExpenseName,
                    cost = expenseToUpdate.Cost,
                    expenseId = expenseId

                };

                var updatedExpense = db.QueryFirstOrDefault<Expenses>(sql, parameters);
                return updatedExpense;
            }
        }

        //public Expense_budgetAmounts GetBudgetedAmounts(int budgetId, string name)
        //{
        //    var sql = @"select budgetlineitem.*, Expenses.*
        //                from BudgetLineItem 
        //                join Expenses 
        //                on Expenses.BudgetLineItemId = BudgetLineItem.BudgetLineItemId
        //                where BudgetId = @budgetId
        //                and BudgetLineItem.name = @name;";

        //    using (var db = new SqlConnection(ConnectionString))
        //    {
        //        var parameters = new
        //        {
        //            budgetId = budgetId,
        //            name = name
        //        };

        //        var expenseAmounts = db.QueryFirstOrDefault<Expense_budgetAmounts>(sql, parameters);

        //        if (expenseAmounts != null)
        //        {
        //            expenseAmounts.Expenses = GetExpensesForBudget(expenseAmounts.BudgetId, expenseAmounts.Name);

        //        }

        //        return expenseAmounts;
        //    }
        //}

        //public List<Expenses> GetExpensesForBudget(int budgetId, string name)
        //{
        //    using var db = new SqlConnection(ConnectionString);

        //    var sql = @"
        //        select BudgetLineItem.Name, Expenses.*
        //        from BudgetLineItem
        //        join Expenses on Expenses.BudgetLineItemId = BudgetLineItem.BudgetLineItemId
        //        where BudgetId = @budgetId
        //        and Expenses.expenseName = @name";

        //    var parameters = new
        //    {
        //        budgetId = budgetId,
        //        name = name
        //    };

        //    var expenses = db.Query<Expenses>(sql, parameters);
        //    return expenses.ToList();
        //}


    }
}
