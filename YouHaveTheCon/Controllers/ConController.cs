using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouHaveTheCon.DataAccess;

namespace YouHaveTheCon.Controllers
{
    [Route("api/con")]
    [ApiController]
    public class ConController : ControllerBase
    {
        ConRepository _conRepository;

        public ConController(ConRepository conRepository)
        {
            _conRepository = conRepository;
        }

        // api/con/allcons
        [HttpGet("allcons")]
        public IActionResult GetCons()
        {
            var cons = _conRepository.GetAllCons();

            if (!cons.Any())
            {
                return NotFound("No cons found");
            }
            return Ok(cons);
        }




    }
}