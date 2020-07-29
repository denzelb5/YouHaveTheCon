using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouHaveTheCon.DataAccess;
using YouHaveTheCon.Commands;
using YouHaveTheCon.Models;
using YouHaveTheCon.ViewModels;

namespace YouHaveTheCon.Controllers
{
    [Route("api/con")]
    [ApiController]
    public class ConController : ControllerBase
    {
        ConRepository _conRepository;
        BudgetRepository _budgetRepository;
        ExpenseRepository _expenseRepository;

        public ConController(ConRepository conRepository, BudgetRepository budgetRepository, ExpenseRepository expenseRepository)
        {
            _conRepository = conRepository;
            _budgetRepository = budgetRepository;
            _expenseRepository = expenseRepository;
        }

        // api/con/allcons/{userId}
        [HttpGet("allcons/{userId}")]
        public IActionResult GetConsByUserId(int userId)
        {
            var cons = _conRepository.GetAllConsByUserId(userId);

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

        // api/con/{conId}/{userId}
        [HttpGet("{conId}/{userId}")]
        public IActionResult GetConByConId(int conId, int userId)
        {
            var con = _conRepository.GetConById(conId, userId);

            if (con == null)
            {
                return NotFound("No con with that Id could be found.");
            }
            else
            {
                return Ok(con);
            }
        }

        //api/con/budget/{conId}/{userId}
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

        //api/con/budget/addBudget
        [HttpPost("budget/addBudget")]
        public IActionResult AddBudget(AddNewBudgetCommand newBudget)
        {
            var existingBudget = _budgetRepository.GetBudgetIdByBudgetName(newBudget.BudgetName, newBudget.AmountBudgeted);

            if (existingBudget == null)
            {
                var createdBudget = _budgetRepository.AddNewBudget(newBudget);
                return Created("", createdBudget);
            }
            else
            {
                return BadRequest("Budget already exists");
            }
        }

        // api/con/budget/addline
        [HttpPost("budget/addline")]
        public IActionResult AddBudgetLine(AddBudgetLineItemCommand newLineItem)
        {
            var existingLine = _budgetRepository.GetBudgetItemIdByItemName(newLineItem.Name, newLineItem.Amount); 
             
            if (existingLine == null)
            {
                var createdLineItem = _budgetRepository.AddNewBudgetLineItem(newLineItem);
                return Created("", createdLineItem);
            }
            else
            {
                return BadRequest("Category already exists");
            }
        }

        // api/con/expenses/addExpense
        [HttpPost("expenses/addExpense")]
        public IActionResult AddExpense(AddNewExpenseCommand newExpense)
        {
            var existingExpense = _expenseRepository.GetExpenseIdByExpenseName(newExpense.ExpenseName, newExpense.UserId, newExpense.BudgetLineItemId, newExpense.Cost);

            if (existingExpense == null)
            {
                var createdExpense = _expenseRepository.AddNewExpense(newExpense);
                return Created("", createdExpense);
            }
            else
            {
                return BadRequest("Expense already exists");
            }
        }

        // api/con/1/edit
        [HttpPut("{budgetLineItemId}/edit")] 
        public IActionResult UpdateBudgetLineItem(int budgetLineItemId, EditLineItem lineToUpdate )
        {
            var updatedLine = _budgetRepository.UpdateBudgetLine(budgetLineItemId, lineToUpdate);
            return Ok();
        }
        // api/con/{expenseId}/edit
        [HttpPut("{expenseId}/editexpense")]
        public IActionResult UpdateExpense(int expenseId, EditExpense expenseToUpdate)
        {
            var updatedExpense = _expenseRepository.UpdateExpenseLine(expenseId, expenseToUpdate); 
            {
                return Ok();
            }
        }





        //// api/con/expenses/budgetamounts
        //[HttpGet("expenses/budgetamounts/{budgetId}/{name}")]
        //public IActionResult GetBudgetAmountsForExpenseTable(int budgetId, string name)
        //{
        //    var budgetedAmounts = _expenseRepository.GetBudgetedAmounts(budgetId, name);

        //    if (budgetedAmounts == null)
        //    {
        //        return NotFound("No such value found");
        //    }
        //    else
        //    {
        //        return Ok(budgetedAmounts);
        //    }

        //}


    }
}