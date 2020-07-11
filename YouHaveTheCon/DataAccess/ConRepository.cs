using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouHaveTheCon.Models;
using System.Data.SqlClient;
using Dapper;

namespace YouHaveTheCon.DataAccess
{
    public class ConRepository
    {
        string ConnectionString;
        public ConRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        public List<Convention> GetAllCons()
        {
            var sql = @"SELECT * FROM Convention;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var cons = db.Query<Convention>(sql).ToList();
                return cons;
            }
        }
    }



}
