using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using YouHaveTheCon.Models;

namespace YouHaveTheCon.DataAccess
{
    public class UserRepository
    {
        string ConnectionString;
        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        public User GetUserByEmail(string email)
        {
            var sql = @"select * from [User] where email = @email";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { email = email };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }
    }
}
