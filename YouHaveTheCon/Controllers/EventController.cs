using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouHaveTheCon.DataAccess;

namespace YouHaveTheCon.Controllers
{
    [Route("api/event")]
    [ApiController]
    public class EventController : ControllerBase
    {
        EventRepository _eventRepository;

        public EventController (EventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }


        // api/event/allevents/1/1
        [HttpGet("allevents/{conId}/{userId}")]
        public IActionResult GetEventsByCon(int conId, int userId)
        {
            var events = _eventRepository.GetAllEventsByConId(conId, userId);

            if (events == null)
            {
                return NotFound("There is no event by that name for this con");
            }
            else
            {
                return Ok(events);
            }
        }


    }
}