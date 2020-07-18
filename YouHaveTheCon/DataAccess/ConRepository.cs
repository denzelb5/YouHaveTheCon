using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YouHaveTheCon.Models;
using System.Data.SqlClient;
using Dapper;
using YouHaveTheCon.Commands;
using YouHaveTheCon.ViewModels;

namespace YouHaveTheCon.DataAccess
{
    public class ConRepository
    {
        string ConnectionString;
        public ConRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("YouHaveTheConDB");
        }

        public List<Convention> GetAllCons()
        {
            var sql = @"SELECT * FROM Convention;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var cons = db.Query<Convention>(sql).ToList();
                return cons;
            }
        }

        public int? GetIdByCon(string ConName, DateTime ConStartDate, DateTime ConEndDate, string LocationName, string LocationInfo)
        {
            var sql = @"select ConId from Convention
                        where ConName = @ConName
                        AND ConStartDate = @ConStartDate
                        And ConEndDate = @ConEndDate
                        and LocationName = @LocationName
                        and LocationInfo = @LocationInfo";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    ConName = ConName,
                    ConStartDate = ConStartDate,
                    ConEndDate = ConEndDate,
                    LocationName = LocationName,
                    LocationInfo = LocationInfo
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

        public Convention AddNewCon(AddNewConCommand newCon)
        {
            var sql = @"Insert into Convention (ConName, ConStartDate, ConEndDate, LocationName, LocationInfo)
                        output inserted.*
                        values (@ConName, @ConStartDate, @ConEndDate, @LocationName, @LocationInfo)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    ConName = newCon.ConName,
                    ConStartDate = newCon.ConStartDate,
                    ConEndDate = newCon.ConEndDate,
                    LocationName = newCon.LocationName,
                    LocationInfo = newCon.LocationInfo
                };

                var conToAdd = db.QueryFirstOrDefault<Convention>(sql, parameters);
                return conToAdd;
            }
        }

        public Convention GetConById(int conId)
        {
            var sql = @"select *
                        from Convention
                        where conId = @conId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { conId = conId };

                var convention = db.QueryFirstOrDefault<Convention>(sql, parameters);
                return convention;
            }
        }

        public IEnumerable<ConBudget> GetBudgetCategoriesForBudget(int conId)
        {
            var sql = @"select * from Budget where budget.conId = @conId;";

            var budgetCatSql = @"select BudgetCategoryForBudget.*, BudgetCategory.BudgetCategoryName, Budget.conId
                                from BudgetCategoryforBudget
                                join BudgetCategory
                                on BudgetCategoryForBudget.budgetCategoryId = BudgetCategory.budgetCategoryId
                                join Budget 
                                on Budget.BudgetId = BudgetCategoryForBudget.budgetId
                                where budget.conId = @conId;";

            var amountSql = @"select BudgetCategoryForBudget.*, BudgetCategory.BudgetCategoryName, Budget.conId, CategoryAmount.CatAmount
                                from BudgetCategoryforBudget
                                join BudgetCategory 
                                on BudgetCategoryForBudget.budgetCategoryId = BudgetCategory.budgetCategoryId
                                join Budget 
                                on Budget.BudgetId = BudgetCategoryForBudget.budgetId
								join CategoryAmount 
								on CategoryAmount.BudgetCategoryId = BudgetCategory.BudgetCategoryId
                                where budget.conId = @conId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    conId = conId
                };

                var budgetsForCons = db.Query<ConBudget>(sql, parameters);
                var budgetCategories = db.Query<BudgetCategories>(budgetCatSql, parameters);
                var categoryAmounts = db.Query<CategoryAmounts>(amountSql, parameters);
                var budgetsWithCategories = new List<ConBudget>();

                foreach (var budget in budgetsForCons)
                {
                    var budgetWithCategories = new ConBudget
                    {
                        BudgetId = budget.BudgetId,
                        BudgetName = budget.BudgetName,
                        AmountBudgeted = budget.AmountBudgeted,
                        UserId = budget.UserId,
                        ConId = budget.ConId,
                        BudgetCategories = budgetCategories.Where(x => x.BudgetId == budget.BudgetId).Select(x => x.BudgetCategoryName).ToList(),
                        CatAmounts = categoryAmounts.Where(xm => xm.BudgetId == budget.BudgetId).Select(xm => xm.CatAmount).ToList()
                    };
                    budgetsWithCategories.Add(budgetWithCategories);
                }
                return budgetsWithCategories;
            }
        }

        public CategoryAmount UpdateAmount(CategoryAmount amountToUpdate)
        {
            var sql = @"update CategoryAmount set CatAmount = @CatAmount output inserted.* where BudgetCategoryId = @BudgetCategoryId;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    CatAmount = amountToUpdate.CatAmount,
                    BudgetCategoryId = amountToUpdate.BudgetCategoryId
                };

                var updatedAmount = db.QueryFirstOrDefault<CategoryAmount>(sql, parameters);
                return updatedAmount;
            }
        }
        





    }
}
