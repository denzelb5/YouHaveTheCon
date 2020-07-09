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

        public List<User> GetAllUsers()
        {
            var sql = @"select * from [User]";

            using (var db = new SqlConnection(ConnectionString))
            {
                var users = db.Query<User>(sql).ToList();
                return users;
            }
        }
    }
}
