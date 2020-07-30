using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using YouHaveTheCon.Models;
using YouHaveTheCon.ViewModels;
using Dapper;

namespace YouHaveTheCon.DataAccess
{
    public class CosplayRepository
    {
        string ConnectionString;
        public CosplayRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        public List<Cosplay> GetCosplaysByUser(int userId)
        {
            var sql = @"select * from CosplayOutfit where userId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { userId = userId };

                var cosplays = db.Query<Cosplay>(sql, parameters).ToList();
                return cosplays;
            }
        }

        public List<SingleCosplayInfo> GetPiecesByCosplayId(int cosplayId)
        {
            var sql = @"select CosplayPieces.*, CosPlayOutfit.CosplayImageUrl
                        from CosplayPieces
                        join CosPlayOutfit
                        on CosplayPieces.CosplayId = CosPlayOutfit.CosplayId
                        where CosplayPieces.cosplayId = @cosplayId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { cosplayId = cosplayId };

                var pieces = db.Query<SingleCosplayInfo>(sql, parameters).ToList();
                return pieces;
            }
        }




    }
}
