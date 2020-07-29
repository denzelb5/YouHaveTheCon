using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using YouHaveTheCon.ViewModels;

namespace YouHaveTheCon.DataAccess
{
    public class EventRepository
    {
        string ConnectionString;
        public EventRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        public EventDetails GetAllEventsByConId(int conId, int userId)
        {
            var sql = @"select ConEvents.*, Expenses.ExpenseName, Expenses.Cost, BudgetLineItem.*
                        from ConEvents
                        join Expenses 
                        on ConEvents.ExpenseId = Expenses.ExpenseId
                        join BudgetLineItem
                        on BudgetLineItem.BudgetLineItemId = Expenses.BudgetLineItemId
                        where conEvents.conId = @conId
                        and conEvents.userId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    conId = conId,
                    userId = userId
                };

                var conEvents = db.QueryFirstOrDefault<EventDetails>(sql, parameters);
                return conEvents;
            }
        }


    }
}
