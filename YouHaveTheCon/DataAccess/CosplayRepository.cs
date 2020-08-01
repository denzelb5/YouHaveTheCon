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

        public List<CosPlayOutfit> GetCosplaysByUser(int userId)
        {
            var sql = @"select * from CosplayOutfit where userId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { userId = userId };

                var cosplays = db.Query<CosPlayOutfit>(sql, parameters).ToList();
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

        public List<TodoItems> GetToDoItemsForCosplayPiece(int cosplayPiecesId)
        {
            using var db = new SqlConnection(ConnectionString);

            var sql = @"
                select * 
                from TodoItems
                where cosplayPiecesId = @cosplayPiecesId";

            var parameters = new
            {
                cosplayPiecesId = cosplayPiecesId
            };

            var todoItems = db.Query<TodoItems>(sql, parameters);
            return todoItems.ToList();
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

        public int? GetExistingTodoByName(string todoName, string todoNotes)
        {
            var sql = @"select TodoId from TodoItems 
                        where todoName = @todoName
                        and todoNotes = @todoNotes";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    todoName = todoName,
                    todoNotes = todoNotes
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

        public int? GetCosplayByName(string cosplayName, int userId, string cosplayImageUrl)
        {
            var sql = @"select cosplayId from CosplayOutfit 
                        where cosplayName = @cosplayName
                        and userId = @userId
                        and cosplayImageUrl = @cosplayImageUrl";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    cosplayName = cosplayName,
                    userId = userId,
                    cosplayImageUrl = cosplayImageUrl
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

        public TodoItems CreateNewTodo(AddTodoCommand newTodo)
        {
            var sql = @"insert into TodoItems (todoName, todoNotes, cosplayPiecesId)
                        output inserted.*
                        values (@todoName, @todoNotes, @cosplayPiecesId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    todoName = newTodo.TodoName,
                    todoNotes = newTodo.TodoNotes,
                    cosplayPiecesId = newTodo.CosplayPiecesId

                };

                var addedTodo = db.QueryFirstOrDefault<TodoItems>(sql, parameters);
                return addedTodo;
            }
        }

        public CosPlayOutfit AddCosplay(AddCosplayCommand newCosplay)
        {
            var sql = @"insert into CosPlayOutfit (cosplayName, userId, dateCreated, dateDue, totalProgress, cosplayImageUrl)
                        output inserted.*
                        values (@cosplayName, @userId, @dateCreated, @dateDue, @totalProgress, @cosplayImageUrl)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    cosplayName = newCosplay.CosplayName,
                    userId = newCosplay.UserId,
                    dateCreated = newCosplay.DateCreated,
                    dateDue = newCosplay.DateDue,
                    totalProgress = newCosplay.TotalProgress,
                    cosplayImageUrl = newCosplay.CosplayImageUrl
                };

                var addedCosplay = db.QueryFirstOrDefault<CosPlayOutfit>(sql, parameters);
                return addedCosplay;
            }
        }

        

    }
}
