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

        public Expense_budgetAmounts GetBudgetedAmounts(int budgetId, string name)
        {
            var sql = @"select budgetlineitem.*, Expenses.*
                        from BudgetLineItem 
                        join Expenses 
                        on Expenses.BudgetLineItemId = BudgetLineItem.BudgetLineItemId
                        where BudgetId = @budgetId
                        and Expenses.expenseName = @name;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    budgetId = budgetId,
                    name = name
                };

                var budgetAmounts = db.QueryFirstOrDefault<Expense_budgetAmounts>(sql, parameters);

                return budgetAmounts;
            }
        }


    }
}
