using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouHaveTheCon.DataAccess;
using YouHaveTheCon.Commands;
using YouHaveTheCon.Models;

namespace YouHaveTheCon.Controllers
{
    [Route("api/con")]
    [ApiController]
    public class ConController : ControllerBase
    {
        ConRepository _conRepository;
        BudgetRepository _budgetRepository;

        public ConController(ConRepository conRepository, BudgetRepository budgetRepository)
        {
            _conRepository = conRepository;
            _budgetRepository = budgetRepository;
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

        // api/con/{conId}
        [HttpGet("{conId}")]
        public IActionResult GetConByConId(int conId)
        {
            var con = _conRepository.GetConById(conId);

            if (con == null)
            {
                return NotFound("No con with that Id could be found.");
            }
            else
            {
                return Ok(con);
            }
        }

        //api/con/budget/{conId}
        [HttpGet("budget/{conId}/{userId}")]
        public IActionResult GetBudgetByConId(int conId, int userId)
        {
            var budgetByCon = _budgetRepository.GetBudgetDetailsForConvention(conId, userId);

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