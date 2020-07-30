using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using System.Threading.Tasks;
using YouHaveTheCon.ViewModels;
using YouHaveTheCon.Models;
using YouHaveTheCon.Commands;

namespace YouHaveTheCon.DataAccess
{
    public class EventRepository
    {
        string ConnectionString;
        public EventRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        public List<ConEvents> GetAllEventsByConId(int conId, int userId)
        {
            var sql = @"select *
                        from ConEvents 
                        where conId = @conId
                        and userId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    conId = conId,
                    userId = userId
                };

                var conEvents = db.Query<ConEvents>(sql, parameters).ToList();
                return conEvents;
            }
        }

        public int? GetEventsByName(string eventName, DateTime eventDateTime, DateTime eventEndDate, string eventLocation)
        {
            var sql = @"select eventId from ConEvents
                        where eventName = @eventName
                        and eventDateTime = @eventDateTime
                        and eventEndDate = @eventEndDate
                        and eventLocation = @eventLocation";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    eventName = eventName,
                    eventDateTime = eventDateTime,
                    eventEndDate = eventEndDate,
                    eventLocation = eventLocation
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

        public ConEvents AddNewEvent(AddNewEventCommand eventToAdd)
        {
            var sql = @"insert into ConEvents (eventName, eventDateTime, eventLocation, eventEndDate, conId, userId)
                        output inserted.*
                        values (@eventName, @eventDateTime, @eventLocation, @eventEndDate, @conId, @userId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    eventName = eventToAdd.EventName,
                    eventDateTime = eventToAdd.EventDateTime,
                    eventLocation = eventToAdd.EventLocation,
                    eventEndDate = eventToAdd.EventEndDate,
                    conId = eventToAdd.ConId,
                    userId = eventToAdd.UserId

                };

                var addedEvent = db.QueryFirstOrDefault<ConEvents>(sql, parameters);
                return addedEvent;
            }
        }


        public ConEvents EditEvent(int eventId, EditEventCommand eventToEdit)
        {
            var sql = @"update ConEvents
                        set eventName = @eventName,
                        eventDateTime = @eventDateTime,
                        eventEndDate = @eventEndDate,
                        eventLocation = @eventLocation
                        where eventId = @eventId";
                       

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    eventName = eventToEdit.EventName,
                    eventDateTime = eventToEdit.EventDateTime,
                    eventEndDate = eventToEdit.EventEndDate,
                    eventLocation = eventToEdit.EventLocation,
                    eventId = eventId
                };

                var updatedEvent = db.QueryFirstOrDefault<ConEvents>(sql, parameters);
                return updatedEvent;
            }
        }

        public ConEvents DeleteEvent(int eventId)
        {
            var sql = @"delete from ConEvents where eventId = @eventId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    eventId = eventId
                };

                var deletedEvent = db.QueryFirstOrDefault<ConEvents>(sql, parameters);
                return deletedEvent;
            }
        }


    }
}
