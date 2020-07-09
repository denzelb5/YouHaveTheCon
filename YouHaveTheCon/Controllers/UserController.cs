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

        // api/user/allusers
        [HttpGet("allusers")] 
        public IActionResult GetUsers()
        {
            var users = _userRepository.GetAllUsers();
            if (!users.Any())
            {
                return NotFound("No valid users available");
            }
            return Ok(users);
        }


    }
}