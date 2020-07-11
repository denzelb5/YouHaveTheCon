using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouHaveTheCon.DataAccess;

namespace YouHaveTheCon.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserRepository _userRepository;

        public UserController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // api/user/email/{email}
        [HttpGet("email/{email}")] 
        public IActionResult GetUser(string email)
        {
            var user = _userRepository.GetUserByEmail(email);
            if (user == null)
            {
                return NotFound("Not a valid user");
            }
            return Ok(user);
        }


    }
}