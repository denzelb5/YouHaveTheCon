using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using YouHaveTheCon.ViewModels;
using YouHaveTheCon.Models;

namespace YouHaveTheCon.DataAccess
{
    public class EventRepository
    {
        string ConnectionString;
        public EventRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        public List<EventDetails> GetAllEventsByConId(int conId, int userId)
        {
            var sql = @"select ConEvents.*, Convention.ConName
                        from ConEvents 
                        join Convention
                        on ConEvents.conId = Convention.conId
                        where ConEvents.conId = @conId
                        and userId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    conId = conId,
                    userId = userId
                };

                var conEvents = db.Query<EventDetails>(sql, parameters).ToList();
                return conEvents;
            }
        }


    }
}
