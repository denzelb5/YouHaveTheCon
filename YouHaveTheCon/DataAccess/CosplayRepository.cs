using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using YouHaveTheCon.Models;
using YouHaveTheCon.ViewModels;
using YouHaveTheCon.Commands;
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

        public int? GetPieceByName(string pieceName, int cosplayId, string bodyPartName)
        {
            var sql = @"select cosplayPiecesId from CosplayPieces
                        where pieceName = @pieceName
                        and cosplayId = @cosplayId
                        and bodyPartName = @bodyPartName";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    pieceName = pieceName,
                    cosplayId = cosplayId,
                    bodyPartName = bodyPartName
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

        public CosplayPieces AddNewCosplayPiece(AddCosplayPieceCommand newPiece)
        {
            var sql = @"insert into CosplayPieces (pieceName, percentDone, CompletionHoursEstimate,
                        CompletionMinutesEstimate, PieceImageUrl, cosplayId, bodyPartName)
                        values (@pieceName, @percentDone, @completionHoursEstimate, @completionMinutesEstimate,
                                @pieceImageUrl, @cosplayId, @bodyPartName)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    pieceName = newPiece.PieceName,
                    percentDone = newPiece.PercentDone,
                    completionHoursEstimate = newPiece.CompletionHoursEstimate,
                    completionMinutesEstimate = newPiece.CompletionMinutesEstimate,
                    pieceImageUrl = newPiece.PieceImageUrl,
                    cosplayId = newPiece.CosplayId,
                    bodyPartName = newPiece.BodyPartName

                };

                var addedPiece = db.QueryFirstOrDefault<CosplayPieces>(sql, parameters);
                return addedPiece;
            }
                        
        }



        
    }
}
