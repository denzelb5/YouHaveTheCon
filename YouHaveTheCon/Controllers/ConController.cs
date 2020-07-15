using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouHaveTheCon.DataAccess;
using YouHaveTheCon.Commands;

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

        // api/con/addcon
        [HttpPost("addcon")]
        public IActionResult AddCon(AddNewConCommand newCon)
        {
            var existingCon = _conRepository.GetIdByCon(newCon.ConName, newCon.ConStartDate, newCon.ConEndDate, newCon.LocationName, newCon.LocationInfo);

            if (existingCon == null)
            {
                var createdCon = _conRepository.AddNewCon(newCon);
                return Created("", createdCon);
            }
            else
            {
                return BadRequest("Con already exists");
            }
        }

        //api/con/budget/{conId}
        [HttpGet("budget/{conId}")]
        public IActionResult GetBudgetByConId(int conId)
        {
            var budgetByCon = _conRepository.GetBudgetCategoriesForBudget(conId);

            if (budgetByCon == null)
            {
                return NotFound("There is no budget for that con");
            }
            else
            {
                return Ok(budgetByCon);
            }
        }



    }
}