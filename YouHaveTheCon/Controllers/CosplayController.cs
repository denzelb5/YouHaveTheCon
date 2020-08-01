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

        

        // api/cosplay/addpiece
        [HttpPost("addpiece")]
        public IActionResult AddCosplayPiece(AddCosplayPieceCommand newPiece)
        {
            var existingPiece = _cosplayRepository.GetPieceByName(newPiece.PieceName, newPiece.CosplayId, newPiece.BodyPartName);

            if (existingPiece == null)
            {
                var createdPiece = _cosplayRepository.AddNewCosplayPiece(newPiece);
                return Created("", createdPiece);
            }
            else
            {
                return BadRequest("Piece already exists");
            }
        }

        // api/cosplay/todo/add
        [HttpPost("todo/add")]
        public IActionResult AddTodoItem(AddTodoCommand newTodo)
        {
            var existingTodo = _cosplayRepository.GetExistingTodoByName(newTodo.TodoName, newTodo.TodoNotes);

            if (existingTodo == null)
            {
                var createdTodo = _cosplayRepository.CreateNewTodo(newTodo);
                return Created("", createdTodo);
            }
            else
            {
                return BadRequest("ToDo already exists.");
            }
        }

        // api/cosplay/addcosplay
        [HttpPost("addcosplay")]
        public IActionResult AddNewCosplay(AddCosplayCommand newCosplay)
        {
            var existingCosplay = _cosplayRepository.GetCosplayByName(newCosplay.CosplayName, newCosplay.UserId, newCosplay.CosplayImageUrl);

            if (existingCosplay == null)
            {
                var createdCosplay = _cosplayRepository.AddCosplay(newCosplay);
                return Created("", createdCosplay);
            }
            else
            {
                return BadRequest("Cosplay already exists");
            }
        }

        // api/cosplay/7/todolist
        [HttpGet("{cosplayPiecesId}/todolist")]
        public IActionResult GetTodoItems(int cosplayPiecesId)
        {
            var todos = _cosplayRepository.GetToDoItemsForCosplayPiece(cosplayPiecesId);

            if (todos == null)
            {
                return NotFound("Todo item does not exist");
            }
            else
            {
                return Ok(todos);
            }
        }

        // api/cosplay/todo/delete/{todoId}
        [HttpDelete("todo/delete/{todoId}")]
        public IActionResult deleteTodoItem(int todoId)
        {
            var deletedTodo = _cosplayRepository.RemoveTodo(todoId);
            return Ok(deletedTodo);
        }


    }
}