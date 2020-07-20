using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouHaveTheCon.Models;
using System.Data.SqlClient;
using Dapper;
using YouHaveTheCon.Commands;
using YouHaveTheCon.ViewModels;

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

        public int? GetIdByCon(string ConName, DateTime ConStartDate, DateTime ConEndDate, string LocationName, string LocationInfo)
        {
            var sql = @"select ConId from Convention
                        where ConName = @ConName
                        AND ConStartDate = @ConStartDate
                        And ConEndDate = @ConEndDate
                        and LocationName = @LocationName
                        and LocationInfo = @LocationInfo";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    ConName = ConName,
                    ConStartDate = ConStartDate,
                    ConEndDate = ConEndDate,
                    LocationName = LocationName,
                    LocationInfo = LocationInfo
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

        public Convention AddNewCon(AddNewConCommand newCon)
        {
            var sql = @"Insert into Convention (ConName, ConStartDate, ConEndDate, LocationName, LocationInfo)
                        output inserted.*
                        values (@ConName, @ConStartDate, @ConEndDate, @LocationName, @LocationInfo)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    ConName = newCon.ConName,
                    ConStartDate = newCon.ConStartDate,
                    ConEndDate = newCon.ConEndDate,
                    LocationName = newCon.LocationName,
                    LocationInfo = newCon.LocationInfo
                };

                var conToAdd = db.QueryFirstOrDefault<Convention>(sql, parameters);
                return conToAdd;
            }
        }

        public Convention GetConById(int conId, int userId)
        {
            var sql = @"select *
                        from Convention
                        where conId = @conId
                        and userId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { conId = conId, userId = userId };

                var convention = db.QueryFirstOrDefault<Convention>(sql, parameters);
                return convention;
            }
        }
    }
}
