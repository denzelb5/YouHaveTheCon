using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouHaveTheCon.DataAccess;

namespace YouHaveTheCon.Controllers
{
    [Route("api/cosplay")]
    [ApiController]
    public class CosplayController : ControllerBase
    {
        CosplayRepository _cosplayRepository;

        public CosplayController(CosplayRepository cosplayRepository)
        {
            _cosplayRepository = cosplayRepository;
        }


        // api/cosplay/allcosplays/{userId}
        [HttpGet("allcosplays/{userId}")]
        public IActionResult GetAllCosplaysByUserId(int userId)
        {
            var cosplays = _cosplayRepository.GetCosplaysByUser(userId);

            if (cosplays == null)
            {
                return NotFound("Cosplay does not exist");
            }
            else
            {
                return Ok(cosplays);
            }
        }

        // api/cosplay/pieces/{cosplayId}
        [HttpGet("pieces/{cosplayId}")]
        public IActionResult GetAllPiecesByCosplayId(int cosplayId)
        {
            var pieces = _cosplayRepository.GetPiecesByCosplayId(cosplayId);

            if (pieces == null)
            {
                return NotFound("Cosplay piece does not exist");
            }
            else
            {
                return Ok(pieces);
            }
        }



    }
}